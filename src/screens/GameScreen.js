import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../app/Config';
import GradientBanner from '../components/Header';
import backgroundImage from '../images/iceland-1979445_1280.jpg';
import Footer from '../components/Footer';


const GameScreen = () => {

    const [gameName, setGameName] = useState('');
    const [jwtToken, setJwtToken] = useState('');
    const [playerScores, setPlayerScores] = useState([]);
    const navigation = useNavigation();
    const [switchFlag, setSwitchFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        retrieveValues();
    }, []);

    const retrieveValues = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            setJwtToken(accessToken.trim());
        } catch (error) {
            console.error('Error retrieving values:', error);
        }
    };

    const headers = {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
    };

    const handleCreateGame = () => { 
        // Check for Input
        if (!gameName.trim()) {
            setErrorMessage('Game name is required!');
            return; // Prevent further execution if the gameName is empty
          }  
        
        if (jwtToken) {
            setErrorMessage('');
            createNameGame(gameName);
        }
    };

    const handleFetchGame = () => {
        // Check for Input
        if (!gameName.trim()) {
            setErrorMessage('Game name is required!');
            return; // Prevent further execution if the gameName is empty
          }

        if (jwtToken) {
            setErrorMessage('');
            getPlayersByGameName(gameName);
        }
    };

    // Function to fetch player scores based on round number
    const createNameGame = async (gameName) => {
        try {
            console.log("headers.Authorization :", headers.Authorization);
            console.log("gameName :", gameName);
            axios.post(`${BASE_URL}/api/create_game`, JSON.stringify({ gameName }), { headers: headers })
                .then(response => {
                    console.log('Response message :', response.data.message);
                    setPlayerScores([]);
                    navigation.navigate('Menu');
                })
                .catch(error => {
                    console.error('Error Creating Game:', error);
                });
        } catch (error) {
            console.error('Error Creating Game:', error);
        }
    };

    // Function to fetch player scores based on round number
    const getPlayersByGameName = async (gameName) => {
        try {
            console.log("headers.Authorization :", headers.Authorization);
            console.log("gameName :", gameName);
            axios.get(`${BASE_URL}/api/player_scores_by_game?gameName=${gameName}`, { headers: headers })
                .then(response => {
                    console.log('Response message :', response.data.message);
                    setPlayerScores(response.data.player_scores);
                    console.log("playerScores :", response.data.player_scores);
                    setSwitchFlag(true);
                    //navigation.navigate('Menu'); 
                })
                .catch(error => {
                    console.error('Error Fetching Game Details:', error);
                });
        } catch (error) {
            console.error('Error Fetching Game Details:', error);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.dataRow}>
            <Text style={styles.dataCellPlayer}>{item.name}</Text>
            <Text style={styles.dataCellGame}>{item.game_name}</Text>
            <Text style={styles.dataCellName}>{item.total_score}</Text>
        </View>
    );

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <GradientBanner text='Score Recorder' />
            <View style={styles.container}>
                <View style={styles.pageContent}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Game Name"
                        value={gameName}
                        onChangeText={(text) => setGameName(text)}
                    />
                     {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.button}
                            onPress={handleCreateGame}
                            disabled={false}
                            activeOpacity={0.7}
                            underlayColor="#EFEFEF"
                        >
                            <Text style={styles.buttonText}>CREATE NEW GAME</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={handleFetchGame}
                            disabled={false}
                            activeOpacity={0.7}
                            underlayColor="#EFEFEF"
                        >
                            <Text style={styles.buttonText}>GET EXISTING GAME</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <PlayerScoresByGameName playerScores={playerScores} /> */}
                    {switchFlag && <View style={styles.rowWrapper}>
                        <FlatList
                            style={styles.flatListWrapper}
                            data={playerScores}
                            keyExtractor={(item) => item.id}
                            renderItem={renderItem}
                            ListHeaderComponent={() => (
                                <View style={styles.headerRow}>
                                    <Text style={styles.headerCell}>Player Name</Text>
                                    <Text style={styles.headerCell}>Game Name</Text>
                                    <Text style={styles.headerCell}>Total Score</Text>
                                </View>
                            )}
                            ListEmptyComponent={() => (
                                <View style={styles.container}>
                                    <Text>No Game- Player scores found</Text>
                                </View>
                            )}
                        />
                    </View>
                    }
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.buttonMenu}
                            onPress={() => {
                                setErrorMessage('')
                                setSwitchFlag(false),
                                    setGameName(''),
                                    setPlayerScores([]),
                                    navigation.navigate('Menu')
                            }}
                            disabled={false}
                            activeOpacity={0.7}
                            underlayColor="#EFEFEF"
                        >
                            <Text style={styles.buttonText}>MENU</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonLogout}
                            onPress={() => {
                                setErrorMessage(''),
                                    navigation.navigate('Logout')
                                } 
                            }
                            disabled={false}
                            activeOpacity={0.7}
                            underlayColor="#EFEFEF"
                        >
                            <Text style={styles.buttonText}>LOGOUT</Text>
                        </TouchableOpacity>
                    </View>
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
        alignContent: 'center'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    pageContent: {
        flex: 1, // Ensure content fills the remaining space
        marginTop: 0, // Set the margin top to 0
        // Other styling for your page content, if needed
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60
    },
    dataRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingBottom: 5,
        justifyContent: 'space-between',
    },
    dataCell: {
        flex: 1,
        textAlign: 'center',
    },
    dataCellName: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#0c2f96',
        fontSize: 12,
    },
    dataCellGame: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',        
        fontSize: 12,
    },
    dataCellPlayer: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',        
        fontSize: 12,
        color:'green'
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
    input: {
        width: '60%',
        padding: 10,
        borderWidth: 2, // Apply border
        borderColor: 'gray', // Border color
        borderRadius: 5, // Border radius
        textAlign: 'center',
        marginBottom: 10,
        // marginTop: 140,
        fontSize: 16,
        height: 36
    },
    buttonContainer: {
        borderRadius: 35, // Border radius 
        justifyContent: 'center', // Center vertically
        width: '50%',
        padding: 10,
        fontSize: 14,
        marginBottom: 300
    },
    buttonRow: {
        flexDirection: 'row',
        paddingBottom: 5,
        justifyContent: 'space-between',
        margin: 5,
        marginTop: 10,
    },
    button: {
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 13,
        width: '47%',
        marginBottom: 5,
        backgroundColor: '#227fe3',
        marginRight: 6
    },
    buttonText: {
        color: '#E0E0E0',
        fontSize: 12,
        fontWeight: 'bold',
    },
    buttonMenu: {
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        width: '47%',
        marginBottom: 5,
        backgroundColor: '#227fe3',
        marginRight: 6
    },
    buttonLogout: {
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        width: '47%',
        marginBottom: 40,
        backgroundColor: '#9e3b34'
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
        marginBottom: 120,
    },
    rowWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Allow content to wrap
    },
    error: {
      color: 'red',
      marginBottom: 10,
    },
});

export default GameScreen;
