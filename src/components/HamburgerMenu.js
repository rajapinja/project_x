import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for icons
import { LinearGradient } from 'expo-linear-gradient';

const HamburgerMenu = ({ showMenu, onPress, route, navigation, jwtToken, isAllowedRoute }) => {  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.hamburger}>
        <Ionicons name="menu" size={40} color="black" />
      </TouchableOpacity>
      <Modal visible={showMenu} transparent={true} animationType="slide" onRequestClose={onPress}>       
        <LinearGradient
            colors={['rgba(79, 172, 254, 0.9)', 'rgba(254, 180, 123, 0.8)','rgba(255, 126, 95, 0.7)']}
        // Change these colors as per your gradient
            style={styles.modalContainer}
          >
           <ScrollView>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={onPress}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
            <View style={styles.menuItems}>
              {route.name === 'Home' && (
                <>
                 <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Registration')}><Text style={styles.menuText}>Registration</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Login')}><Text style={styles.menuText}>Login</Text></TouchableOpacity>                 
                </>
              )}
              {route.name === 'Registration' && (
                <>                  
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}><Text style={styles.menuText}>Home</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Login')}><Text style={styles.menuText}>Login</Text></TouchableOpacity>               
                </>
              )}
              {route.name === 'Login' && (
                <>
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}><Text style={styles.menuText}>Home</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Rigistration')}><Text style={styles.menuText}>Rigistration</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Menu')}><Text style={styles.menuText}>Menu</Text></TouchableOpacity>
                  {/* <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PaymentGateway')}><Text style={styles.menuText}>PaymentGateway</Text></TouchableOpacity> */}
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Logout')}><Text style={styles.menuText}>Logout</Text></TouchableOpacity>
                </>
              )} 
              {isAllowedRoute && (
                <>
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Menu')}><Text style={styles.menuText}>Menu</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Customer')}><Text style={styles.menuText}>Customer</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('CustomerDisplay')}><Text style={styles.menuText}>CustomerDisplay</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AssetDisplay')}><Text style={styles.menuText}>AssetDisplay</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PaymentDisplay')}><Text style={styles.menuText}>PaymentDisplay</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PaymentReceipt')}><Text style={styles.menuText}>PaymentReceipt</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PrintPDF')}><Text style={styles.menuText}>PrintPDF</Text></TouchableOpacity>
                  {/* <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PaymentGateway')}><Text style={styles.menuText}>PaymentGateway</Text></TouchableOpacity> */}
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Profile')}><Text style={styles.menuText}> Profile</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Logout')}><Text style={styles.menuText}>Logout</Text></TouchableOpacity>
                </>
              )}
              {route.name === 'Menu' && {jwtToken} && (
                <>
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}><Text style={styles.menuText}>Home</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Rigistration')}><Text style={styles.menuText}>Rigistration</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Customer')}><Text style={styles.menuText}>Customer</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('CustomerDisplay')}><Text style={styles.menuText}>CustomerDisplay</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AssetDisplay')}><Text style={styles.menuText}>AssetDisplay</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PaymentDisplay')}><Text style={styles.menuText}>PaymentDisplay</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PaymentReceipt')}><Text style={styles.menuText}>PaymentReceipt</Text></TouchableOpacity>
                  {/* <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PaymentGateway')}><Text style={styles.menuText}>PaymentGateway</Text></TouchableOpacity> */}
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PrintPDF')}><Text style={styles.menuText}>PrintPDF</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Swagger')}><Text style={styles.menuText}>Swagger</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Logout')}><Text style={styles.menuText}>Logout</Text></TouchableOpacity>
                </>
              )}
              {route.name === 'Logout' && (
                <>
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Rigistration')}><Text>Rigistration</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Login')}><Text>Login</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Profile')}><Text>Profile</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Menu')}><Text>Menu</Text></TouchableOpacity>
                </>
              )} 
            </View>
          </View>
          </ScrollView>
        </LinearGradient>       
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  hamburger: {
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 30,
    paddingHorizontal: 20, // Adjust padding as needed
  },
  closeButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: 'white',
    fontSize: 18,
  },
  menuItems: {
    marginTop: 12,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  menuText: {
    color: 'purple',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default HamburgerMenu;
