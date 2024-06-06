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

const EditPlayerScores = () => {

  const [roundNumber, setRoundNumber] = useState('');
  const [playerScores, setPlayerScores] = useState([]);
  const [jwtToken, setJwtToken] = useState('');
  const [scoresSubmitted, setScoresSubmitted] = useState(false);
  const [players, setPlayers] = useState([]);
  const navigation = useNavigation();
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

  const handleFetchScores = () => {
      // Check for Input
      if (!roundNumber.trim()) {
        setErrorMessage('Round Number is required!');
        return; // Prevent further execution if the gameName is empty
      } 
    if (jwtToken) {
      setErrorMessage('');
      fetchPlayerScoresByRoundNumber(roundNumber);
    }
  };

  // Function to fetch player scores based on round number
  const fetchPlayerScoresByRoundNumber = async (roundNumber) => {
    try {
      console.log("headers.Authorization :", headers.Authorization);
      console.log("roundNumber :", roundNumber);
      axios.get(`${BASE_URL}/api/fetchscores?roundNumber=${roundNumber}`, { headers: headers })
        .then(response => {
          console.log('Response message :', response.data.message);
          setPlayerScores(response.data.playerScores); // Update state with fetched scores
        })
        .catch(error => {
          console.error('Error fetching player scores:', error);
        });
    } catch (error) {
      console.error('Error fetching player scores:', error);
    }
  };

  const handleScoreChange = (playerId, score) => {
    const updatedPlayers = playerScores.map(player =>
      String(player.player_id) === String(playerId) ? {
        ...player,
        player_id: playerId,
        round_number: player.round_number || roundNumber,
        score:score
      }
        : player
    );
    setPlayerScores(updatedPlayers);
  };

  const renderItem = ({ item }) => (
    <View style={styles.dataRow}>
      <Text style={styles.dataCellName}>{item.name}</Text>
      <TextInput
        placeholder={item.score.toString()}
        placeholderTextColor="#660c96"
        value={item.score.toString()} // Convert score to string for input value
        onChangeText={score => handleScoreChange(item.player_id, score)}
        style={{
          flex: 1,
          textAlign: 'center',
          borderColor: 'black',
          borderWidth: 2,
          borderRadius: 5,
          height: 26,
        }}
      />
    </View>
  );

  const handleSaveScores = async () => {
    console.log("Updated PlayerScore :", playerScores);
    try {
      // const allScoresEntered = playerScores.every(item => item.score !== undefined && item.score !== null && item.score !== '');
      // if (!allScoresEntered) {
      //   Alert.alert('Missing scores for players', 'Please enter score for all the players');
      //   return;
      // }
      // Perform API call to save updated player scores
      axios.post(`${BASE_URL}/api/update_score`, playerScores, { headers }
      ).then(response => {
        setScoresSubmitted(true);
      }).catch(error => {
        console.error('Error fetching player scores:', error);
      });
      navigation.navigate('Menu');
      Alert.alert('Success', 'Scores updated successfully');
    } catch (error) {
      console.error('Error saving player scores:', error);
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
        placeholder="Enter Round Number"
        value={roundNumber}
        onChangeText={(text) => setRoundNumber(text)}
      />
       {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
       <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}
          onPress={handleFetchScores}
          disabled={false}
          activeOpacity={0.7}
          underlayColor="#EFEFEF"
        >
          <Text style={styles.buttonText}>FETCH SCORES</Text>
        </TouchableOpacity>
       </View>
      <View style={styles.rowWrapper}>
        <FlatList
          style={styles.flatListWrapper}
          data={playerScores}
          keyExtractor={(item) => item.player_id}
          renderItem={renderItem}
          ListHeaderComponent={() => (
            <View style={styles.headerRow}>
              <Text style={styles.headerCell}>Player Name</Text>
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
      <View style={styles.buttonRow}>
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
         <TouchableOpacity style={styles.button}
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
      </View>
      <View style={styles.buttonRow}>
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
    <Footer/>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  pageContent: {
    flex: 1, // Ensure content fills the remaining space
    marginTop: 0, 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:60
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
    marginBottom: 2,
    fontSize: 14,
    height: 36,
    marginTop: 96,
  },
  buttonContainer: {
    borderRadius: 20, // Border radius 
    justifyContent: 'center', // Center vertically
    width: '50%',
    padding: 10,
    fontSize: 50,
    
  },
  buttonRow: {
    flexDirection: 'row',
    paddingBottom: 5,
    justifyContent: 'space-between',
    marginTop: 16,
  },
  
  button: {
    height: 36, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: '47%',
    marginBottom: 16,   
    backgroundColor: '#227fe3',
    marginRight:5
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
    marginBottom: 140,
    backgroundColor: '#227fe3',
  },
  buttonLogout: {
    height: 36, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: '47%',
    marginBottom: 140,
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
    marginBottom: 20,
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

export default EditPlayerScores;
