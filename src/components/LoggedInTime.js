import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Use AsyncStorage for storing login time

const LoggedInTime = () => {
  const [loginTime, setLoginTime] = useState(null);

  useEffect(() => {
    // Retrieve login time from AsyncStorage
    const retrieveLoginTime = async () => {
      const storedLoginTime = await AsyncStorage.getItem('loginTime');
      if (storedLoginTime) {
        setLoginTime(new Date(parseInt(storedLoginTime, 10)));
      }
    };

    retrieveLoginTime();

    // Update login time every minute
    const interval = setInterval(() => {
      setLoginTime(new Date(loginTime));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [loginTime]);

  const currentTime = new Date();
  const loggedInDurationInSeconds = (currentTime - loginTime) / 1000;

  const hours = Math.floor(loggedInDurationInSeconds / 3600);
  const minutes = Math.floor((loggedInDurationInSeconds % 3600) / 60);

  const hoursDisplay = (hours) => {
    //const currentTime = new Date();  
    return (
      <View style={styles.container}>        
        <View style={styles.box}>
          <Text style={styles.text}><Text style={{...styles.text, color:'teal'}}> LOGGED IN TIME :</Text></Text>
        </View>   
        <View style={styles.box}>
          <Text style={styles.text}>{hours} <Text style={{...styles.text, color:'red'}}>h</Text></Text>
        </View>    
      </View>
    );
  };

  const minutesDisplay = (minutes) => {
      //const currentTime = new Date();  
      return (
        <View style={styles.container}>
          <View style={styles.box}>
            <Text style={styles.text}>{minutes} <Text style={{...styles.text, color:'blue'}}>m</Text></Text>
          </View>
          
        </View>
      );
    };

    const dashDisplay = (minutes) => {
      //const currentTime = new Date();  
      return (
        <View style={styles.container}>
          <View style={styles.box}>
            <Text style={styles.text}>-</Text>
          </View>
          
        </View>
      );
    };

  return (
    <View>
      <Text style={styles.durationText}>
       {hoursDisplay(hours)} {minutesDisplay(minutes)} 
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 50,
  },
  box: {
    backgroundColor: '#00FF00',
    padding: 10,
    borderRadius: 10,
    marginRight:10,
    marginTop:20,
    //height:44
  },
  text: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  durationText: {
    color:'#9008cf',
    fontSize: 16,
  },
});

export default LoggedInTime;
