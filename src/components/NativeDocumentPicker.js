import React from 'react';
import { View, Button, Text, Alert } from 'react-native';
import { DocumentPickerResponse } from './NativeDocumentPicker'; // Ensure the correct path to your DocumentPickerResponse module

const NativeDocument = ({ selectedDocuments, onDocumentPick }) => {

    AppRegistry.registerComponent('politico', () => App);
    
  const handlePickDocument = async () => {
    try {
      // Call the function passed from the parent component to pick documents
      onDocumentPick();
    } catch (error) {
      console.error('Document picking error:', error);
      Alert.alert('Error picking document');
    }
  };

  return (
    <View>
      <Button title="Pick Document" onPress={handlePickDocument} />
      {/* Render your selected documents */}
      {selectedDocuments.map((doc, index) => (
        <View key={index}>
          <Text>{doc.name}</Text>
          <Text>{doc.uri}</Text>
          {/* Render other properties as needed */}
        </View>
      ))}
    </View>
  );
};

export default NativeDocument;
