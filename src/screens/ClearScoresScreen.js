import axios from 'axios';
import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import BASE_URL from '../app/Config';
import GradientBanner from '../components/Header';
import backgroundImage from '../images/barley-field-1684052_1280.jpg';
import Footer from '../components/Footer';

function ClearScores() {

  const [message, setMessage] = useState('');

  const navigation = useNavigation();

  //Clear Player Scores
  const handleClearScores = async () => {

    try {
      const response = await axios.delete(`${BASE_URL}/api/clearscores`);
      console.log('Response data:', response.data);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error deleting scores:', error);
      setMessage("An error occurred while clearing scores.");
    }
  };

  //Clear Players
  const handleClearPlayers = async () => {

    await axios.delete(`${BASE_URL}/api/clear-players`)
      .then(response => {
        console.log('Response data:', response.data);
        setMessage(response.data.message);
        navigation.navigate('Menu')
      }).catch(error => {
        console.error('Error deleting players:', error);
        setMessage("An error occurred while clearing players.");
      })
  };

  //Clear Players and Scores Tables
  const handleClearPlayersAndScores = async () => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/clear-multiple-tables`);
      console.log('Response data:', response.data);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error deleting scores:', error);
      setMessage("An error occurred while clearing Tables.");
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <GradientBanner text='Score Recorder' />
      <View style={styles.container}>
        <View style={styles.pageContent}>
          <Text style={styles.dimmedTextMarginTop}>Clear Recorded Scores, so that fresh scores will be recorded</Text>
          <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}
            onPress={handleClearScores}
            disabled={false}
            activeOpacity={0.7}
            underlayColor="#EFEFEF"
          >
            <Text style={styles.buttonText}>CLEAR SCORES</Text>
          </TouchableOpacity>
          </View>
          <Text style={styles.velvetText}>Clear players</Text>
          <View style={styles.buttonRow}>
          
          <TouchableOpacity style={styles.button}
            onPress={handleClearPlayers}
            disabled={false}
            activeOpacity={0.7}
            underlayColor="#EFEFEF"
          >
            <Text style={styles.buttonText}>CLEAR PLAYERS</Text>
          </TouchableOpacity>
          </View>
          <Text style={styles.velvetText}>Clear both players and Recorded Scores</Text>
          <View style={styles.buttonRow}>
         
          <TouchableOpacity style={styles.button}
            onPress={handleClearPlayersAndScores}
            disabled={false}
            activeOpacity={0.7}
            underlayColor="#EFEFEF"
          >
            <Text style={styles.buttonText}>PLAYERS AND SCORES </Text>
          </TouchableOpacity>
          </View>
          <Text style={styles.text}>{message}</Text>
          <View style={styles.buttonRow}>         
          <TouchableOpacity style={styles.buttonMenu}
            onPress={() => navigation.navigate('Menu')}
            disabled={false}
            activeOpacity={0.7}
            underlayColor="#EFEFEF"
          >
            <Text style={styles.buttonText}>MENU</Text>
          </TouchableOpacity>
          {/* </View>
          <View style={styles.buttonRow}> */}
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
}
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
  },
  title: {
    fontSize: 70,
  },
  text: {
    color: 'white',
  },
  dimmedText: {
    color: 'velvet', // Use a lighter color, such as gray, to create a dimmed effect
    fontSize: 10,

  },
  velvetText: {
    color: 'rgba(106, 0, 58, 1)', // Dark red color resembling velvet
    fontSize: 10,
  },

  dimmedTextMarginTop: {
    color: 'rgba(106, 0, 58, 1)', // Use a lighter color, such as gray, to create a dimmed effect
    fontSize: 10,
    marginTop: 90,
  }, 
  pageContent: {
    flex: 1, // Ensure content fills the remaining space
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
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
    marginTop: 0,
  },
  button: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: '47%',
    marginBottom: 16,
    backgroundColor: '#007AFF'
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
    marginBottom: 160,
    backgroundColor: '#007AFF',
    marginRight:10
  },
  buttonLogout: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: '47%',
    marginBottom: 160,
    backgroundColor: '#8a2b08'
  },
});

export default ClearScores;