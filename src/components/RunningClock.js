import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RunningClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const CurrentTimeDisplay = (currentTime) => {
    //const currentTime = new Date();  
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.text}>{currentTime.getHours()} <Text style={{...styles.text, color:'red'}}>h</Text></Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>{currentTime.getMinutes()} <Text style={{...styles.text, color:'blue'}}>m</Text></Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>{currentTime.getSeconds()} <Text style={{...styles.text, color:'brown'}}>s</Text></Text>
        </View>
        <View style={styles.box}>
        <Text style={styles.text}>{currentTime.getMilliseconds()} <Text style={{...styles.text, color:'green'}}>ms</Text></Text>
      </View>
      </View>
    );
  };  

  return (
    <View >
      <Text style={styles.clockText}>       
        {CurrentTimeDisplay(currentTime)}
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
    backgroundColor: 'orange',
    //backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 10,
    marginRight:10,
   
  },
  text: {
    fontSize: 8,
    fontWeight: 'bold',
  },
});

export default RunningClock;
