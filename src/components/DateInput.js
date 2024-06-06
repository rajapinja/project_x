import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons'; // You might need to install this package

const DatePickerComponent = ({onSelectedDate}) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
    onSelectedDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.inputContainer}>
        <MaterialIcons name="date-range" size={20} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Select Date"
          value={date.toLocaleDateString()} // Show date in the text input
          editable={false} // Prevent editing of the text input
        />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    // marginLeft:4,
    marginBottom:6
  },
  input: {
    flex: 1,
    height: 36,
    width: 180,
    //paddingHorizontal: 4,
    //marginLeft: 4,
    marginRight:20,
   
  
  },
  icon: {
    marginRight: 2,
   
  },
});

export default DatePickerComponent;
