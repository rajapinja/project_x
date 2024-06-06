
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { BASE_URL } from '../app/Config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProjectPicker = ({ selectedValue, onValueChange }) => {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jwtToken, setJwtToken] = useState('');
  
  // Always retrieve accessToken from AsyncStorage
  useEffect(() => {
    retrieveValues();
  }, []);

  // Function to retrieve values from AsyncStorage  
  const retrieveValues = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      setJwtToken(accessToken.trim());
    } catch (error) {
      console.error('Error retrieving values:', error);
    }
  };

  // Define the headers with the access token
  const headers = {
    'Authorization': `Bearer ${jwtToken}`,
    'Content-Type': 'application/json',
  };


  useEffect(() => {  
    if(jwtToken){
        fetchProjects();   
    } 
  }, [jwtToken]);

  const fetchProjects = async () => {
    try {
        await axios.get(`${BASE_URL}/api/projects`, { headers: headers })
        .then(response => {
            console.log("Projects :", response.data.projects);
            setProjects(response.data.projects);
        }).catch(error => {
            if (error.response) {
                // Handle response-related errors
                console.error('Response:', error.response);
            } else if (error.request) {
                // Handle request-related errors
                console.error('Request:', error.request);
            } else {
                // Handle other errors
                console.error('Other Error:', error.message);
            }
        })    
    } catch (error) {
        console.error('Error fetching assetLocations:', error.message);     
    }finally {
        // Set loading to false when the process is complete
        setLoading(false);
      }
  };

  if (loading) {
    return <Text color="red">Loading Projects...</Text>;
  }

  return (
    <View style={styles.input}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      >
        <Picker.Item label="Select Project" value="" style={styles.pickerText} />
        {projects.map((item, index) => (
          <Picker.Item style={styles.pickerText} key={index} label={item.project_name} value={item.project_name} />
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

export default ProjectPicker;
