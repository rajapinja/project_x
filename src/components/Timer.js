import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import BASE_URL from '../app/Config';

const Timer = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    axios.get(`${BASE_URL}/api/current-time`)
      .then(response => {
        setCurrentTime(response.data.current_time);
      })
      .catch(error => {
        console.error('Error fetching current time:', error);
      });
  }, []);

  return (
    <View >
      <Text style={styles.title}>Server Time: {currentTime}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  
 
  title: {
    fontSize:20,
    marginBottom: 10,
    textShadowColor:"blue",
    fontWeight: 'bold',  
        
  },
  
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
  },
});
export default Timer;
