import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const ValidationInput = ({ label, value, onChange, validator, placeholder, placeholderTextColor }) => {
  const [error, setError] = useState(null); 

  const handleInputChange = (text) => {
    onChange(text);
    const errorMessage = validator(text);
    setError(errorMessage);
  };

  return (
    <View>
      <Text style={styles.title}>{label}</Text>       
      <TextInput style={styles.input} value={value} onChangeText={handleInputChange} placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}/>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}       
    </View>
  );
};


const styles = StyleSheet.create({ 
  title: {
    fontSize:16,
    marginBottom: 1,
    textShadowColor:"blue",
    fontWeight: 'bold',         
  },
  
  input: {
    width: '66%',
    padding: 10,
    borderWidth: 2, // Apply border
    borderColor: 'gray', // Border color
    borderRadius: 5, // Border radius
    textAlign: 'center',
    marginBottom: 6,
    fontSize: 16,
    height: 36,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default ValidationInput;
