import React, { useRef } from 'react';
import { View, PanResponder, Animated, StyleSheet, Text } from 'react-native';
import GradientBanner from '../components/GradientBanner'; // Your GradientBanner component

const DraggableRadioButton = () => {
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.setOffset({
                    x: pan.x._value,
                    y: pan.y._value,
                });
            },
            onPanResponderMove: (_, gesture) => {
                Animated.event([null, { dx: pan.x, dy: pan.y }], {
                    useNativeDriver: false,
                })(_, gesture);
            },
            onPanResponderRelease: () => {
                pan.flattenOffset();
                // Check the position of the button and change color based on its position
                // For example:
                // if (pan.x._value > SOME_THRESHOLD) {
                //   // Change to darker color
                // } else {
                //   // Change to lighter color
                // }
            },
        })
    ).current;

    return (
        <View style={styles.container}>
            <Text style={styles.radioButtonText}>◉</Text>
            {/* <GradientBanner text='Politico' /> */}
            <Animated.View
                style={[
                    styles.radioButton,
                    { backgroundColor: 'lightgray', position: 'absolute' },
                    pan.getLayout(),
                ]}
                {...panResponder.panHandlers}
            >

            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'gray',
        bottom: 10, // Adjust bottom position
        right: 10, // Adjust right position
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioButtonText: {
        fontSize: 25,
    },
});

export default DraggableRadioButton;