import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../app/Config';
import GradientBanner from '../components/Header';
import backgroundImage from '../images/iceland-1979445_1280.jpg';
import { LinearGradient } from 'expo-linear-gradient';
import Footer from '../components/Footer';

const DynamicScoresDisplay = () => {

  const [roundNumbers, setRoundNumbers] = useState([]);
  const [playerScores, setPlayerScores] = useState([]);
  const [noRecordsMsg, setNoRecordsMsg] = useState(0);
  const [jwtToken, setJwtToken] = useState('');

  // Always retrieve accessToken from AsyncStorage
  useEffect(() => {
    retrieveValues();
  }, []);

  useEffect(() => {
    if (jwtToken) {
      getRoundNumber();
    }
  }, [jwtToken]);

  useEffect(() => {
    if (jwtToken && roundNumbers.length > 0) {
      getDynamicScores();
    }
  }, [roundNumbers]);

  //[jwtToken, playerScores, roundNumbers]
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

  const getRoundNumber = async () => {
    console.log("headers.Authorization :", headers.Authorization);
    // Fetch the maximum round number
    axios.get(`${BASE_URL}/api/round-number`, { headers: headers })
      .then(response => {
        const maxRoundNumber = response.data.roundNumber;
        const rounds = Array.from({ length: maxRoundNumber }, (_, index) => index + 1);
        setRoundNumbers(rounds);
        //setRoundNumber(rounds);
      })
      .catch(error => {
        console.error("Error fetching max round number:", error);
        return null;
      });
  };

  const getDynamicScores = async () => {
    console.log("headers.Authorization :", headers.Authorization);
    // Fetch player scores with varying round numbers   
    axios.get(`${BASE_URL}/api/display_scores_dynamic`, { headers: headers })
      .then(response => {
        console.log('Response message :', response.data.message);
        setNoRecordsMsg(response.data.message)
        setPlayerScores(response.data.playerScores);
      })
      .catch(error => {
        console.error('Error fetching player scores:', error);
      });
  };

  const navigation = useNavigation();

  // Adjust the styling for the player card
  const renderPlayerCards = () => {
    const playersPerRow = 3;
    const playerRows = [];

    // Splitting the players into groups of 3 for each row
    for (let i = 0; i < playerScores.length; i += playersPerRow) {
      const rowPlayers = playerScores.slice(i, i + playersPerRow);
      playerRows.push(rowPlayers);
    }

    return playerRows.map((rowPlayers, index) => (
      <View key={index} style={styles.playerCardRow}>
        {rowPlayers.map(player => (
          <LinearGradient
            key={player.name}
            colors={['rgba(0, 128, 128, 0.5)', 'rgba(0, 0, 139, 0.5)']} // Example gradient colors
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.playerCard}
          >
            <Text style={styles.playerName}>{player.name}</Text>
            {roundNumbers.map(roundNumber => (
              <Text style={styles.roundScore} key={roundNumber}>
                Round {roundNumber}:
                <Text style={styles.roundNumberText}>
                  {player[`round_${roundNumber}`]}
                </Text>
              </Text>
            ))}
            <Text style={{
              ...styles.totalScore,
              color: player.total_Score < 100 ? 'darkgreen' : 'darkred',
              textShadowColor: player.total_Score < 100 ? 'limegreen' : 'rgba(139, 0, 0, 0.5)',
              textShadowRadius: 5,
              textShadowOffset: { width: 1, height: 1 }
            }}>
              Total Score: {player.total_Score}
            </Text>
          </LinearGradient>
        ))}
      </View>
    ));
  };


  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <GradientBanner text='Score Recorder' />
     
      <View style={styles.container}>      
        <View style={styles.pageContent}>
        <Text style={styles.title}>Player Scores</Text>
          {/* Render player cards */}
          {playerScores.length !== undefined && renderPlayerCards()}
          {/* If no records */}
          {playerScores.length === undefined &&
            <View style={styles.norecordsView}>
              <Text style={styles.norecordsText}>{noRecordsMsg}</Text>
            </View>
          }
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button}
              onPress={() => navigation.navigate('Menu')}
              disabled={false}
              activeOpacity={0.7}
              underlayColor="#EFEFEF"
            >
              <Text style={styles.buttonText}>MENU</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonLogout}
              onPress={() => navigation.navigate('Logout')}
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
  },
  container: {
    flex: 1,
    padding: 10,
  },
  pageContent: {
    flex: 1, // Ensure content fills the remaining space
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 0,
    color: 'blue',
    alignItems:'center'
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dataRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  dataCell: {
    flex: 1,
    textAlign: 'center',
  },
  dataCellName: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'green',
  },
  dataCellBold: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
  },
  buttonContainer: {
    borderRadius: 35, // Border radius 
    justifyContent: 'center', // Center vertically
    width: '50%',
    padding: 10,
    fontSize: 50,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    paddingBottom: 5,
    justifyContent: 'space-between',
    marginTop: 80,
  },
  button: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: '47%',
    marginBottom: 60,
    backgroundColor: '#227fe3',
    marginRight: 10
  },
  buttonText: {
    color: '#E0E0E0',
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonLogout: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: '47%',
    marginBottom: 60,
    backgroundColor: '#9e3b34'
  },
  norecordsView: {
    alignItems: 'center',
  },
  norecordsText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold'
  },
  playerCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  playerCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    width: '30%', // Adjust the width as needed
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent white background
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Android shadow
    marginRight:10

  },
  playerName: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'blue'
  },
  totalScore: {
    color: 'darkred',
    fontWeight: 'bold',
  },
  roundNumberText: {
    color: '#7FFFD4',
    fontWeight: 'bold',
  }

});

export default DynamicScoresDisplay;
