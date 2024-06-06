
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Define the key-value pairs you want to set
const keyValues = [
    { key: 'accessToken', value: response.data.accessToken },
    { key: 'loginTime', value: loginTime },            
  ];

  // Use Promise.all to set multiple items asynchronously
  const setItemPromises = keyValues.map(async ({ key, value }) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log(`Successfully set ${key}`);
    } catch (error) {
      console.error(`Error setting ${key}:`, error);
    }
  });
  
  // Wait for all promises to complete
  Promise.all(setItemPromises)
  .then(() => {
    console.log('All items set successfully.');
  })
  .catch(error => {
    console.error('Error setting items:', error);
  });


  // Function to retrieve values from AsyncStorage
    const retrieveValues = async () => {
    try {
      // Use Promise.all to retrieve multiple items asynchronously
      const keyValues = [
        { key: 'accessToken' },
        { key: 'loginTime' },
      ];
  
      const retrievedValues = await Promise.all(
        keyValues.map(async ({ key }) => {
          try {
            const value = await AsyncStorage.getItem(key);
            console.log(`Retrieved ${key}:`, value);
            return { key, value };
          } catch (error) {
            console.error(`Error retrieving ${key}:`, error);
            return { key, value: null }; // Handle retrieval errors
          }
        })
      );
  
      // Process retrieved values as needed
      const accessToken = retrievedValues.find((item) => item.key === 'accessToken')?.value;
      const loginTime = retrievedValues.find((item) => item.key === 'loginTime')?.value;
  
      // Now you can use accessToken and loginTime in your code
      console.log('accessToken:', accessToken);
      console.log('loginTime:', loginTime);
  
    } catch (error) {
      console.error('Error retrieving values:', error);
    }
  };
  
  // Call the retrieveValues function to retrieve the values
  retrieveValues();

  // Retrieve the accessToken
const getAccessToken = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');   
      if (accessToken !== null) {
        // Access token is available, you can use it for API requests     
        setJwtToken(accessToken);
      } else {      
        return null;
      }
    } catch (error) {    
      console.error('Error getting accessToken:', error);
      return null;
    }
  };