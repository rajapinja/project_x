import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { BASE_URL } from '../app/Config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AssetPicker = ({ selectedValue, onValueChange }) => {
  const [assetTypes, setAssetTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchAssetTypes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/assettypes`);
      const fetchedAssetTypes = response.data.assetTypes;
      console.log("AssetPicker - assettypes :", fetchedAssetTypes);
      // Store data in AsyncStorage
      if (fetchedAssetTypes.length > 0) {
        await AsyncStorage.setItem('assetTypes', JSON.stringify(fetchedAssetTypes));
        setAssetTypes(fetchedAssetTypes);
      } else {
        console.log('No asset types fetched from the API.');
        // Handle this scenario appropriately if needed
      }
      
    } catch (error) {
      console.error('Error fetching assetTypes:', error.message);
      throw error; // Re-throw the error to handle it in fetchData
    }
  };

  const fetchData = async () => {
    try {
      // Check if data exists in AsyncStorage
      const storedAssetTypes = await AsyncStorage.getItem('assetTypes');
      console.log("AssetPicker - Storage - assettypes :", storedAssetTypes);
      if (storedAssetTypes) {
        // Use stored data if available
        setAssetTypes(JSON.parse(storedAssetTypes));
      }

      // Fetch new data and update state
      await fetchAssetTypes();
    } catch (error) {
      console.error('Error fetching and storing data:', error.message);
    } finally {
      // Set loading to false when the process is complete
      setLoading(false);
    }
  };

  if (loading) {
    return <Text color="red">Loading assetTypes...</Text>;
  }

  return (
    <View style={styles.input}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      >
        <Picker.Item label="Select AssetType" value="" style={styles.pickerText} />
        {assetTypes.map((item, index) => (
          <Picker.Item style={styles.pickerText} key={index} label={item.asset_type} value={item.asset_type} />
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

export default AssetPicker;
