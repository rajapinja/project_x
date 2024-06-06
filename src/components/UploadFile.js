import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const UploadFile = () => {

    const pickDocument_0 = async () => {
        try {
            let result = await DocumentPicker.getDocumentAsync({});

            console.log(result);
            const output = result.assets[0];
            console.log(output.mimeType);
            console.log(output.name);
            console.log(output.size);
            console.log(output.uri);
            console.log(result.canceled);
        } catch (error) {
            console.error("Error picking document:", error);
        }
    };

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({});

            if (!result.canceled) {
                const selectedFile = result.assets[0];
                console.log('Selected file:', selectedFile.uri);
                console.log('File type:', selectedFile.mimeType);
                console.log('File name:', selectedFile.name);
                console.log('File size:', selectedFile.size);
                // Save or process the selected file here
            } else {
                console.log('File selection cancelled');
            }
        } catch (error) {
            console.error('Error picking document:', error);
        }
    };


    const pickAndSaveDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({});

            if (!result.canceled) {
                const selectedFile = result.assets[0];
                const fileUri = selectedFile.uri;

                // Create a new file URI to save the file in a different location (e.g., downloads)
                const newUri = FileSystem.documentDirectory + selectedFile.name;

                // Copy the file to the new location
                await FileSystem.copyAsync({ from: fileUri, to: newUri });

                console.log('File saved at:', newUri);
            } else {
                console.log('File selection cancelled');
            }
        } catch (error) {
            console.error('Error picking and saving document:', error);
        }
    };

    return (
        <View style={styles.background}>
            <Text style={styles.title}>Upload CSV File</Text>
            <View style={styles.button}>
                <Button title="Upload Your File" color="black" onPress={pickDocument} />
            </View>
            <View style={styles.button}>
                <Button title="Save To Downloads" color="black" onPress={pickAndSaveDocument} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor:
        //   "radial-gradient(ellipse at left bottom, rgb(163, 237, 255) 0%, rgba(57, 232, 255, 0.9) 59%, rgba(48, 223, 214, 0.9) 100% )",
    },

    button: {
        marginHorizontal: 60,
        marginTop: 20,
    },
    title: {
        fontSize: 20,
        textShadowColor: "blue",
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 0
    },
});

export default UploadFile;
