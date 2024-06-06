import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useUserContext } from '../app/UserContext';
import backgroundImage from '../images/sunset-3156440_1280.jpg';
import RunningClock from '../components/RunningClock';
import LoggedInTime from '../components/LoggedInTime';
import GradientBanner from '../components/Header';
import Footer from '../components/Footer';
import {PROJECT_NAME} from '../app/Config';

const ProfileScreen = ({ navigation }) => {
  const { user, role } = useUserContext();  
 
  return (
    <ImageBackground source={backgroundImage} style={styles.background}> 
      <GradientBanner text={PROJECT_NAME}/>
        <View style={styles.container}>
        <View style={styles.pageContent}>
        {/* <Text style={styles.banner}>Score Recorder</Text>  */}
        <Text style={styles.title}>User Profile Screen</Text> 
            <View style={styles.innerView}>
              <Text style={styles.profileText}>Welcome, {user} ({role})  </Text>                        
            </View>
            <View style={styles.innerView}>
              <RunningClock style={styles.profileText}/>
              <LoggedInTime/>
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
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize:20,
      marginBottom: 10,
      textShadowColor:"blue",
      fontWeight: 'bold', 
      color:"#00FF00",  
      marginTop: 120,  
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
      fontSize:30,
      marginBottom: 10,
    },
    errorText: {
      color: 'red',
      marginTop: 10,
    },
    profileText:{
      color: 'blue',
      fontSize: 14,
      fontWeight:'bold',
    },
    innerView:{
      marginBottom:20,
    },
    buttonRow: {
      flexDirection: 'row',     
      paddingBottom: 10,
      justifyContent: 'space-between',
      marginTop: 16, 
    },
    button: {
      height: 36,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      width: '47%',    
      backgroundColor: '#227fe3',
      marginRight:10
    },
    buttonText: {
      color: '#E0E0E0', // Example text color
      fontSize: 12,
      fontWeight: 'bold',
    },
    buttonLogout: {
      height: 36,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      width: '47%',
      marginBottom:160, 
      backgroundColor: '#9e3b34'
    },
   
  });
export default ProfileScreen;
