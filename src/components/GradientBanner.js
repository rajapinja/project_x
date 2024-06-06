import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const GradientBanner = ({ text }) => {
  return (
    <LinearGradient
      // colors={['#ff7e5f', '#feb47b', '#4facfe']}
      //colors={['rgba(255, 126, 95, 0.5)', 'rgba(254, 180, 123, 0.5)', 'rgba(79, 172, 254, 0.5)']}
      //colors={['#C0C0C0', '#A9A9A9', '#808080']}
      //colors={['#333333', '#1a1a1a', '#000000']}
      colors ={['rgba(0, 128, 0, 0.7)', 'rgba(255, 255, 0, 0.5)', 'rgba(0, 0, 255, 0.5)']} 
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradientBackground}
    >
      {/* <MultiColorText
        textParts={[
          { text: text, color: 'white' },
        ]}
      /> */}
       <Text style={styles.banner}>Some Title</Text>  
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    padding: 0,
    borderRadius: 10,
    marginVertical: 10,
    alignItems:'center', 
    width:'100%'
  },
  banner: {
    fontSize:22,
    marginTop: 5,   
    textShadowColor:"blue",
    fontWeight: 'bold', 
    color: '#32383D',   
       
  },
});

export default GradientBanner;
