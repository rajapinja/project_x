import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { BASE_URL } from '../app/Config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StatePicker = ({ selectedValue, onValueChange }) => {

  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchStates = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/states`);
      const fetchedStates = response.data.states;

      if (fetchedStates.length > 0) {
        await AsyncStorage.setItem('states', JSON.stringify(fetchedStates));
        setStates(fetchedStates);
      } else {
        console.log('No states fetched from the API.');
        // Handle this scenario appropriately if needed
      }
    } catch (error) {
      console.error('Error fetching states:', error.message);
      throw error; // Re-throw the error to handle it in fetchData
    }
  };

  const fetchData = async () => {
    try {
      // Check if data exists in AsyncStorage
      const storedStates = await AsyncStorage.getItem('states');

      if (storedStates) {
        // Use stored data if available
        setStates(JSON.parse(storedStates));
      }

      // Fetch new data and update state
      await fetchStates();
    } catch (error) {
      console.error('Error fetching and storing data:', error.message);
    } finally {
      // Set loading to false when the process is complete
      setLoading(false);
    }
  };

  if (loading) {
    return <Text color="red">Loading states...</Text>;
  }

  return (
    <View style={styles.input}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      >
        <Picker.Item label="Select State" value="" style={styles.pickerText} />
        {states.map((item, index) => (
          <Picker.Item style={styles.pickerText}
            key={index}
            label={item.name}
            value={item.name}
          />
        ))}
      </Picker>
      {/* <Text>{selectedValue}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    width: 180,
    //padding: 10,
    borderWidth: 1, // Apply border
    borderColor: 'gray', // Border color
    borderRadius: 5, // Border radius
    textAlign: 'center',
    marginBottom: 6,
    fontSize: 12,
    height: 40,
    //:'blue'
  },
  pickerText: {
    fontSize: 12,
    //textAlign:'center'
  }
});

export default StatePicker;
