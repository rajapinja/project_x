import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const ConstitutionPicker = ({ selectedValue, onValueChange, fetchedConstitutions, selectedDistrict }) => {

    const [constitutions, setConstitutions] = useState([]);

    useEffect(() => {
        if (fetchedConstitutions) {
            setConstitutions(fetchedConstitutions);
        }
    }, [selectedDistrict]);

    if (!fetchedConstitutions || fetchedConstitutions.length === 0) {
        return <Text color="red">Loading fetchedConstitutions...</Text>;
    }

    return (
        <View style={styles.input}>
            <Picker
                selectedValue={selectedValue}
                onValueChange={onValueChange}
            >
                <Picker.Item label="Select Constitution" value="" style={styles.pickerText} />
                {fetchedConstitutions && fetchedConstitutions.map((item, index) => (
                    <Picker.Item style={styles.pickerText}
                        key={index}
                        label={item.name}
                        value={item.name}
                    />
                ))}
            </Picker>
            {/* <Text>{selectedValue}</Text> */}
        </View>
    );
};

const styles = StyleSheet.create({
    picker: {
        height: 50,
        width: '100%',
    },
    input: {
        width: 180,
        //padding: 10,
        borderWidth: 1, // Apply border
        borderColor: 'gray', // Border color
        borderRadius: 5, // Border radius
        textAlign: 'center',
        fontSize: 12,
        height: 40,
        marginBottom: 6,

    },
    pickerText: {
        fontSize: 12,
        //color:'gray'  
        //textAlign:'center'
    }
});

export default ConstitutionPicker;
