import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Text, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import GradientBanner from '../components/Header';
import backgroundImage from '../images/clouds-1282314_1280.jpg';
import Footer from '../components/Footer';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../app/LightDarkContext';
import DraggableRadio from '../components/DraggableRadio';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL, PROJECT_NAME } from '../app/Config';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {

  const [identityTypes, setIdentityTypes] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [assetTypes, setAssetTypes] = useState([]);
  const [paymentTypes, setPaymentTypes] = useState([]);

  const route = useRoute();

  const { theme, toggleTheme } = useTheme();

  const handleSwipe = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  useEffect(() => {
    fetchDataAndStore();
  }, []);


  // Example function to fetch and store data
  const fetchDataAndStore = async () => {
    try {
      // Fetch data from API
      await fetchDistricts();
      await fetchStates();
      await fetchCountries();
      await fetchIdentityTypes();
      await fetchAssetTypes();
      await fetchPaymentTypes();
    } catch (error) {
      console.error('Error fetching and storing data:', error);
    }
  };


  const fetchDistricts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/districts`);
      const fetchedDistricts = response.data.districts || [];
      
      if (fetchedDistricts.length > 0) {
        await AsyncStorage.setItem('districts', JSON.stringify(fetchedDistricts));
        setDistricts(fetchedDistricts);
      } else {
        console.log('No districts fetched from the API.');
        // Handle this scenario appropriately if needed
      }
    } catch (error) {
      console.error('Error fetching districts:', error.message);
      throw error;
    }
  };
  
  const fetchStates = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/states`);
      const fetchedStates = response.data.states || [];
      
      if (fetchedStates.length > 0) {
        await AsyncStorage.setItem('states', JSON.stringify(fetchedStates));
        setStates(fetchedStates);
      } else {
        console.log('No states fetched from the API.');
        // Handle this scenario appropriately if needed
      }
    } catch (error) {
      console.error('Error fetching states:', error.message);
      throw error;
    }
  };
  
  const fetchCountries = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/countries`);
      const fetchedCountries = response.data.countries || [];
      
      if (fetchedCountries.length > 0) {
        await AsyncStorage.setItem('countries', JSON.stringify(fetchedCountries));
        setCountries(fetchedCountries);
      } else {
        console.log('No countries fetched from the API.');
        // Handle this scenario appropriately if needed
      }
    } catch (error) {
      console.error('Error fetching countries:', error.message);
      throw error;
    }
  };
  
  const fetchIdentityTypes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/identitytypes`);
      const fetchedIdentityTypes = response.data.identitytypes || [];
      
      if (fetchedIdentityTypes.length > 0) {
        await AsyncStorage.setItem('identityTypes', JSON.stringify(fetchedIdentityTypes));
        setIdentityTypes(fetchedIdentityTypes);
      } else {
        console.log('No identity types fetched from the API.');
        // Handle this scenario appropriately if needed
      }
    } catch (error) {
      console.error('Error fetching identity types:', error.message);
      throw error;
    }
  };
  
  const fetchAssetTypes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/assettypes`);
      const fetchedAssetTypes = response.data.assettypes || [];
      console.log("Home - assettypes :", fetchedAssetTypes);
      
      if (fetchedAssetTypes.length > 0) {
        await AsyncStorage.setItem('assetTypes', JSON.stringify(fetchedAssetTypes));
        setAssetTypes(fetchedAssetTypes);
      } else {
        console.log('No asset types fetched from the API.');
        // Handle this scenario appropriately if needed
      }
    } catch (error) {
      console.error('Error fetching asset types:', error.message);
      throw error;
    }
  };

  const fetchPaymentTypes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/paymenttypes`);
      const fetchedPaymentTypes = response.data.paymenttypes || [];
      console.log("Home - paymentTypes :", fetchedPaymentTypes);
      
      if (fetchedPaymentTypes.length > 0) {
        await AsyncStorage.setItem('paymentTypes', JSON.stringify(fetchedPaymentTypes));
        setPaymentTypes(fetchedPaymentTypes);
      } else {
        console.log('No payment types fetched from the API.');
        // Handle this scenario appropriately if needed
      }
    } catch (error) {
      console.error('Error fetching asset types:', error.message);
      throw error;
    }
  };
    
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <GradientBanner text={PROJECT_NAME} />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.topRight}>
            <DraggableRadio />
          </View>

          <View style={styles.section}>
            <Text style={{ ...styles.heading, color: theme.textColor }}>Welcome to ProjectX Real Estate Portal</Text>
            <Text style={{ ...styles.description, color: theme.textColor }}>
              Discover your dream property and experience a seamless customer journey!
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={{ ...styles.subHeading, color: theme.textColor }}>About Us</Text>
            <Text style={{ ...styles.description, color: theme.textColor }}>
              <Text style={{ ...styles.boldText, color: theme.subheading }}>ProjectX</Text> is your gateway to a world of real estate
              possibilities. We provide a range of exceptional properties backed by an unparalleled
              commitment to service.
              {'\n\n'}
              <Text style={{ ...styles.boldText, color: theme.subheading }}>Why Choose Us:</Text>
              {'\n'}
              • Comprehensive property listings
              {'\n'}
              • Dedicated customer support
              {'\n'}
              • Hassle-free property management
              {'\n'}
              • Lushness / Voluptuousness property
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={{ ...styles.subHeading, color: theme.textColor }}>Our Offerings</Text>
            <Text style={{ ...styles.description, color: theme.textColor }}>
              <Text style={{ ...styles.boldText, color: theme.subheading }}>Properties:</Text> Explore our diverse range of properties, from luxurious villas to modern apartments.{'\n'}
              <Text style={{ ...styles.boldText, color: theme.subheading }}>Builders:</Text> Meet the dedicated builders and developers behind our prestigious projects.{'\n'}
              <Text style={{ ...styles.boldText, color: theme.subheading }}>Project Progress:</Text> Track the progress of ongoing projects and witness their transformation.{'\n'}
              <Text style={{ ...styles.boldText, color: theme.subheading }}>Payments:</Text> Manage your payment information and schedules conveniently.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={{ ...styles.subHeading, color: theme.textColor }}>Customer Portal</Text>
            <Text style={{ ...styles.description, color: theme.textColor }}>
              Empowering you with complete control over your real estate journey: {'\n'}

              <Text style={{ ...styles.boldText, color: theme.subheading }}>Register:</Text> Join our community and explore exclusive benefits.{'\n'}
              <Text style={{ ...styles.boldText, color: theme.subheading }}>View Assets: </Text>Access details of your purchased assets, including plot numbers and asset values.{'\n'}
              <Text style={{ ...styles.boldText, color: theme.subheading }}>Payment Information: </Text>Stay updated on payment schedules and transaction histories.{'\n'}
              <Text style={{ ...styles.boldText, color: theme.subheading }}>Project Updates: </Text>Follow the development stages of your chosen projects.{'\n'}
              <Text style={{ ...styles.boldText, color: theme.subheading }}>Builder Profiles: </Text>Learn about the background and expertise of our partnered builders.{'\n'}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={{ ...styles.subHeading, color: theme.textColor }}>Why Choose ProjectX?</Text>
            <Text style={{ ...styles.description, color: theme.textColor }}>
              <Text style={{ ...styles.boldText, color: theme.subheading }}>Transparency: </Text>We offer transparency at every stage, ensuring clarity and confidence.{'\n'}
              <Text style={{ ...styles.boldText, color: theme.subheading }}>Customer Support: </Text>Our dedicated team is here to assist you on your real estate journey.{'\n'}
              <Text style={{ ...styles.boldText, color: theme.subheading }}>Quality Assurance: </Text>Trust in our commitment to delivering high-quality properties.{'\n'}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={{ ...styles.subHeading, color: theme.textColor }}>Get Started</Text>
            <Text style={{ ...styles.description, color: theme.textColor }}>
              Register now to unlock a world of real estate opportunities!
            </Text>
          </View>
        </View>
        {/* Footer Section */}
        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Contact Us</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Scale the image to cover the entire screen
    justifyContent: 'center', // Center vertically
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    textShadowColor: "blue",
    fontWeight: 'bold',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRight: {
    position: 'absolute',
    top: 2,
    right: 0,
    zIndex: 999,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    color: 'black', // Set your desired text color here
  },
  buttonTheme: {
    height: 20,
    backgroundColor: 'gray',
    width: 50,
    borderRadius: 13,
    alignContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'darkgray', // Example text color
    fontSize: 12,
    fontWeight: 'bold',
  },
  section: {
    marginTop: 40,
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: -40
  },
  boldText: {
    fontWeight: '700'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 10
  },
  footerLink: {
    fontSize: 14,
    color: 'blue',
    textDecorationLine: 'underline',
  }
});

export default HomeScreen;
