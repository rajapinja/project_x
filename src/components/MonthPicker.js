import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const MonthPicker = ({ selectedValue, onValueChange }) => {

    //const [months, setMonths] = useState(['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']);

    const [months, setMonths] = useState([
        { abbreviation: 'JAN', fullName: 'JANUARY', number: '01' },
        { abbreviation: 'FEB', fullName: 'FEBRUARY', number: '02' },
        { abbreviation: 'MAR', fullName: 'MARCH', number: '03' },
        { abbreviation: 'APR', fullName: 'APRIL', number: '04' },
        { abbreviation: 'MAY', fullName: 'MAY', number: '05' },
        { abbreviation: 'JUN', fullName: 'JUNE', number: '06' },
        { abbreviation: 'JUL', fullName: 'JULY', number: '07' },
        { abbreviation: 'AUG', fullName: 'AUGUST', number: '08' },
        { abbreviation: 'SEP', fullName: 'SEPTEMBER', number: '09' },
        { abbreviation: 'OCT', fullName: 'OCTOBER', number: '10' },
        { abbreviation: 'NOV', fullName: 'NOVEMBER', number: '11' },
        { abbreviation: 'DEC', fullName: 'DECEMBER', number: '12' }       
    ]);


    if (!months || months.length === 0) {
        return <Text color="red">Loading months...</Text>;
    }

    return (
        <View style={styles.input}>
            <Picker
                selectedValue={selectedValue}
                onValueChange={onValueChange}
            >
                <Picker.Item label="Select Month" value="" style={styles.pickerText} />
                {months.map((item, index) => (
                    <Picker.Item
                        style={styles.pickerText}
                        key={index}
                        label={`${item.abbreviation}`}
                        //label={`${item.fullName} ${item.number}`}
                        value={item.abbreviation}
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
export default MonthPicker;