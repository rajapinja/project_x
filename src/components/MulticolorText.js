import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MulticolorText = () => {
  return (
    <View style={styles.container}>
      <Text>
        <Text style={styles.redText}>Red</Text>
        <Text style={styles.greenText}>Green</Text>
        <Text style={styles.blueText}>Blue</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redText: {
    color: 'red',
  },
  greenText: {
    color: 'green',
  },
  blueText: {
    color: 'blue',
  },
});

export default MulticolorText;
