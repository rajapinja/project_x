import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import axios from 'axios';
import {BASE_URL, PROJECT_NAME} from '../app/Config';
import { useUserContext } from '../app/UserContext';
// import Timer from '../components/Timer';
import GradientBanner from '../components/Header';
import Footer from '../components/Footer';
import backgroundImage from '../images/wood-1963988_1280.jpg';
//import RunningClock from '../components/RunningClock';
//import LoggedInTime from '../components/LoggedInTime';

const LogoutScreen = ({ navigation }) => {

  const { user, role } = useUserContext();
    
  const handleLogout = async () => {
    // Perform logout actions here, such as clearing tokens or session data
    // After logout, navigate back to the login screen or any other desired screen
    console.log("User :", user, "Role :", role);
    try {
            const response = await axios.get(`${BASE_URL}/api/logout`);
            if (response.status === 200) {
                console.log('Loggedout User Successfully', response.data.message);              
                navigation.navigate('Login'); // Replace 'Login' with the appropriate screen name
              }
        } catch (error) {
            if (error.response) {
                console.error('Logout Failed', error.message);                
              } else {
                console.error('Error:', error.message);                
              }
        }
  };
  return (
    <ImageBackground source={backgroundImage} style={styles.background}> 
      <GradientBanner text={PROJECT_NAME}/>
        <View style={styles.container}>   
        <View style={styles.pageContent}>    
        <Text style={styles.title}>Logout Screen</Text>   
        <Text style={styles.profileTitle}>User Profile</Text>
            <View style={styles.innerView}>
              <Text style={styles.profileText}>Welcome, {user} ({role})  </Text>                        
            </View>
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
              onPress={handleLogout}
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
    title: {
      fontSize:20,
      marginBottom: 10,
      textShadowColor:"blue",
      fontWeight: 'bold', 
      color:"blue"   
    },
    profileTitle: {
      fontSize:16,
      marginBottom: 10,
      textShadowColor:"blue",
      fontWeight: 'bold', 
      color:'#44067b',   
      marginTop: 10, 
    },
    pageContent: {
      flex: 1, // Ensure content fills the remaining space
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40
    },
    buttonContainer: {
      borderRadius: 15, // Border radius 
      width: '52%',
      padding: 10,
      fontSize:50,
      marginBottom: 10,
    },
    errorText: {
      color: 'red',
      marginTop: 10,
    },
    profileText:{
      color: '#036e0c',
      fontSize: 14,
      fontWeight:'bold',
    },
    innerView:{
      marginBottom:20,
    },
    buttonRow: {
      flexDirection: 'row',
      paddingBottom: 5,
      justifyContent: 'space-between',
      marginTop: 0,
    },
    button: {
      height: 36, // Adjust the height as needed
      //backgroundColor: '#2196F3', // Example background color
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      width: '47%',
      marginBottom: 16,    
      backgroundColor: '#007AFF',
      marginRight:10
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
      marginBottom: 160,    
      backgroundColor: '#8a2b08'
    },
   
  });
export default LogoutScreen;
