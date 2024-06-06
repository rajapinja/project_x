// RadioButton.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useThemeContext } from '../app/ThemeContext';

const RadioButton = () => {
  const { isDarkTheme, setIsDarkTheme } = useThemeContext();

  const handleSelect = (option) => {
    setIsDarkTheme(option === 'Dark');
  };

  return (
    <View style={styles.radioContainer}>
      <TouchableOpacity
        style={[styles.radioOption, isDarkTheme ? styles.selectedOption : null]}
        onPress={() => handleSelect('Light')}
      >
        <Text style={styles.optionText}>Light</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.radioOption, !isDarkTheme ? styles.selectedOption : null]}
        onPress={() => handleSelect('Dark')}
      >
        <Text style={styles.optionText}>Dark</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  radioOption: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedOption: {
    backgroundColor: '#ccc', // Change color for selected option
  },
  optionText: {
    fontSize: 16,
  },
});

export default RadioButton;
