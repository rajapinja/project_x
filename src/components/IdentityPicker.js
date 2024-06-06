import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { BASE_URL } from '../app/Config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IdentityPicker = ({ selectedValue, onValueChange }) => {

  const [identityTypes, setIdentityTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchIdentityTypes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/countries`);
      const fetchedIdentityTypes = response.data.identitytypes;

      // Store data in AsyncStorage
      if (fetchedIdentityTypes.length > 0) {
      await AsyncStorage.setItem('identityTypes', JSON.stringify(fetchedIdentityTypes));
      setIdentityTypes(fetchedIdentityTypes);
      } else {
        console.log('No identity types fetched from the API.');
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
      const storedIdentityTypes = await AsyncStorage.getItem('identityTypes');

      if (storedIdentityTypes) {
        // Use stored data if available
        setIdentityTypes(JSON.parse(storedIdentityTypes));
      }

      // Fetch new data and update state
      await fetchIdentityTypes();
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
        <Picker.Item label="Select IdentityType" value="" style={styles.pickerText} />
        {identityTypes.map((item, index) => (
          <Picker.Item style={styles.pickerText}
            key={index}
            label={item.identity_type}
            value={item.identity_type}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    width: 160,
    //padding: 10,
    borderWidth: 1, // Apply border
    borderColor: 'gray', // Border color
    borderRadius: 5, // Border radius
    textAlign: 'center',
    fontSize: 12,
    height: 40,
    marginBottom: 6,
    marginRight: 10

  },
  pickerText: {
    fontSize: 12,
    //color:'gray'  
    //textAlign:'center'
  }
});

export default IdentityPicker;
