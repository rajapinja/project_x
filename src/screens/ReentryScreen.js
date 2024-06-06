import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../app/Config';
import GradientBanner from '../components/Header';
import backgroundImage from '../images/iceland-1979445_1280.jpg';
import { LinearGradient } from 'expo-linear-gradient';
import Footer from '../components/Footer';

const ReentryScreen = () => {

  //const [roundNumber, setRoundNumber] = useState('');
  const [singlePlayerScores, setSinglePlayerScores] = useState([]);
  const [jwtToken, setJwtToken] = useState('');
  const [scoresSubmitted, setScoresSubmitted] = useState(false);
  const [playerName, setPlayerName] = useState();
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState('');
  const [switchFlag, setSwitchFlag] = useState(false);

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

  const handleSinglePlayerScores = () => {
    // Check for Input
    if (!playerName) {
      setSinglePlayerScores([]);
      setErrorMessage('Player name is required!');
      return; // Prevent further execution if the gameName is empty
    }
    if (jwtToken) {
      setErrorMessage('');
      playerScoresByName(playerName);
    }
  };

  // Function to fetch player scores based on round number
  const playerScoresByName = async (playerName) => {
    try {
      console.log("headers.Authorization :", headers.Authorization);
      console.log("playerName :", playerName);
      axios.get(`${BASE_URL}/api/playerscores?playerName=${playerName}`, { headers: headers })
        .then(response => {
          console.log('Response message :', response.data.message);
          setSinglePlayerScores(response.data.singlePlayerScores); // Update state with fetched scores
          setSwitchFlag(true);
        })
        .catch(error => {
          console.error('Error fetching player scores:', error);
        });
    } catch (error) {
      setSinglePlayerScores([]);
      console.error('Error fetching player scores:', error);
    }
  };

  const handleScoreChange = (roundNumberItem, score) => {
    const updatedPlayerScores = singlePlayerScores.map(round =>
      String(round.round_number) === String(roundNumberItem) ? {
        ...round,
        player_id: round.player_id,
        round_number: round.round_number || roundNumberItem,
        score: score
      }
        : round
    );
    setSinglePlayerScores(updatedPlayerScores);
  };

  const renderItem = ({ item }) => (
    <View style={styles.dataRow}>
      <Text style={styles.dataCellName}>{item.round_number}</Text>
      <TextInput
        placeholder={item.score.toString()}
        placeholderTextColor="#660c96"
        value={item.score.toString()} // Convert score to string for input value
        onChangeText={score => handleScoreChange(item.round_number, score)}
        style={{
          flex: 1,
          textAlign: 'center',
          borderColor: 'black',
          borderWidth: 2,
          borderRadius: 5,
          height: 30,
        }}
      />
    </View>
  );

  const handleSaveScores = async () => {
    console.log("Updated PlayerScore :", singlePlayerScores);
    try {
      // Perform API call to save updated player scores
      axios.post(`${BASE_URL}/api/update_score`, singlePlayerScores, { headers }
      ).then(response => {
        setScoresSubmitted(true);
      }).catch(error => {
        console.error('Error fetching single player scores:', error);
      });
      navigation.navigate('Menu');
      Alert.alert('Success', 'Scores updated successfully');
    } catch (error) {
      console.error('Error saving single  scores:', error);
      Alert.alert('Error', 'Failed to update scores');
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <GradientBanner text='Score Recorder' />
      <View style={styles.container}>
      <View style={styles.pageContent}>
          <TextInput
            style={styles.input}
            placeholder="Enter Player Name"
            value={playerName}
            onChangeText={(text) => setPlayerName(text)}
          />
           {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
           <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button}
              onPress={handleSinglePlayerScores}
              disabled={false}
              activeOpacity={0.7}
              underlayColor="#EFEFEF"
            >
              <Text style={styles.buttonText}>PLAYER SCORE(S)</Text>
            </TouchableOpacity>
            {scoresSubmitted ? (
              <Text style={styles.success}>Scores submitted successfully!</Text>
            ) : (
              <TouchableOpacity style={styles.button}
                onPress={handleSaveScores}
                disabled={false}
                activeOpacity={0.7}
                underlayColor="#EFEFEF"
              >
                <Text style={styles.buttonText}>SAVE SCORES</Text>
              </TouchableOpacity>
            )}
          </View>
          {switchFlag &&
            <View style={styles.rowWrapper}>
              <FlatList
                style={styles.flatListWrapper}
                data={singlePlayerScores}
                keyExtractor={(item) => item.round_number}
                renderItem={renderItem}
                ListHeaderComponent={() => (
                  <View style={styles.headerRow}>
                    <Text style={styles.headerCell}>Round Number</Text>
                    <Text style={styles.headerCell}>Score</Text>
                  </View>
                )}
                ListEmptyComponent={() => (
                  <View style={styles.container}>
                    <Text>No scores found</Text>
                  </View>
                )}
              // // Render the FlatList horizontally
              />
            </View>
          }
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.buttonMenu}
              onPress={() => {
                setErrorMessage(''),
                  navigation.navigate('Menu')
              }}
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
    fontSize: 16,
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
    marginBottom: 16,
    fontSize: 16,
    height: 36,
    marginTop:0,
  },
  buttonContainer: {   
    borderRadius: 35, // Border radius 
    justifyContent: 'center', // Center vertically
    width: '50%',
    padding: 10,
    fontSize: 14   
  },
  buttonRow: {
    flexDirection: 'row',
    paddingBottom: 3,
    justifyContent: 'space-between'
  },
  button: {
    height: 36, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: '47%',
    marginBottom: 20,   
    backgroundColor: '#227fe3',
    marginRight:10

  },
  buttonText: {
    color: '#E0E0E0', // Example text color
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
    marginRight: 6,
    marginBottom: 80,
},
  buttonLogout: {
    height: 36, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: '47%',
    marginBottom: 80,   
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
    marginBottom: 50,
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

export default ReentryScreen;
