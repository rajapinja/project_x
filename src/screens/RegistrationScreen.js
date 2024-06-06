import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Alert, TouchableOpacity } from 'react-native';
import UserRoles from '../components/Roles'
import {BASE_URL, PROJECT_NAME} from '../app/Config';
import GradientBanner from '../components/Header';
import Footer from '../components/Footer';

import backgroundImage from '../images/hintersee-3601004_1280.jpg';

const RegistrationScreen = ({ navigation }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState({});
  const [selectedRole, setSelectedRole] = useState('');
  const [statusCode, setStatusCode] = useState(null);


  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      return 'Invalid email format';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    return '';
  };


  const handleRegistration = async () => {

    // Create an object containing registration data   
    const errors = {

    };

    if (!username) {
      errors.username = 'Username is required';
    }

    const emailError = validateEmail(email);
    if (emailError) {
      errors.email = emailError;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      errors.password = passwordError;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
    } else {

      console.log("selectedRole:" + selectedRole);
      //console.log("Creating registrationData Object:");
      const registrationData = {
        username: username,
        userpassword: password,
        email: email,
        selectedRole: selectedRole,
      };
     // console.log("Created registrationData Object registrationData :", registrationData);
      // console.log("BASE_URL :", BASE_URL);

      await axios.post(`${BASE_URL}/api/registration`, JSON.stringify(registrationData), {
        headers: { 'Content-Type': 'application/json', }
      })
        .then(response => {
          //console.log(response)
          if(response){
            console.log('User Registration Successful', response.data.message);
            setUsername('');
            setPassword('');
            setEmail('');
            setStatusCode(response.status);
            navigation.navigate('Login');
          }         
          if (response.status === 1062) {
            console.log("message 1:", response.data.message)
            setStatusCode(response.status);
            navigation.navigate('Home')
          }
          if (response.status === 409) {
            // Display duplicate user error message
            console.log('Duplicate user:', response.data.message);
            //   navigation.navigate('Home')
          }
        }).catch(error => {
          if (error.response.data.error) {
            setErrorMessage(error.response.data.error);
            console.log("Response 0:", error.response.data.error)

            console.error('Response Status:', error.response.status);
          } else if (error.response) {
            // Handle response-related errors
            console.error('Response error.response):', error.response);
            console.error('Response error:', error.response.data.error);
            setErrorMessage(error.response.data.error);
          } else if (error.request) {
            // Handle request-related errors
            console.error('Request:', error.request);
          } else {
            // Handle other errors
            console.error('Other Error:', error.message);
          }
          navigation.navigate('Home')
        })
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <GradientBanner text={PROJECT_NAME} />
      <View style={styles.container}>
        <View style={styles.pageContent}>
          {/* <Text style={styles.banner}>Score Recorder</Text>   */}
          <Text style={styles.title}>Registration</Text>
          <TextInput
            placeholder="Username"
            placeholderTextColor="#ffffff"
            onChangeText={setUsername}
            style={[styles.input, { color: '#ffffff90' }]} // Set the text color to black
          />
          {errorMessages.username && <Text style={styles.errorText}>{errorMessages.username}</Text>}
          <TextInput
            placeholder="Password"
            placeholderTextColor="#ffffff"
            secureTextEntry
            onChangeText={setPassword}
            style={[styles.input, { color: '#ffffff90' }]} // Set the text color to black
          />
          {errorMessages.password && <Text style={styles.errorText}>{errorMessages.password}</Text>}
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#ffffff90"
            secureTextEntry
            onChangeText={setConfirmPassword}
            style={[styles.input, { color: '#ffffff90' }]}
          />
          {errorMessages.confirmPassword && <Text style={styles.errorText}>{errorMessages.confirmPassword}</Text>}
          <TextInput
            placeholder="Email"
            placeholderTextColor="#ffffff90"
            onChangeText={setEmail}
            style={[styles.input, { color: '#ffffff90' }]} // Set the text color to black
          />
          {errorMessages.email && <Text style={styles.errorText}>{errorMessages.email}</Text>}
          <UserRoles
            selectedRole={selectedRole}
            onValueChange={(itemValue) => setSelectedRole(itemValue)}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button}
              onPress={handleRegistration}
              disabled={false}
              activeOpacity={0.7}
              underlayColor="#ffffff70"
            >
              <Text style={styles.buttonText}>REGISTER</Text>
            </TouchableOpacity>
          </View>
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          {errorMessage !== '' && <Text style={styles.errorText}>Error: {errorMessage} </Text>}

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
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  pageContent: {
    flex: 1, // Ensure content fills the remaining space
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 100,
  },

  banner: {
    fontSize: 24,
    marginTop: 5,
    marginBottom: 100,
    textShadowColor: "blue",
    fontWeight: 'bold',
    // color:'#ff7e5f',
    color: '#2832b8',
  },

  input: {
    width: 160,
    padding: 10,
    borderWidth: 2, // Apply border
    borderColor: 'gray', // Border color
    borderRadius: 5, // Border radius
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
    height: 36,
  },
  buttonContainer: {
    borderRadius: 15, // Border radius 
    width: '52%',
    padding: 10,
    fontSize: 50,
    marginBottom: 60,
  },
  errorText: {
    color: 'red',
    fontSize: 30,
    fontWeight: 'bold',
  },

  buttonRow: {
    flexDirection: 'row',
    paddingBottom: 5,
    justifyContent: 'space-between',
    margin: 5,
    marginTop: 10,
  },
  button: {
    height: 36, // Adjust the height as needed
    //backgroundColor: '#2196F3', // Example background color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    width: '52%',
    marginBottom: 200,
    backgroundColor: '#007AFF'
  },
  buttonText: {
    color: '#E0E0E0', // Example text color
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default RegistrationScreen;
