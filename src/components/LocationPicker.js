import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const LocationPicker = ({ selectedProjectName, selectedValue, onValueChange, fetchedAssetLocations }) => {

  const [assetLocations, setAssetLocations] = useState([]);

  useEffect(() => {
    if (fetchedAssetLocations) {
      setAssetLocations(fetchedAssetLocations);
    }
  }, [selectedProjectName]);

  if (!fetchedAssetLocations || fetchedAssetLocations.length === 0) {
    return <Text color="red">Loading fetchedAssetLocations...</Text>;
  }

  return (
    <View style={styles.input}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      >
        <Picker.Item label="Select AssetLocation" value="" style={styles.pickerText} />
        {fetchedAssetLocations && fetchedAssetLocations.map((item, index) => (
          <Picker.Item style={styles.pickerText} key={index} label={item.asset_location} value={item.asset_location} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 190,
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

export default LocationPicker;
