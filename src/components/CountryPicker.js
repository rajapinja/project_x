import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { BASE_URL } from '../app/Config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CountryPicker = ({ selectedValue, onValueChange }) => {

  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/countries`);
      const fetchedCountries = response.data.countries;

      if (fetchedCountries.length > 0) {
        await AsyncStorage.setItem('countries', JSON.stringify(fetchedCountries));
        setCountries(fetchedCountries);
      } else {
        console.log('No countries fetched from the API.');
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
      const storedCountries = await AsyncStorage.getItem('countries');

      if (storedCountries) {
        // Use stored data if available
        setCountries(JSON.parse(storedCountries));
      }

      // Fetch new data and update state
      await fetchCountries();
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
        <Picker.Item label="Select Country" value="" style={styles.pickerText} />
        {countries.map((item, index) => (
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

export default CountryPicker;
