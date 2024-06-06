
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CustomerPicker = ({ selectedProjectName, selectedAssetLocation, selectedValue, onValueChange, fetchedCustomers }) => {

    const [customers, setCustomers] = useState([]);
  
    useEffect(() => {
      if (fetchedCustomers) {
        setCustomers(fetchedCustomers);
      }
    }, [selectedAssetLocation]);
  
    if (!fetchedCustomers || fetchedCustomers.length === 0) {
      return <Text color="red">Loading fetchedCustomers...</Text>;
    }
  
    return (
      <View style={styles.input}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
        >
          <Picker.Item label="Select Customer" value="" style={styles.pickerText} />
          {fetchedCustomers && fetchedCustomers.map((item, index) => (
            <Picker.Item style={styles.pickerText} key={index} label={item.customer_name} value={item.customer_name} />
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

export default CustomerPicker;
