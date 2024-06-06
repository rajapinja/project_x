import React, { useState } from 'react';
import { View, TextInput, Text, Button, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GradientBanner from '../components/Header';
import { useUserContext } from '../app/UserContext';
import backgroundImage from '../images/natural-4821583_1280.png';
import Footer from '../components/Footer';
import { useTheme } from '../app/LightDarkContext';
import DraggableRadio from '../components/DraggableRadio';
import GradientButton from '../components/GradientButton';
import {BASE_URL, PROJECT_NAME} from '../app/Config';


const LoginScreen = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState({});
 

  // Assuming responseData is the JSON response from the login API
  const { setUser, setRole } = useUserContext();

  const navigation = useNavigation();
  const { theme, toggleTheme } = useTheme();

  const validateUsername = (text) => {
    if (text.length < 4) {
      return 'Username must be at least 5 characters';
    }
    return null; // No error
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    return '';
  };

 

  const handleLogin = async () => {

    const errors = {};

    if (!username) {
      errors.username = 'Username is required';
    }

    const userError = validateUsername(username);
    if (userError) {
      errors.username = userError;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      errors.password = passwordError;
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
    } else {

      await axios.post(`${BASE_URL}/api/userlogin`, {
        username: username,
        password: password,
      }).then(response => {

        console.log('Login Successful', response.data.message);
        console.log("User :", response.data.user);
        console.log("Role :", response.data.role);

        // Get the current timestamp
        const loginTime = new Date().getTime().toString();
        // Set the login time in AsyncStorage
        AsyncStorage.setItem('loginTime', loginTime);

        setPassword('');
        setUsername('');
        setUser(response.data.user);
        setRole(response.data.role);

       

        // Define the key-value pairs you want to set
        //  trim any white spaces          
        const keyValues = [
          { key: 'accessToken', value: response.data.accessToken },
          { key: 'loginTime', value: loginTime },
          // { key: 'user', value: user },
          // { key: 'role', value: role },
        ];

        const setItemPromises = keyValues.map(async ({ key, value }) => {
          try {
            await AsyncStorage.setItem(key, value);
            console.log(`Successfully set ${key}`);
            return true; // Return a resolved promise for success
          } catch (error) {
            console.error(`Error setting ${key}:`, error);
            return false; // Return a rejected promise for failure
          }
        });

        // Wait for all promises to complete
        Promise.all(setItemPromises)
          .then((results) => {
            // Check if all promises succeeded
            if (results.every((result) => result)) {
              console.log('All items set successfully.');
              //navigation.navigate('Menu'); 
              navigation.navigate('Customer');
            } else {
              console.error('Some items failed to be set.');
              // Handle partial failure here if needed
            }
          })
          .catch((error) => {
            console.error('Error setting items:', error);
          });


      }).catch(error => {
        setPassword('');
        setUsername('');
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
      })
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <GradientBanner text={PROJECT_NAME}/>
      {/* <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}> */}
      <View style={styles.container}>
        <View style={styles.topRight}>
          <DraggableRadio />
        </View>
        <View style={styles.pageContent}>
          <Text style={{...styles.title, color:theme.textColor}}>Login</Text>
          <TextInput
            placeholder="Username"
            placeholderTextColor={theme.placeholderTextColor}
            value={username}
            onChangeText={setUsername}
            style={{...styles.input, borderColor:theme.borderColor}} // Set the text color to black
          />
          {errorMessages.username && <Text style={styles.errorText}>{errorMessages.username}</Text>}
          <TextInput
            placeholder="Password"
            placeholderTextColor={theme.placeholderTextColor}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={{...styles.input, borderColor:theme.borderColor}}
          />
          {errorMessages.password && <Text style={styles.errorText}>{errorMessages.password}</Text>}
          <View style={styles.buttonRow}>          
            <GradientButton
              onPress={handleLogin}
              title={'LOGIN'}
              colors={['#66FFFF', '#FF0000']} // Your custom color combination
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              buttonStyle = {styles.button}
          />    
          </View>
        </View>
      </View>
      {/* </View> */}
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
    padding: 20,
  },

  pageContent: {
    flex: 1, // Ensure content fills the remaining space
    marginTop: 0, // Set the margin top to 0
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  title: {
    fontSize: 20,
    textShadowColor: "blue",
    fontWeight: 'bold',
    marginBottom: 16,
  },

  banner: {
    fontSize: 34,
    marginTop: 5,
    marginBottom: 140,
    textShadowColor: "blue",
    fontWeight: 'bold',
    color: 'gray',
  },

  buttonContainer: {
    borderRadius: 15, // Border radius 
    width: '62%',
    padding: 10,
    fontSize: 50,
    marginBottom: 10,
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
    width: '54%',
    marginBottom: 180,
    backgroundColor: '#007AFF'
  },  
  input: {
    width: 160,
    padding: 10,
    borderWidth: 1, // Apply border
    borderColor: 'gray', // Border color
    borderRadius: 5, // Border radius
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
    height: 36,
  }, 
  buttonText: {
    color: '#E0E0E0', // Example text color
    fontSize: 12,
    fontWeight: 'bold',
  },
  dataRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 5,
    justifyContent: 'space-between',
},
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  topRight: {
    position: 'absolute',
    top: 2,
    right: 0,
    zIndex: 999,
  },
 
 
});

export default LoginScreen;
