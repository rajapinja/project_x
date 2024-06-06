import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import GradientBanner from '../components/Header';
import menuImage from '../images/space-3197611_1280.jpg';
import Footer from '../components/Footer';
import { LinearGradient } from 'expo-linear-gradient';
import GradientButton from '../components/GradientButton';
import {PROJECT_NAME} from '../app/Config';

const MenuScreen = ({ navigation }) => {

  return (
    <ImageBackground source={menuImage} style={styles.background}>
       <GradientBanner text={PROJECT_NAME} />
      <View style={styles.container}>
      <View style={styles.pageContent}>
        {/* <Text style={styles.banner}>Score Recorder</Text>   */}
        <Text style={styles.title}>Menu Options</Text>
        <View style={styles.buttonRow}>        
          <GradientButton
            onPress={() => navigation.navigate('CreateGame')}
            title={'CREATE~GAME'}
            colors={['#0000FF', '#50C878']} // Your custom color combination
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            buttonStyle = {styles.button}
          />   
           <GradientButton
            onPress={() => navigation.navigate('Swagger')}
            title={'SWAGGER~UI'}
            colors={['#0000FF', '#50C878']} // Your custom color combination
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            buttonStyle = {styles.button}
          />        
        </View>
        <View style={styles.buttonRow}>        
          <GradientButton
            onPress={() => navigation.navigate('AddPlayer')}
            title={'ADD~PLAYER'}
            colors={['#50C878', '#0000FF']} // Your custom color combination
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            buttonStyle = {styles.button}
          />  
          <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate('RecordScores')}
            // onPress={() => navigation.navigate('RecordScores', { players: players })} 
            disabled={false}
            activeOpacity={0.7}
            underlayColor="#EFEFEF"
          >
            <Text style={styles.buttonText}>RECORD SCORES</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate('DynamicDispaly')}
            disabled={false}
            activeOpacity={0.7}
            underlayColor="#EFEFEF"
          >
            <Text style={styles.buttonText}>DISPLAY SCORES</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate('EditScores')}
            disabled={false}
            activeOpacity={0.7}
            underlayColor="#EFEFEF"
          >
            <Text style={styles.buttonText}>EDIT SCORES</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.buttonRow}>
          <GradientButton
            onPress={() => navigation.navigate('Reentry')}
            title={'RE~ENTRY'}
            colors={['#00FF00', '#0000FF']} // Your custom color combination
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            buttonStyle = {styles.button}
          />          
          <GradientButton
           onPress={() => navigation.navigate('DeleteDuplicate')}
           title={'DUPLICATE~ENTRY '}
            colors={['#FF512F', '#0000FF']} // Your custom color combination
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            buttonStyle = {styles.button}
          />          
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate('Validator')}
            disabled={false}
            activeOpacity={0.7}
            underlayColor="#EFEFEF"
          >
            <Text style={styles.buttonText}>VALIDATE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate('ClearScores')}
            disabled={false}
            activeOpacity={0.7}
            underlayColor="#EFEFEF"
          >
            <Text style={styles.buttonText}>CLEAR DATA</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.buttonRow}>
        <GradientButton
           onPress={() => navigation.navigate('Profile')}
           title={'PROFILE'}
            colors={['#FF0000', '#0000FF']} // Your custom color combination
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            buttonStyle = {styles.button}
          />    
          {/* <TouchableOpacity style={styles.buttonProfile}
            onPress={() => navigation.navigate('Profile')}
            disabled={false}
            activeOpacity={0.7}
            underlayColor="#EFEFEF"
          >
            <Text style={styles.buttonText}>PROFILE</Text>
          </TouchableOpacity> */}
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
    padding: 16,
  },
  pageContent: {
    flex: 1, // Ensure content fills the remaining space
    marginTop: 0, 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:60
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 0,
    color: 'blue'
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
    borderRadius: 13,
    width: '47%',
    marginBottom: 10,
    backgroundColor: '#227fe3',
    marginRight:10,
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
    borderRadius: 13,
    width: '47%',
    marginBottom: 66,
    backgroundColor: '#9e3b34',
    fontSize: 16,

  },
  buttonProfile: {
    height: 36, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: '47%',
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#3949e3',
  },
  
});

export default MenuScreen;

