import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const YearPicker = ({ selectedValue, onValueChange }) => {

    const [years, setYears] = useState(['2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035']);


    if (!years || years.length === 0) {
        return <Text color="red">Loading years...</Text>;
    }

    return (
        <View style={styles.input}>
            <Picker
                selectedValue={selectedValue}
                onValueChange={onValueChange}
            >
                <Picker.Item label="Select Year" value="" style={styles.pickerText} />
                {years.map((item, index) => (
                    <Picker.Item style={styles.pickerText}
                        key={index}
                        label={item}
                        value={item}
                    />
                ))}
            </Picker>
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
export default YearPicker;