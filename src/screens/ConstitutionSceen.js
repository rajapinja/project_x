import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ImageBackground, Text, FlatList, ScrollView } from 'react-native';
import axios from 'axios';
import BASE_URL from '../app/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GradientBanner from '../components/Header';
import backgroundImage from '../images/iceland-1979445_1280.jpg';
import Footer from '../components/Footer';
import DistrictPicker from '../components/DistrictPicker';
import StatePicker from '../components/StatePicker';
import CountryPicker from '../components/CountryPicker';
import GradientButton from '../components/GradientButton';


const ITEMS_PER_PAGE = 10;

const ConstitutionScreen = ({ navigation }) => {

    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [jwtToken, setJwtToken] = useState('');
    const [message, setMessage] = useState("");
    const [constitutions, setConstitutions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);




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

    const constructQueryString = (district, state, country) => {
        const params = [];
        if (district) {
            params.push(`district=${district}`);
        }
        if (state) {
            params.push(`state=${state}`);
        }
        if (country) {
            params.push(`country=${country}`);
        }

        return params.join('&');
    };

    const fetchConstitutions = async () => {
        try {
            // Call funtion query string
            const queryString = constructQueryString(district, state, country);
            console.log("queryString :", queryString);
            // Send data to the backend Flask API here (POST request)
            console.log("headers.Authorization :", headers.Authorization);
            if (jwtToken) {
                await axios.get(`${BASE_URL}/api/constitutions?queryString=${queryString}`, { headers: headers })
                    .then((response) => {
                        const paginatedConstitutionData = paginateConstitutions(response.data.constitutions, currentPage);
                        setConstitutions(paginatedConstitutionData);
                        console.log(response.data.message)
                        //clearFields();
                        // navigation.navigate('Upload');
                    }).catch((error) => {
                        console.error('Error:', error);
                        // Handle error response (if needed)
                        //clearFields();
                    });
            }
        } catch (error) {
            console.error('Error adding candidate :', error);
        }
    }

    const handleFetchConstitutions = () => {
        fetchConstitutions();
    };

    const paginateConstitutions = (data, page) => {
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;

        return data.slice(startIndex, endIndex);
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
        //totalPages = Math.ceil(constitutions.length / ITEMS_PER_PAGE);
        handlePaginationAndFetch();
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
        handlePaginationAndFetch();
    };
    // Function to handle both pagination and fetching data
    const handlePaginationAndFetch = () => {
        fetchConstitutions(); // Fetch data
    };

    // Condition to check if pagination buttons should be displayed
    const showPagination = constitutions.length >= ITEMS_PER_PAGE;
    // //const showPagination = totalPages > 1; // Show pagination if more than 1 page  
    const showPrevious = currentPage > 1;
    // const showNext = currentPage < totalPages;

    const renderItem = ({ item }) => (
        <View style={styles.dataRow}>
            <Text style={styles.dataCell}>{item.name.toLowerCase()}</Text>
            <Text style={styles.dataCell}>{item.total_votes}</Text>
            <Text style={styles.dataCell}>{item.reserved.toLowerCase()}</Text>
            <Text style={styles.dataCell}>{item.district.toLowerCase()}</Text>
            {/* <Text style={styles.dataCell}>{item.state.toLowerCase()}</Text>
            <Text style={styles.dataCell}>{item.country.toLowerCase()}</Text> */}
            {/* <Text style={styles.dataCell}>{item.YEAR}</Text>             */}
        </View>
    );

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <GradientBanner text='Politico' />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <View style={styles.pageContent}>
                        <Text style={styles.title}>Constitution(s)</Text>
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
                            <GradientButton
                                onPress={handleFetchConstitutions}
                                title={'GET~CONSTITUTIONS'}
                                colors={['#0000FF', '#50C878']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 0 }}
                                buttonStyle={styles.buttonConstitution}
                            />
                        </View>
                        <View style={styles.rowWrapper}>
                            <FlatList
                                style={styles.flatListWrapper}
                                data={constitutions}
                                keyExtractor={(item) => item.id}
                                ListHeaderComponent={() => (
                                    <View style={styles.headerRow}>
                                        <Text style={styles.headerCell}>Name</Text>
                                        <Text style={styles.headerCell}>Total Votes</Text>
                                        <Text style={styles.headerCell}>Reserved</Text>
                                        <Text style={styles.headerCell}>District</Text>
                                        {/* <Text style={styles.headerCell}>State</Text> */}
                                        {/* <Text style={styles.headerCell}>Country</Text> */}
                                        {/* <Text style={styles.headerCell}>Year</Text> */}
                                    </View>
                                )}
                                renderItem={renderItem}
                                ListEmptyComponent={() => (
                                    <View style={styles.container}>
                                        <Text>No Constitutions found</Text>
                                    </View>
                                )}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                            {(showPagination) &&
                                <>
                                     {showPrevious && 
                                        <GradientButton
                                            onPress={() => {
                                                handlePrevPage();
                                                //handlePaginationAndFetch();
                                            }}
                                            title={'PREVIOUS'}
                                            disabled={currentPage === 1}
                                            colors={['teal', 'purple']}
                                            start={{ x: 0, y: 1 }}
                                            end={{ x: 1, y: 0 }}
                                            buttonStyle={styles.button}
                                        />
                                    }
                                    <GradientButton
                                        onPress={() => {
                                            handleNextPage();                                           
                                        }}
                                        title={'NEXT'}
                                        colors={['purple', 'teal']}
                                        start={{ x: 1, y: 0 }}
                                        end={{ x: 0, y: 1 }}
                                        buttonStyle={styles.button}
                                    />
                                </>
                            }  
                             {(showPrevious && constitutions.length < ITEMS_PER_PAGE) &&
                                        <GradientButton
                                            onPress={() => {
                                                handlePrevPage();
                                                handlePaginationAndFetch();
                                            }}
                                            title={'PREVIOUS'}
                                            disabled={currentPage === 1}
                                            colors={['teal', 'purple']}
                                            start={{ x: 0, y: 1 }}
                                            end={{ x: 1, y: 0 }}
                                            buttonStyle={styles.button}
                                        />
                                    }                        
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Footer />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20, // Example padding values
        paddingHorizontal: 10,
    },
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
    },
    rowWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Allow content to wrap
    },
    dataRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingBottom: 5,
        marginBottom: 10,
        justifyContent: 'space-between',
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
        marginTop: 2
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
    buttonConstitution: {
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 13,
        width: '54%',
        marginBottom: 60,
        backgroundColor: '#227fe3',
        marginRight: 10
    },
    button: {
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 13,
        width: '47%',
        marginBottom: 26,
        backgroundColor: '#227fe3',
        marginRight: 10
    },
    buttonText: {
        color: '#E0E0E0', // Example text color
        fontSize: 12,
        fontWeight: 'bold',
    },


});

export default ConstitutionScreen;
