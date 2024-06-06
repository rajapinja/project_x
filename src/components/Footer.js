import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


const Footer = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.logoContainer}>
        {/* <Image source={require('./images/Logo_laraid.jpeg')} style={styles.logo} /> */}
        <Text style={styles.logoText}>LARAID SOFTWARE SOLUTIONS  <Text style={styles.superscript}>Innovation Explored...</Text> <Text style={styles.subscript}>@U72900TG2022OPC167370</Text></Text>
       
      </View>     
      <View style={styles.hr} />
      <Text style={styles.companyText}>
        *****copyright (Concept, Design, Architect and Solution) by{' '}
        <Text style={styles.incorporation}>www.laraidsolutions.com ***** </Text>{' '}
        <Text style={styles.name}>@Raja Pinja</Text>{'\n'}
        <Text style={styles.startupIndia}>
        -: Startup India CERTIFICATE NO:<Text style={styles.certificate}> DIPP114845 </Text>:-
        </Text>
        {'\n'}
        <Text style={styles.address}>
          @Prithvihomes, Flat no 203, A-Block, Spring Field Colony, Jeedimetla(V), Quthbullapur (M), Hyderabad (Secunderabad) - 500 055. Telangana, INDIA. Phone +91 9347160365(M)
        </Text>
      </Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 50, // Adjust size as needed
    resizeMode: 'contain',
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#0eac77',
    marginTop:0
  },
  caption: {
    fontStyle: 'italic',
    fontSize:6
  },
  incorporation: {
    textAlign: 'center',
    marginBottom: -6,
    fontSize:7,
    color:'blue'
  },
  name: {
    textAlign: 'center',
    marginBottom: -6,
    fontSize:7,
    color: '#db9212'
  },
  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,   
  },
  companyText: {
    fontSize: 7,   
    alignItems:'center'
  },
  address: {
    fontSize: 7,   
    alignItems:'center'
  },
  startupIndia: {
    fontWeight: 'bold',
    alignContent:'center',
    color: '#036e0c'
  },
  certificate: {
    fontSize: 7,
    color: '#44067b',
    fontWeight: 'bold',
  },
  superscript: {
    fontStyle: 'italic',
    fontSize:6,
    position: 'relative',
    top: -8, // Adjust the top position for the superscript
    color:'blue'
  },
  subscript: {
    fontSize: 8, // Adjust the font size for subscript
    position: 'relative',
    bottom: -8, // Adjust the bottom position for the subscript
    color: '#db9212'
  },
});

export default Footer;
