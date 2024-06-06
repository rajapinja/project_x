// import React, { useRef } from 'react';
// import { View, PanResponder, Animated, StyleSheet, Text } from 'react-native';

// const DraggableButton = () => {
//   const pan = useRef(new Animated.ValueXY()).current;

//   const panResponder = useRef(
//     PanResponder.create({
//       onMoveShouldSetPanResponder: () => true,
//       onPanResponderGrant: () => {
//         pan.setOffset({
//           x: pan.x._value,
//           y: pan.y._value,
//         });
//       },
//       onPanResponderMove: (_, gesture) => {
//         Animated.event([null, { dx: pan.x, dy: pan.y }], {
//           useNativeDriver: false,
//         })(_, gesture);
//       },
//       onPanResponderRelease: (_, gesture) => {
//         pan.flattenOffset();
//         if (gesture.dx > 50) {
//           // Change color to darker if dragged more than 50 units to the right
//           // For example:
//           // setDarkerColor(true);
//           console.log('Dragged to the right');
//         } else {
//           // Change color to lighter if dragged less than 50 units to the right
//           // For example:
//           // setDarkerColor(false);
//           console.log('Not enough drag to the right');
//         }
//       },
//     })
//   ).current;

//   return (
//     <View style={styles.container}>
//       <Animated.View
//         style={[
//           styles.radioButton,
//           { backgroundColor: 'lightgray', position: 'absolute' },
//           pan.getLayout(),
//         ]}
//         {...panResponder.panHandlers}
//       >
//         <Text style={styles.radioButtonText}>◉</Text>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   radioButton: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     borderWidth: 2,
//     borderColor: 'gray',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   radioButtonText: {
//     fontSize: 25,
//   },
// });

// export default DraggableButton;

import React from 'react';
import { View, Text, useColorScheme } from 'react-native';

const DraggableButton = () => {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  
  return (
      <View
          style={[
            {
              flex: 1,
              justifyContent: 'center',
              alignItem: 'center',
            },
            isDarkTheme
              ? { backgroundColor: 'black' }
              : { backgroundColor: 'white' },
          ]}>
          <Text style={[isDarkTheme ? { color: 'white' } : { color: 'black' }]}>
            This is demo of default dark/light theme using appearance.{' '}
          </Text>
     </View>
  );
}

export default DraggableButton;
