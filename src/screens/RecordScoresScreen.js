import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import BASE_URL from '../app/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GradientBanner from '../components/Header';
import backgroundImage from '../images/clouds-1282314_1280.jpg';
import Footer from '../components/Footer';

function RecordScores() {

  const [roundNumber, setRoundNumber] = useState(1);
  const [roundNumberMax, setRoundNumberMax] = useState('');
  const [score, setScore] = useState('')
  const [scoresSubmitted, setScoresSubmitted] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [players, setPlayers] = useState([]);
  const [jwtToken, setJwtToken] = useState('');
  const [headersValue, setHeadersValue] = useState({});

  const navigation = useNavigation();

  useEffect(() => {
    retrieveValues();
  }, []);

  useEffect(() => {
    if (jwtToken) {
      fetchPlayers();
      fetchRoundNumber();
    }
  }, [jwtToken]);

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


  const fetchPlayers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/players`, { headers });
      setPlayers(response.data.players);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  const fetchRoundNumber = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/round-number`, { headers });
      setResponseMessage(response.data.message);
      setRoundNumberMax(response.data.roundNumber);
      setRoundNumber(response.data.roundNumber + 1);
      setScore('');
    } catch (error) {
      console.error('Error fetching roundNumber:', error);
      setScore('');
    }
  };


  const handleSaveScores = async () => {
    const allScoresEntered = players.every(item => item.score !== undefined && item.score !== null && item.score !== '');

    if (!allScoresEntered) {
      Alert.alert('Missing scores for players', 'Please enter score for all the players');
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/record_score`, players, { headers });
      setRoundNumber(roundNumber + 1);
      setScore('');
      setScoresSubmitted(true);
      setPlayers([]);
      navigation.navigate('Menu');
    } catch (error) {
      console.error('Error recording score:', error);
      setScore('');
    }
  };


  const handleScoreChange = (playerId, score) => {
    const updatedPlayers = players.map(player =>
      player.id === playerId ? { ...player, player_id: playerId, round_number: roundNumber, score } : player
    );
    setPlayers(updatedPlayers);
  };

  const renderItem = ({ item }) => (
    <View style={styles.dataRow}>
      <Text style={styles.dataCellName}>{item.name}</Text>
      <TextInput
        placeholder="Enter score"
        placeholderTextColor="#660c96"
        value={item.score}
        onChangeText={score => handleScoreChange(item.id, score)}
        style={{
          flex: 1,
          textAlign: 'center',
          borderColor: item.isValid ? 'black' : 'grey',
          borderWidth: 2,
          borderRadius: 5, // Border radius
          height: 30,
        }}
      />
    </View>
  );

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <GradientBanner text='Score Recorder' />
      <View style={styles.container}>
        <View style={styles.pageContent}>
          <View style={styles.title}>
            <Text style={styles.title}>Round Number : 
              <Text style={styles.txtcontent}>{roundNumber}</Text>
            </Text>           
          </View>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>Player Name</Text>
            <Text style={styles.headerCell}>Score</Text>
          </View>
          <View style={styles.rowWrapper}>
            <FlatList style={styles.flatListWrapper}
              data={players}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
            />
          </View>
          {/* {  Array.isArray(players) && players.length > 0  && //    <Text>{jwtToken}</Text>*/}
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
          </View>
          {/* }{ Array.isArray(players) && players.length === 0 &&
                <View style={styles.norecordsView}>
                    <Text style={styles.norecordsText}>{responseMessage}</Text>
                </View>          
            } */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.buttonMenu}
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
    padding: 20,
    textAlign: 'center',
    //backgroundColor: '#f5f5f5',
  },
  pageContent: {
    flex: 1, // Ensure content fills the remaining space
    marginTop: 0, // Set the margin top to 0      
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'blue',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 0,
  },
  
  txtcontent: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginLeft: 10,
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
    fontSize: 18,
  },
  flatListWrapper: {
    flex: 1,
    marginBottom: 10,
  },
  success: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'green',
  },

  buttonContainer: {
    borderRadius: 35, // Border radius 
    justifyContent: 'center', // Center vertically
    width: '50%',
    padding: 10,
    fontSize: 14,
    marginBottom: 300,
  },
  buttonRow: {
    flexDirection: 'row',
    paddingBottom: 3,
    justifyContent: 'space-between',
  },
  button: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: '47%',
    marginBottom: 16,
    backgroundColor: '#227fe3',
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
    marginBottom: 20,
    backgroundColor: '#227fe3',
    marginRight: 10
  },
  buttonLogout: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: '47%',
    marginBottom: 20,
    backgroundColor: '#9e3b34'
  },
  norecordsView: {
    alignItems: 'center',
  },
  norecordsText: {
    color: 'red', // Example text color
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  flatListWrapper: {
    flex: 1,
    marginBottom: 40,
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
export default RecordScores;
