import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const FilePicker = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Request permission on component mount
    requestPermission();
  }, []);

  const requestPermission = async () => {
    try {
      const { status } = await DocumentPicker.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission denied!');
      }
    } catch (error) {
      console.error('Permission request error:', error);
    }
  };

  const pickFile = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({
        type: DocumentPicker.types.allFiles,
        // You can specify more options based on your requirements
        // For example:
        // type: 'application/pdf'
      });

      if (file.type === 'success') {
        setSelectedFile(file);
      } else {
        console.log('File selection cancelled');
      }
    } catch (error) {
      console.error('File picking error:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Pick a file" onPress={pickFile} />
      {selectedFile && (
        <View style={{ marginTop: 20 }}>
          <Text>File name: {selectedFile.name}</Text>
          <Text>File type: {selectedFile.type}</Text>
          <Text>File size: {selectedFile.size / 1000} KB</Text>
        </View>
      )}
    </View>
  );
};

export default FilePicker;
