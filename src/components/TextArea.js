import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const TextArea = ({value, onChange}) => {
  
  const [text, setText] = useState(value || '');

  const handleTextChange = (newText) => {
    setText(newText);
    if (onChange) {
      onChange(newText); // Propagate the change back to the parent component
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textArea}
        multiline={true}
        numberOfLines={3} // You can adjust the number of lines visible initially
        onChangeText={handleTextChange}
        value={text}
        placeholder="Enter your Address here..."
        placeholderTextColor="gray" // Customize placeholder text color
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textArea: {
    width: '110%',
    height: 60,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingTop: 6,
    fontSize: 14,
    textAlignVertical: 'top', // Align text to the top
    marginTop:0,
    marginRight:10,
    
  },
});

export default TextArea;