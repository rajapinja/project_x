import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Text, ScrollView } from 'react-native';
import axios from 'axios';
import { BASE_URL, PROJECT_NAME } from '../app/Config';
import GradientBanner from '../components/Header';
import backgroundImage from '../images/iceland-1979445_1280.jpg';
import Footer from '../components/Footer';
import DistrictPicker from '../components/DistrictPicker';
import StatePicker from '../components/StatePicker';
import CountryPicker from '../components/CountryPicker';
import DateInput from '../components/DateInput';
import TextArea from '../components/TextArea';
import UseApiHeaders from '../components/UseApiHeaders';
import IdentityPicker from '../components/IdentityPicker';


const CustomerScreen = ({ navigation }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailId, setEmailID] = useState('');
    const [bookingDate, setBookingDate] = useState(new Date());
    const [projectName, setProjectName] = useState('');
    const [address, setAddress] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [message, setMessage] = useState("");
    const [identityType, setIdentityType] = useState('');
    const [identityNumber, setIdentityNumber] = useState('');
    
     // Get Headers
     const { headers, jwtToken } = UseApiHeaders();
     //console.log("headers :", headers);

    const handleSubmit = async () => {
        try {          

            // Constructing requestData 
            const requestData = {
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                emailId:emailId,
                identityType: identityType,
                identityNumber: identityNumber,
                bookingDate: bookingDate,
                projectName: projectName,
                address: address,
                district: district,
                state: state,
                country: country
            }

            console.log(" requestData Object :", requestData);
            // Assuming your dateOfBirth state is a Date object, format required by mySQL YYYY-MM-DD
            // const formattedDateOfBirth = dateOfBirth.toISOString().split('T')[0]; // Format as YYYY-MM-DD           
            //console.log("headers.Authorization :", headers.Authorization);
            await axios.post(`${BASE_URL}/api/customers`, JSON.stringify(requestData), { headers: headers })
                .then((response) => {
                    console.log(response.data.message);
                    setMessage(response.data.message);
                    //clearFields();
                    navigation.navigate('Menu');
                }).catch((error) => {
                    console.error('Error:', error);
                    // Handle error response (if needed)
                });
        } catch (error) {
            console.error('Error saving customer :', error);
        }

    };

    const clearFields = () => {
        setFirstName('');
        setLastName('');
        setphoneNumber('');
        setEmailID('');
        setProjectName('');
        setBookingDate('');
        setIdentityType('');
        setIdentityNumber('')
        setAddress('');
        setCountry('Select Country');
        setDistrict('Select District');
        setState('Select State');
    };

    const formatAsDDMMYYYY = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so we add 1
        const year = date.getFullYear();

        return `${year}-${month}-${day}`; // required format for MySQL DB Date
        //return `${day}/${month}/${year}`;
    };

    const handleDateOfBirthChange = (selectedDate) => {
        console.log('Customer Screen Selected Date: ', selectedDate); // Check if the selected date is received
        setBookingDate(formatAsDDMMYYYY(selectedDate));
        //Alert.alert("Selected Date :",formatAsDDMMYYYY(selectedDate))
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <GradientBanner text={PROJECT_NAME} />
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.pageContent}>
                        <Text style={styles.title}>Customer</Text>
                        <View style={styles.InputRow}>
                            <TextInput
                                style={styles.input}
                                placeholder="First Name"
                                value={firstName}
                                onChangeText={setFirstName}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Last Name"
                                value={lastName}
                                onChangeText={setLastName}
                            />
                        </View>
                        <View style={styles.InputRow}>
                            <TextInput
                                style={styles.input}
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Email Id"
                                value={emailId}
                                onChangeText={setEmailID}
                            />
                        </View>                       
                        <View style={styles.InputRow}>
                            <IdentityPicker
                                selectedValue={identityType}
                                onValueChange={(itemValue) => setIdentityType(itemValue)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Identity Number"
                                value={identityNumber}
                                onChangeText={setIdentityNumber}
                            />
                        </View>
                        <View style={styles.InputRow}>
                            <TextInput
                                style={styles.input}
                                placeholder="Project Name"
                                value={projectName}
                                onChangeText={setProjectName}
                            />
                            <DateInput
                                onSelectedDate={handleDateOfBirthChange}
                            />
                        </View>
                        <View style={styles.InputRow}>
                            <TextArea style={styles.input}
                                value={address}
                                onChange={(newAddress) => setAddress(newAddress)}
                            />
                        </View>
                        <View style={styles.InputRow}>
                            <DistrictPicker
                                selectedValue={district}
                                onValueChange={(itemValue) => setDistrict(itemValue)}
                            />
                        </View>
                        <View style={styles.InputRow}>
                            <StatePicker
                                selectedValue={state}
                                onValueChange={(itemValue) => setState(itemValue)}
                            />
                        </View>
                        <View style={styles.InputRow}>
                            <CountryPicker
                                selectedValue={country}
                                onValueChange={(itemValue) => setCountry(itemValue)}
                            />
                        </View>
                        <View style={styles.InputRow}>
                            <TouchableOpacity style={styles.button}
                                onPress={handleSubmit}
                                disabled={false}
                                activeOpacity={0.7}
                                underlayColor="#EFEFEF"
                            >
                                <Text style={styles.buttonText}>SUBMIT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Footer />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover', // Scale the image to cover the entire screen
        justifyContent: 'center', // Center vertically
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        textShadowColor: "blue",
        fontWeight: 'bold',
        marginBottom: 16
    },

    pageContent: {
        flex: 1, // Ensure content fills the remaining space
        marginTop: 0, // Set the margin top to 0
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60
    },
    datePickerContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 10
    },

    InputContainer: {
        borderRadius: 20, // Border radius 
        justifyContent: 'center', // Center vertically
        width: '50%',
        padding: 10,
        fontSize: 50
    },
    InputRow: {
        flexDirection: 'row',
        paddingBottom: 5,
        justifyContent: 'space-between'
    },
    input: {
        height: 38,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 12,
        borderRadius: 5,
        width: '49%',
        marginBottom: 8,
        marginRight: 10,
        borderWidth: 1,
        borderColor: 'gray',
        textAlign: 'center'
    },
    button: {
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 13,
        width: '49%',
        marginBottom: 40,
        backgroundColor: '#227fe3',

    },
    buttonText: {
        color: '#E0E0E0', // Example text color
        fontSize: 12,
        fontWeight: 'bold',
    },
    scrollViewContainer: {
        flexGrow: 1,
    },
});

export default CustomerScreen;
