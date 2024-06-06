import React, { useRef } from 'react';
import { View, Animated, PanResponder } from 'react-native';
import { useTheme, themes } from '../app/LightDarkContext';

const DraggableRadio = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === themes.dark; // Assuming 'dark' is one of the theme modes
  const dragX = useRef(new Animated.Value(0)).current;

  const handleSwipe = () => {
    toggleTheme(); // Trigger the theme change
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      Animated.event([null, { dx: dragX }], {
        useNativeDriver: false,
      })(_, gestureState);
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > 10 || gestureState.dx < -10) {
        handleSwipe();
        Animated.spring(dragX, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.spring(dragX, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const backgroundColor = isDark ? themes.dark.backgroundColor : themes.light.backgroundColor;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View
        {...panResponder.panHandlers}
        style={{
          backgroundColor,
          borderRadius: 20,
          width: 45,
          height: 20,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: 'lightgray',
          overflow: 'hidden',
        }}
      >
        <Animated.View
          style={{
            width: 20,
            height: 20,
            borderRadius: 20,
            backgroundColor: 'gray',
            position: 'absolute',
            transform: [{ translateX: dragX }],
            left: 0,
          }}
        />
      </View>
    </View>
  );
};

export default DraggableRadio;
