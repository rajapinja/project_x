import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import ValidationInput from '../components/ValidationInput';
import { useNavigation } from '@react-navigation/native';
import GradientBanner from '../components/Header';
import menuImage from '../images/railroad-163518_1280.jpg';
import Footer from '../components/Footer';

const ValidatorScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigation = useNavigation();

  const validateUsername = (text) => {
    if (text.length < 5) {
      return 'Username must be at least 5 characters';
    }
    return null; // No error
  };

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

  const handleSubmit = () => {
    // Handle form submission logic
  };

    
    
  return (
    <ImageBackground source={menuImage} style={styles.background}> 
     <GradientBanner text='Score Recorder'/> 
      <View style={styles.container}>
        <Text style={styles.title}> Validator <Text style={styles.subtext}>(User, Password, and Email)</Text></Text>
      <View style={styles.pageContent}>
        <ValidationInput
          label="Username"
          value={username}
          onChange={setUsername}
          validator={validateUsername} 
          placeholder="Enter username" 
          placeholderTextColor="#C0C0C0"        
        />
        <ValidationInput
          label="Password"
          value={password}
          onChange={setPassword}
          validator={validatePassword}
          placeholder="Enter password" 
          placeholderTextColor="#C0C0C0"   
        />
        <ValidationInput
          label="Email"
          value={email}
          onChange={setEmail}
          validator={validateEmail}
          placeholder="Enter email here" 
          placeholderTextColor="#C0C0C0"   
        />
          <View style={styles.buttonRow}> 
            <TouchableOpacity style={styles.button} 
              onPress={handleSubmit}
              disabled={false}
              activeOpacity={0.7}
              underlayColor="#EFEFEF"
            >   
              <Text style={styles.buttonText}>VALIDATE</Text>  
            </TouchableOpacity>  
           <TouchableOpacity style={styles.button} 
              onPress={() => navigation.navigate('Menu')}
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
    padding: 16,
    justifyContent: 'center',  
    alignItems: 'center',     
  },  
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color:'blue'
  },
  subtext: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 56,
    color:'gray'
  },
  pageContent: {
    flex: 1, // Ensure content fills the remaining space
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
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
  buttonRow: {
    flexDirection: 'row',     
    paddingBottom: 10,
    justifyContent: 'space-between',
    marginTop: 16, 
  },
  button: {
    height: 36, // Adjust the height as needed
    //backgroundColor: '#2196F3', // Example background color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: '47%',
    marginBottom: 16,    
    //backgroundColor: '#007AFF',
    //backgroundColor: '#216d94',
    backgroundColor: '#227fe3',
    marginRight:4,
  },
  buttonText: {
    color: '#E0E0E0', // Example text color
    fontSize: 12,
    fontWeight: 'bold',
  },


  buttonLogout: {
    height: 36, // Adjust the height as needed
    //backgroundColor: '#2196F3', // Example background color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: '47%',
    marginBottom: 120,    
    //backgroundColor: '#8a2b08',
    backgroundColor: '#9e3b34'
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default ValidatorScreen;
