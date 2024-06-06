import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UseApiHeaders = () => {
  const [jwtToken, setJwtToken] = useState('');
  const [headers, setHeaders] = useState({
    Authorization: '',
    'Content-Type': 'application/json',
  });

  const retrieveValues = useCallback(async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      setJwtToken(accessToken ? accessToken.trim() : '');
    } catch (error) {
      console.error('Error retrieving values:', error);
    }
  }, []);

  useEffect(() => {
    retrieveValues();
  }, [retrieveValues]);

  useEffect(() => {
    setHeaders((prevHeaders) => ({
      ...prevHeaders,
      Authorization: `Bearer ${jwtToken}`,
    }));
  }, [jwtToken]);

  return { headers, jwtToken };
};

export default UseApiHeaders;
