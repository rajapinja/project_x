import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Text, Image } from 'react-native';
import axios from 'axios';
import BASE_URL from '../app/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GradientBanner from '../components/Header';
import backgroundImage from '../images/iceland-1979445_1280.jpg';
import Footer from '../components/Footer';
import DistrictPicker from '../components/DistrictPicker';
import GradientButton from '../components/GradientButton';
import ConstitutionPicker from '../components/ConstitutionPicker';
import { LinearGradient } from 'expo-linear-gradient';
import BRS from '../images/BRS.png';
import BJP from '../images/BJP.png';
import NCP from '../images/NCP.png';
import CPM from '../images/CPMI.jpg';
import MIM from '../images/MIM.png';
import INDEPENDENT from '../images/INDEPENDENT.jpg';
import FWB from '../images/FWB.png';
import YearPicker from '../components/YearPicker';

const WinnerDisplayScreen = ({ navigation }) => {

   
    const [jwtToken, setJwtToken] = useState('');
    const [message, setMessage] = useState("");  
    const [candidatesInfo, setCandidatesInfo] = useState([]);
    const [constitutions, setConstitutions] = useState([]);  
    const [selectedDistrict, setSelectedDistrict] = useState(''); 
    const [selectedConstitution, setSelectedConstitution] = useState("");
    const [selectedYear, setSelectedYear] = useState('');   


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

    // Fetch constitutions when jwtToken or selectedDistrict changes
    useEffect(() => {
        if (jwtToken && selectedDistrict) {
            fetchConstitutions();
        }
    }, [jwtToken, selectedDistrict]);


    const fetchConstitutions = async () => {
        // console.log("headers.Authorization :", headers.Authorization);
        await axios.get(`${BASE_URL}/api/constitutions?district=${selectedDistrict}`, { headers: headers })
            .then(response => {
                //console.log(response.data.districts);
                setConstitutions(response.data.constitutions);
            })
            .catch(error => {
                if (error.response) {
                    // Handle response-related errors
                    console.error('Response:', error.response);
                } else if (error.request) {
                    // Handle request-related errors
                    console.error('Request:', error.request);
                } else {
                    // Handle other errors
                    console.error('Other Error:', error.message);
                }
            });
    };

    const constructQueryString = (selectedDistrict, selectedConstitution, selectedYear) => {
        const params = [];
        console.log("selectedDistrict :",selectedDistrict, "selectedConstitution :", selectedConstitution, "selectedYear :",selectedYear);
        if (selectedDistrict) {
            params.push(`district=${selectedDistrict}`);
        }
        if (selectedConstitution) {
            params.push(`constitution_name=${selectedConstitution}`);
        }
        if (selectedYear) {
            params.push(`result_year=${selectedYear}`);
        }
        return params.join('&');
    };


    const fetchCandidateinfo = () => {
        try {
            // console.log("headers.Authorization :", headers.Authorization);candidateinfobyyear
            const queryString = constructQueryString(selectedDistrict, selectedConstitution, selectedYear)           
            console.log("queryString :", queryString);
            if (jwtToken && selectedConstitution && selectedYear) {               
                axios.get(`${BASE_URL}/api/candidateinfobyyear?${queryString}`, { headers: headers })
                    .then((response) => {
                        setCandidatesInfo(response.data.candidateinfo);
                        console.log(response.data.candidateinfo)
                        console.log(response.data.message)
                    }).catch((error) => {
                        console.error('Error:', error);
                    });
            }
        } catch (error) {
            console.error('Error Fetching candidate :', error);
        }
    }

 
    const renderCandidateCards = () => {
        if (candidatesInfo.length === 0) {
            return <Text>No candidate information available</Text>;
        }

        return (
            <View style={styles.candidateCardRow}>
                {candidatesInfo.map((candidate, index) => {
                    let textColor = 'black'; // Default color
                    let fontSize = 26;
                    let voteDifference = 0; // Default vote difference
                    if (index < candidatesInfo.length - 1) {
                        const nextCandidate = candidatesInfo[index + 1];
                        if (candidate[3] === 1 && nextCandidate[3] === 2) {
                            voteDifference = candidate[2] - nextCandidate[2];
                        } else if (candidate[3] === 2 && nextCandidate[3] === 3) {
                            voteDifference = candidate[2] - nextCandidate[2];
                        }
                    }
                    // Set text color based on position
                    if (candidate[3] === 1) {
                        textColor = '#004600'; // First position
                        fontSize = 26;


                    } else if (candidate[3] === 2) {
                        textColor = 'blue'; // Second position
                        fontSize = 26;

                    } else if (candidate[3] === 3) {
                        textColor = 'red'; // Third position
                        fontSize = 26;
                    }

                    // Set text color based on party
                    if (candidate[4] === 'BRS') {
                        partyName = '#e75480'; // First position    
                        partyIcon = <Image source={BRS} style={styles.partyIcon} />;

                    } else if (candidate[4] === 'BJP') {
                        partyName = '#FFA000'; // Second position   
                        partyIcon = <Image source={BJP} style={styles.partyIcon} />;

                    } else if (candidate[4] === 'NCP') {
                        partyName = '#006400'; // Third position 
                        partyIcon = <Image source={NCP} style={styles.partyIcon} />;

                    } else if (candidate[4] === 'CPM' || candidate[4] === 'CPI') {
                        partyName = 'red'; // Third position 
                        partyIcon = <Image source={CPM} style={styles.partyIcon} />;

                    } else if (candidate[4] === 'MIM' || candidate[4] === 'MAJLIS') {
                        partyName = '#006400'; // Third position 
                        partyIcon = <Image source={MIM} style={styles.partyIcon} />;

                    } else if (candidate[4] === 'FARWARD BLOCK' ) {
                        partyName = '#006400'; // Third position 
                        partyIcon = <Image source={FWB} style={styles.partyIcon} />;

                    }
                    else {
                        partyName = 'black'; // Third position    
                        partyIcon = <Image source={INDEPENDENT} style={styles.partyIcon} />;
                    }

                    return (
                        <LinearGradient
                            key={index}
                            //colors={['teal', 'white']}
                            colors={['teal', 'white']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.candidateCard}
                        >
                            <View>
                                {/* Party icon */}
                                {partyIcon}
                            </View>
                            {/* Candidate details */}
                            <View style={styles.candidateInfo}>
                                <Text style={{ ...styles.candidateText, color: textColor, fontSize: fontSize, color: partyName }}>{candidate[3]}</Text>
                                <Text style={{ ...styles.candidateText, color: textColor }}>{candidate[1]}</Text>
                                <Text style={{ ...styles.candidateText, color: textColor, color: partyName }}>{candidate[4]}</Text>
                                <Text style={{ ...styles.candidateText, color: textColor }}>{candidate[2]}({voteDifference > 0 ? `+${voteDifference}` : voteDifference})</Text>
                            </View>
                        </LinearGradient>
                    );
                })}
            </View>           
        );
    };


    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <GradientBanner text='Politico' />
            <View style={styles.container}>
                <View style={styles.pageContent}>
                    <Text style={styles.title}>Candidate(s) ~ Info</Text>
                    <View style={styles.InputRow}>
                        <DistrictPicker
                            selectedValue={selectedDistrict}
                            onValueChange={(itemValue) => {
                                setSelectedDistrict(itemValue),
                                    fetchConstitutions()
                            }}
                        />
                    </View>
                    {selectedDistrict && jwtToken && (
                        <View style={styles.InputRow}>
                            <ConstitutionPicker
                                selectedValue={selectedConstitution}
                                onValueChange={(itemValue) => setSelectedConstitution(itemValue)}
                                selectedDistrict={selectedDistrict}
                                fetchedConstitutions={constitutions}
                            />
                        </View>
                    )}
                    {selectedDistrict && selectedConstitution && (
                        <View style={styles.InputRow}>
                            <YearPicker
                                selectedValue={selectedYear}
                                onValueChange={(itemValue) => setSelectedYear(itemValue)}
                            />
                        </View>
                    )}
                    <View style={styles.InputRow}>
                        <GradientButton
                            onPress={fetchCandidateinfo}
                            title={'DISPLAY~RESULTS'}
                            colors={['#0000FF', '#50C878']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0 }}
                            buttonStyle={styles.buttonConstitution}
                        />
                    </View>
                    {/* Render candidate cards */}
                    {candidatesInfo.length !== undefined && renderCandidateCards()}

                </View>
            </View>
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
    pageContent: {
        flex: 1, // Ensure content fills the remaining space
        marginTop: 0, // Set the margin top to 0
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
    },
    candidateCardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    candidateCard: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 5,
        width: '32%', // Adjust the width as needed
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent white background
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // Android shadow
        marginRight: 10,
        marginBottom: 20,
        position: 'relative'
    },
    candidateText: {
        fontSize: 12,
        marginBottom: 5,
        color: 'blue',
        fontWeight: '600'
    },
    dataRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingBottom: 5,
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        textShadowColor: "blue",
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 2
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
        marginBottom: 25,
        backgroundColor: '#227fe3',
        marginRight: 10
    },
    partyIcon: {
        width: 30, // Adjust the width as needed
        height: 30, // Adjust the height as needed
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        borderRadius: 15,
    },
    candidateInfo: {
        marginBottom: 1 // Adjust this padding to create space between text and icon
    },
    year: {
        fontSize: 36,      
        fontWeight: 'bold',
        marginBottom: 16,           
        alignContent:'center',
        color:'blue'
    },
    yearView: {  
        alignItems:'center',
       
    },
});

export default WinnerDisplayScreen;