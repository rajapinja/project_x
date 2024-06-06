import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientButton = ({ onPress, title, colors, start, end, buttonStyle, disabled }) => {

    return (
      <TouchableOpacity onPress={onPress} style={buttonStyle}>
        <LinearGradient
          colors={colors || ['#FF5F6D', '#FFC371']} // Default colors if none provided
          start={start || { x: 0, y: 0 }} // Default start position if none provided
          end={end || { x: 1, y: 0 }} // Default end position if none provided
          style={styles.button}
          disabled={false}
          activeOpacity={0.7}
          underlayColor="#EFEFEF"
          // style={buttonStyles}
          // disabled={disabled} //
        >
          <Text style={styles.buttonText}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    button: {
      borderRadius: 13,
      paddingHorizontal: 20,
      paddingVertical: 10,
      height: 36,
      width: '100%', 
    },
    buttonText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
    },
  });
  export default GradientButton;