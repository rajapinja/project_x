// DatePickerComponent.js
import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePickerComponent = ({ onDateSelected }) => {

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    //Alert.alert('Inside handleDateChange');
    //console.log('Inside handleDateChange');
    const currentDate = selectedDate || date;
    //Alert.alert('Date Selected', currentDate.toString());
    setShowPicker(Platform.OS === 'ios');
    //Alert.alert('Date Selected-1', currentDate.toString());
    setDate(currentDate);
  
    // Check if this log is shown
    //console.log('Before onDateSelected');
  
    // Check the behavior of onDateSelected
    onDateSelected(currentDate); // Passing back the selected date
  
    // Check if this log is shown
    //console.log('After onDateSelected');
  };
  

  const handleConfirm = () => {
    Alert.alert("Inside handleConfirm");
    //const formattedDate = date.toISOString().split('T')[0]; // Extract date part
    onDateSelected(date); // Send selected date back to AnotherComponent
    setShowPicker(false);
  };

  return (
    <View>
      <Button title="Select Date" onPress={() => setShowPicker(true)} />
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="calander"
          onChange={handleDateChange}
          //onConfirm={handleConfirm}
          onCancel={() => setShowPicker(false)}
        />
      )}
    </View>
  );
};

export default DatePickerComponent;
