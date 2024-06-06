
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BASE_URL from '../app/Config';
import GradientBanner from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../components/Footer';
import backgroundImage from '../images/magnolia-trees-556718_1280.jpg';


function DeleteDuplicatePlayers() {

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState("");
  const [jwtToken, setJwtToken] = useState('');
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleDeleteDuplicatePlayer = async () => {
    try {
     
      console.log("headers.Authorization :", headers.Authorization);
      axios.delete(`${BASE_URL}/api/delete_duplicates`, { headers: headers }
      ).then(response => {
        setMessage(response.data.message);
        //console.log(response.data.message);        
        navigation.navigate('Menu');
      }).catch(error => {
        setMessage(response.data.error);
        console.error(response.data.error);
        console.error('Error deleting duplicate player:', error);
      });
    } catch (error) {
      console.error('Error deleting duplicate player:', error);
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <GradientBanner text='Score Recorder' />
      <View style={styles.container}>
        <View style={styles.pageContent}>
          <Text style={styles.title}>Delete Duplicate Player(s)</Text>
          <TextInput style={styles.input}
            placeholder="Enter Name"
            placeholderTextColor="#696969"
            value={name}
            onChangeText={setName}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button}
              onPress={handleDeleteDuplicatePlayer}
              disabled={false}
              activeOpacity={0.7}
              underlayColor="#EFEFEF"
            >
              <Text style={styles.buttonText}>DELETE DUPLICATE</Text>
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
  title: {
    fontSize: 18,
    marginBottom: 10,
    textShadowColor: "blue",
    fontWeight: 'bold',
    marginTop: 0,
  },
  banner: {
    fontSize: 18,
    marginTop: 5,
    marginBottom: 80,
    textShadowColor: "blue",
    fontWeight: 'bold',
    color: 'gray',
  },
  input: {
    width: 150,
    padding: 10,
    borderWidth: 2, // Apply border
    borderColor: 'gray', // Border color
    borderRadius: 5, // Border radius
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 16,
    height: 36,
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
    marginBottom: 260,
    backgroundColor: '#227fe3',
    marginRight: 10,
    marginLeft: 10

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
    marginBottom: 10,
    backgroundColor: '#227fe3',
    marginRight:10
  },
  buttonLogout: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: '47%',
    marginBottom: 10,
    backgroundColor: '#9e3b34'
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default DeleteDuplicatePlayers;
