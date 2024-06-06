import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, ImageBackground, Text, FlatList } from 'react-native';
import axios from 'axios';
import BASE_URL from '../app/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GradientBanner from '../components/Header';
import backgroundImage from '../images/iceland-1979445_1280.jpg';
import Footer from '../components/Footer';
import DistrictPicker from '../components/DistrictPicker';
import GradientButton from '../components/GradientButton';



const EditDistrictScreen = ({ navigation }) => {


    const [jwtToken, setJwtToken] = useState('');
    const [message, setMessage] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [districtSubmitted, setDistrictSubmitted] = useState(false);
    const [districtInfo, setDistrictInfo] = useState([]);


    // Always retrieve accessToken from AsyncStorage
    useEffect(() => {
        retrieveValues();
    }, []);

    // Function to retrieve values from AsyncStorage  
    const retrieveValues = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            setJwtToken(accessToken.trim());
        } catch (error) {
            console.error('Error retrieving values:', error);
        }
    };

    // Define the headers with the access token
    const headers = {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
    };

    const fetchDistrictInfo = async () => {
        try {
            console.log("districtInfo :", districtInfo);
            //console.log("headers.Authorization :", headers.Authorization);
            if (jwtToken) {
                await axios.get(`${BASE_URL}/api/districtinfo?district=${selectedDistrict}`, { headers: headers })
                    .then((response) => {
                        setDistrictInfo(response.data.districtinfo);
                        console.log(response.data.districtinfo)
                        console.log(response.data.message)
                    }).catch((error) => {
                        console.error('Error:', error);
                    });
            }
        } catch (error) {
            console.error('Error retrieving district info :', error);
        }
    }


    const renderItem = ({ item, index }) => (
        <View style={styles.dataRow}>
            <TextInput
                placeholder={item.name}
                placeholderTextColor="#660c96"
                value={item.name} // Convert score to string for input value
                onChangeText={(text) => handleInputChange(text, index, 'name')}
                style={styles.editableText}
            />
        </View>
    );

    const handleInputChange = (text, index, fieldName) => {
        console.log("Updated District Details :", text, index, fieldName);
        const updatedDistrictInfo = [...districtInfo];
        updatedDistrictInfo[index][fieldName] = text.trim();
        setDistrictInfo(updatedDistrictInfo);
    };

    const handleSave = async () => {
        console.log("JSON.stringify(selectedDistrict) :", selectedDistrict);
        try {
            axios.post(`${BASE_URL}/api/updatedistrict`, JSON.stringify(districtInfo), { headers: headers }
            ).then(response => {
                setDistrictSubmitted(true);
            }).catch(error => {
                console.error('Error saving district details:', error);
            });
            //   navigation.navigate('Menu');       
        } catch (error) {
            console.error('Error saving district details:', error);
        }
    };


    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <GradientBanner text='Politico' />
            <View style={styles.container}>
                <View style={styles.pageContent}>
                    <Text style={styles.title}>Edit Constitution</Text>
                    <View style={styles.InputRow}>
                        <DistrictPicker
                            selectedValue={selectedDistrict}
                            onValueChange={(itemValue) => {
                                setSelectedDistrict(itemValue)
                            }}
                        />
                    </View>
                    <View style={styles.InputRow}>
                        <GradientButton
                            onPress={fetchDistrictInfo}
                            title={'EDIT~CONSTITUTION'}
                            colors={['#0000FF', '#50C878']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0 }}
                            buttonStyle={styles.button}
                        />
                    </View>

                    <View style={styles.rowWrapper}>
                        <FlatList
                            style={styles.flatListWrapper}
                            data={districtInfo}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderItem}
                            ListHeaderComponent={() => (
                                <View style={styles.headerRow}>
                                    <Text style={styles.titleEdit}>Update Below Data </Text>
                                </View>
                            )}
                            ListEmptyComponent={() => (
                                <View style={styles.container}>
                                    <Text>No scores found</Text>
                                </View>
                            )}
                        />
                    </View>

                    <View style={styles.InputRow}>
                        <GradientButton
                            onPress={handleSave}
                            title={'SAVE~CONSTITUTION'}
                            colors={['#50C878', 'red']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0 }}
                            buttonStyle={styles.buttonConstitution}
                        />
                    </View>
                </View>
            </View>
            <Footer />
        </ImageBackground>
    );

};

export default EditDistrictScreen;

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
    pageContent: {
        flex: 1, // Ensure content fills the remaining space
        marginTop: 0, // Set the margin top to 0
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
    },
    flatListWrapper: {
        flex: 1,
        marginBottom: 16,
        alignItems: 'center',
        marginTop: 10
    },
    rowWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Allow content to wrap
    },
    dataRow: {
        flexDirection: 'column',
        borderBottomWidth: 1,
        paddingBottom: 5,
        marginBottom: 16,
        alignItems: 'center'
    },
    dataCell: {
        flex: 1,
        textAlign: 'center',
    },
    dataCellName: {
        flex: 1,
        textAlign: 'center',
        color: '#0c2f96',
        fontSize: 12,
    },
    title: {
        fontSize: 20,
        textShadowColor: "blue",
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 20
    },
    dataCellBold: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'red',
    },
    item: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    headerRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingBottom: 5,
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    flatListWrapper: {
        flex: 1,
        marginBottom: 20,
    },
    rowWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Allow content to wrap
    },
    datePickerContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    InputContainer: {
        borderRadius: 20, // Border radius 
        justifyContent: 'center', // Center vertically
        width: '50%',
        padding: 10,
        fontSize: 50,
    },
    InputRow: {
        flexDirection: 'row',
        paddingBottom: 5,
        justifyContent: 'space-between',
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
        textAlign: 'center',
    },
    buttonConstitution: {
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 13,
        width: '54%',
        marginBottom: 80,
        backgroundColor: '#227fe3',
        marginRight: 10
    },
    button: {
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 13,
        width: '54%',
        marginBottom: 26,
        backgroundColor: '#227fe3',
        marginRight: 10
    },
    buttonText: {
        color: '#E0E0E0', // Example text color
        fontSize: 12,
        fontWeight: 'bold',
    },
    titleEdit: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 2,

        color: 'blue'
    },
    editableText: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 5,
        marginBottom: 5,
        textAlign: 'center',
        height: 36,
        width: '60%'
    },

});