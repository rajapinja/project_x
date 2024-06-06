import React, { useRef } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet, Easing, Text } from 'react-native';

const SparklingCracker = () => {
  const animatedValues = useRef([...Array(1000)].map(() => new Animated.Value(0))).current;

  const startAnimation = () => {
    Animated.parallel(
      animatedValues.map((value) => {
        return Animated.sequence([
          Animated.timing(value, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]);
      })
    ).start();
  };

  const animatedStyles = animatedValues.map((value, index) => {
    const inputRange = [1, 1000];
    const outputRange = [1, 1000];

    return {
      opacity: value.interpolate({
        inputRange,
        outputRange: [1, 100],
      }),
      transform: [
        {
          translateY: value.interpolate({
            inputRange,
            outputRange,
          }),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={startAnimation}>
        <View style={styles.button}>
          {/* Your button content */}
          <Text>Click me</Text>
        </View>
      </TouchableOpacity>
      {animatedStyles.map((style, index) => (
        <Animated.View key={index} style={[styles.sparkle, style]} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 15,
    backgroundColor: '#227fe3',
    borderRadius: 10,
  },
  sparkle: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#FFFF00', // Yellow color for sparkle
  },
});

export default SparklingCracker;
