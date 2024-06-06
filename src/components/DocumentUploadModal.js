import DocumentPicker from 'react-native-document-picker'; // Use a document picker library
import React, { useState, useEffect } from 'react';
import { View, Modal, Button, Text, StyleSheet, PermissionsAndroid, Platform, ImageBackground, KeyboardAvoidingView, Dimensions } from 'react-native';
import GradientButton from '../components/GradientButton';
import GradientBanner from '../components/Header';
import backgroundImage from '../images/iceland-1979445_1280.jpg';
import Footer from '../components/Footer';

const DocumentUploadModal = ({ initialSelectedDocuments, setSelectedDocuments, handleSaveDocuments }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState(initialSelectedDocuments);

  useEffect(() => {
    requestStoragePermission();
  }, []);

  // Function to request storage permission
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        if (
          granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Storage permission granted');
        } else {
          console.log('Storage permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const handleUpload = async (documentKey) => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      // Assuming 'selectedDocs' is an array of objects or an object itself
      setSelectedDocs((prevSelectedDocs) => {
        const updatedDocs = [...prevSelectedDocs]; // Create a copy of the state

        // Assuming 'documentKey' is the key for the specific document in the state
        updatedDocs[documentKey] = res; // Update the specific document

        return updatedDocs; // Set the updated state
      });
    } catch (err) {
      console.log(err);
    }
  };

 
  const handleSaveToDB = () => {
    setSelectedDocuments(selectedDocs);
    handleSaveDocuments(selectedDocs);
    // Close the modal or perform any other necessary actions after saving
  };

  return (
    <View>
      <GradientButton
        onPress={() => setModalVisible(true)}
        title={'OPEN~UPLOAD'}
        colors={['#0000FF', '#50C878']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        buttonStyle={styles.button}
      />
      <Modal visible={modalVisible} animationType="slide">
        <ImageBackground source={backgroundImage} style={styles.background}>
          <GradientBanner text='Politico' />
          <View style={styles.container}>
            <Text style={styles.title}>Select documents to upload</Text>
            <View style={styles.pageContent}>
              <View style={styles.InputRow}>
                <GradientButton
                  onPress={handleTest}
                  title={'UPLOAD_FILE_1'}
                  colors={['#0000FF', '#50C878']}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  buttonStyle={styles.button}
                />
                <GradientButton
                  onPress={handleUpload}
                  title={'UPLOAD_FILE_2'}
                  colors={['#0000FF', '#50C878']}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  buttonStyle={styles.button}
                />
              </View>
              <View style={styles.InputRow}>
                <GradientButton
                  onPress={handleSaveToDB}
                  title={'SAVE_TO_DB'}
                  colors={['teal', 'purple']}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  buttonStyle={styles.button}
                />
                <GradientButton
                  onPress={() => setModalVisible(false)}
                  title={'CLOSE'}
                  colors={['gray', 'red']}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  buttonStyle={styles.button}
                />
              </View>
            </View>
          </View>
          <Footer />
        </ImageBackground>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Scale the image to cover the entire screen
    justifyContent: 'center', // Center vertically
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    textShadowColor: "blue",
    fontWeight: 'bold',
    marginBottom: 0,
    marginTop: 40,
    alignItems: 'center',
    color: 'blue',
    alignContent: 'center'
  },
  InputRow: {
    flexDirection: 'row',
    paddingBottom: 5,
    justifyContent: 'space-between',
    marginRight: 10
  },
  pageContent: {
    flex: 1, // Ensure content fills the remaining space
    marginTop: 0, // Set the margin top to 0
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  buttonContainer: {
    borderRadius: 20, // Border radius 
    justifyContent: 'center', // Center vertically
    width: '48%',
    padding: 10,
    fontSize: 50,
  },
  buttonRow: {
    flexDirection: 'row',
    paddingBottom: 5,
    justifyContent: 'space-between',
    marginTop: 16,
    marginRight: 10
  },
  button: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    width: '46%',
    marginBottom: 26,
    backgroundColor: '#227fe3',
  },
  buttonText: {
    color: '#E0E0E0', // Example text color
    fontSize: 12,
    fontWeight: 'bold',
  },
});
export default DocumentUploadModal;
