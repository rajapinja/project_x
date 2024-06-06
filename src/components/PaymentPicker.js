import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { BASE_URL } from '../app/Config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentPicker = ({ selectedValue, onValueChange }) => {
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchPaymentTypes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/paymenttypes`);
      const fetchedPaymentTypes = response.data.paymenttypes;
      console.log("PaymentPicker - paymentTypes :", fetchedPaymentTypes);
      // Store data in AsyncStorage
      if (fetchedPaymentTypes.length > 0) {
        await AsyncStorage.setItem('paymentTypes', JSON.stringify(fetchedPaymentTypes));
        setPaymentTypes(fetchedPaymentTypes);
      } else {
        console.log('No payment types fetched from the API.');
        // Handle this scenario appropriately if needed
      }
      
    } catch (error) {
      console.error('Error fetching paymentTypes:', error.message);
      throw error; // Re-throw the error to handle it in fetchData
    }
  };

  const fetchData = async () => {
    try {
      // Check if data exists in AsyncStorage
      const storedPaymentTypes = await AsyncStorage.getItem('paymentTypes');
      console.log("PaymentPicker - Storage - paymentTypes :", storedPaymentTypes);
      if (storedPaymentTypes) {
        // Use stored data if available
        setPaymentTypes(JSON.parse(storedPaymentTypes));
      }

      // Fetch new data and update state
      await fetchPaymentTypes();
    } catch (error) {
      console.error('Error fetching and storing data:', error.message);
    } finally {
      // Set loading to false when the process is complete
      setLoading(false);
    }
  };

  if (loading) {
    return <Text color="red">Loading paymentTypes...</Text>;
  }

  return (
    <View style={styles.input}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      >
        <Picker.Item label="Select PaymentType" value="" style={styles.pickerText} />
        {paymentTypes.map((item, index) => (
          <Picker.Item style={styles.pickerText} key={index} label={item.payment_type} value={item.payment_type} />
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

export default PaymentPicker;
