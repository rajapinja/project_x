import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { BASE_URL } from '../app/Config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DistrictPicker = ({ selectedValue, onValueChange }) => {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchDistricts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/districts`);
      const fetchedDistricts = response.data.districts;

      if (fetchedDistricts.length > 0) {
        await AsyncStorage.setItem('districts', JSON.stringify(fetchedDistricts));
        setDistricts(fetchedDistricts);
      } else {
        console.log('No districts fetched from the API.');
        // Handle this scenario appropriately if needed
      }
    } catch (error) {
      console.error('Error fetching districts:', error.message);
      throw error; // Re-throw the error to handle it in fetchData
    }
  };

  const fetchData = async () => {
    try {
      // Check if data exists in AsyncStorage
      const storedDistricts = await AsyncStorage.getItem('districts');

      if (storedDistricts) {
        // Use stored data if available
        setDistricts(JSON.parse(storedDistricts));
      }

      // Fetch new data and update state
      await fetchDistricts();
    } catch (error) {
      console.error('Error fetching and storing data:', error.message);
    } finally {
      // Set loading to false when the process is complete
      setLoading(false);
    }
  };

  if (loading) {
    return <Text color="red">Loading districts...</Text>;
  }

  return (
    <View style={styles.input}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      >
        <Picker.Item label="Select District" value="" style={styles.pickerText} />
        {districts.map((item, index) => (
          <Picker.Item style={styles.pickerText} key={index} label={item.name} value={item.name} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 180,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 12,
    height: 40,
    marginBottom: 6,
  },
  pickerText: {
    fontSize: 12,
  },
});

export default DistrictPicker;
