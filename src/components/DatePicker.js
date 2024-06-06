import React, { useState } from 'react';
import { View } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker'; 
//https://github.com/react-native-datetimepicker/datetimepicker#value-required - link

const DatePicker = ({ selectedDate, onChange }) => {
  return (
    <View>
      <RNDateTimePicker
        mode="date"     
        value={selectedDate}
        onChange={onChange}          
      />
    </View>

  );
};

export default DatePicker;
