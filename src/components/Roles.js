import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import BASE_URL from '../app/Config';
import { Picker } from '@react-native-picker/picker';


const UserRoles = ({ selectedRole, onValueChange}) => {
   const [roles, setRoles] = useState([]); 

   // Always get latest round number from DB 
   useEffect(() => {    
    fetchRoles();    
  }, []);

  const fetchRoles = async () => {    
      await axios.get(`${BASE_URL}/api/roles`)
      .then(response => {
        console.log(response.data.userRoles);
        setRoles(response.data.userRoles);
      })
      .catch(error => {
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
      });
  };

  if (!roles || roles.length === 0) {
    return <Text color="red">Loading roles...</Text>;
  }

  return (
    <View style={styles.input}>     
      <Picker
        selectedValue={selectedRole}
        onValueChange={onValueChange}
      >
         
            <Picker.Item label="Select a Role" value={null} style={styles.pickerDefaultText}/>
              {roles.map((role,index) => (           
                <Picker.Item style={styles.pickerText}
                    key={index}  // Use a unique key, such as the index
                    label={role.role}  // Get the role name from the roleObject
                    value={role.role}  // Use the role name as the value
                />
                ))}          
      </Picker> 
    
      {/* <Text>{selectedRole}</Text> */}
    </View>
  );   
};

const styles = StyleSheet.create({
   
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    input: {
      width: 170,
      //padding: 10,
      borderWidth: 2, // Apply border
      borderColor: 'gray', // Border color
      borderRadius: 5, // Border radius
      textAlign: 'center',
      marginBottom: 16,
      fontSize: 16,
      height: 50,
      
    },
    errorText: {
      color: 'red',
      marginTop: 10,
    },
    pickerDefaultText:{       
      fontSize: 14,       
      textAlign:'center',       
      fontWeight: 'bold',
      color:'#FFFFFF90'
  },
    pickerText:{       
        fontSize: 16,       
        textAlign:'center',       
        fontWeight: 'bold',
        color:'black'
    }
  });
export default UserRoles;
