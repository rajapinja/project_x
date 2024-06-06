
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {BASE_URL, PROJECT_NAME} from '../app/Config';
import GradientBanner from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../components/Footer';
import backgroundImage from '../images/magnolia-trees-556718_1280.jpg';


function AddPlayer() {

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState("");
  const [jwtToken, setJwtToken] = useState('');
  const navigation = useNavigation();

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

  const handleAddPlayer = async () => {
    try {
      //retrieveValues();
      console.log("headers.Authorization :", headers.Authorization);
      await axios.post(`${BASE_URL}/api/add_player`, JSON.stringify({ name, mobile }), { headers: headers }
      ).then(response => {
        setMessage('Player added successfully!');
        setName('');
        setMobile('');
        navigation.navigate('Menu');
      }).catch(error => {
        setMessage('Error adding player.');
        console.error('Error adding player:', error);
      });
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <GradientBanner text='Score Recorder' />
      <View style={styles.container}>
        <View style={styles.pageContent}>
          <Text style={styles.title}>Add Player</Text>
          <TextInput style={styles.input}
            placeholder="Enter Name"
            placeholderTextColor="#696969"
            value={name}
            onChangeText={setName}
          />
          <TextInput style={styles.input}
            placeholder="Mobile Number"
            placeholderTextColor="#696969"
            value={mobile}
            onChangeText={setMobile}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button}
              onPress={handleAddPlayer}
              disabled={false}
              activeOpacity={0.7}
              underlayColor="#EFEFEF"
            >
              <Text style={styles.buttonText}>ADD PLAYER</Text>
            </TouchableOpacity>
            {message ? <Text>{message}</Text> : null}           
          </View>
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
    padding: 20,
  },
  pageContent: {
    flex: 1, // Ensure content fills the remaining space
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textShadowColor: "blue",
    fontWeight: 'bold',
    marginRight: 10,
  },  
  input: {
    width: 150,
    padding: 5,
    borderWidth: 2, // Apply border
    borderColor: 'gray', // Border color
    borderRadius: 5, // Border radius
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
    height: 36,
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
    width: '50%',
    marginBottom: 16,
    backgroundColor: '#227fe3',
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
    width: '50%',
    marginBottom: 120,
    backgroundColor: '#227fe3',
    marginRight:10
  },
  buttonLogout: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: '50%',
    marginBottom: 120,
    backgroundColor: '#9e3b34'
  },
});

export default AddPlayer;
