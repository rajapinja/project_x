import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authorize, refresh } from 'react-native-app-auth';
import axios from 'axios';

const App = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    };
    getToken();
  }, []);

  const login = async () => {
    try {
      const config = {
        clientId: 'your_client_id',
        redirectUrl: 'your_redirect_uri',
        scopes: ['openid', 'profile', 'email'],
        serviceConfiguration: {
          authorizationEndpoint: 'your_auth_endpoint',
          tokenEndpoint: 'your_token_endpoint',
        },
      };

      const authState = await authorize(config);
      await AsyncStorage.setItem('token', authState.accessToken);
      setToken(authState.accessToken);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setToken('');
  };

  const fetchProtectedData = async () => {
    try {
      const response = await axios.get('your_protected_api_url', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Protected data:', response.data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <View>
      <Text>Token: {token}</Text>
      {token ? (
        <>
          <Button title="Fetch Protected Data" onPress={fetchProtectedData} />
          <Button title="Logout" onPress={logout} />
        </>
      ) : (
        <Button title="Login" onPress={login} />
      )}
    </View>
  );
};

export default App;
