// import React, { useState } from 'react';
// import { View, Text, ImageBackground } from 'react-native';
// import { BASE_URL, PROJECT_NAME } from '../app/Config';
// import UseApiHeaders from '../components/UseApiHeaders';
// import GradientBanner from '../components/Header';
// import backgroundImage from '../images/iceland-1979445_1280.jpg';
// import Footer from '../components/Footer';
// import GradientButton from '../components/GradientButton';
// import { LinearGradient } from 'expo-linear-gradient';
// // import { CardField, PaymentSheet } from '@stripe/stripe-react-native';
// import axios from 'axios';

// const PaymentGatewayScreen = () => {

//   const [paymentComplete, setPaymentComplete] = useState(false);
//   const [clientSecret, setClientSecret] = useState(null);
//   const [cardDetails, setCardDetails] = useState(null);


//   const { jwtToken, headers } = UseApiHeaders();

//   // Function to fetch client secret from Flask server
//   const fetchClientSecret = async () => {
//     try {
//       // Replace 'YOUR_FLASK_SERVER_URL' with your actual Flask server URL
//       await axios.post(`${BASE_URL}/api/create-payment-intent?`, JSON.stringify({ amount: 1000, currency: 'usd' }), { headers: headers })
//         .then(response => {
//           const data = response.json();
//           setClientSecret(data.clientSecret);
//         }).catch(error => {
//           if (error.response) {
//             // Handle response-related errors
//             console.error('Response:', error.response);
//           } else if (error.request) {
//             // Handle request-related errors
//             console.error('Request:', error.request);
//           } else {
//             // Handle other errors
//             console.error('Error fetching client secret:', error);
//           }
//         });
//     } catch (error) {
//       console.error('Error retrieving values:', error);
//     }
//   };

//   useEffect(() => {
//     // Fetch the client secret when the component mounts
//     fetchClientSecret();
//   }, []);

//   // Payment Initialize
//   const initializePaymentSheet = async () => {
//     if (!clientSecret) {
//       console.error('Client secret not available');
//       return;
//     }

//     const { error } = await PaymentSheet.initialize({
//       paymentIntentClientSecret: clientSecret,
//     });

//     if (error) {
//       console.error('Payment sheet initialization error:', error.message);
//       // Handle error, show error message to the user
//     }
//   };

//   const handleCardChange = (cardDetails) => {
//     // Update UI or perform validation based on card details
//     setCardDetails(cardDetails);
//     console.log('Card details:', cardDetails);

//     // Example: Validate card details
//     if (cardDetails && cardDetails.complete) {
//       // Card is complete, enable the "Pay Now" button
//       // You might want to perform additional validation based on your requirements
//     } else {
//       // Card is incomplete, disable the "Pay Now" button or show a warning
//     }
//   };

//   // Payment Present
//   const handlePayment = async () => {
//     try {
//       const { error } = await PaymentSheet.presentPaymentSheet();

//       if (error) {
//         console.error('Payment error:', error.message);
//         // Handle error, show error message to the user
//       } else {
//         console.log('Payment successful');
//         // Payment succeeded, update UI accordingly
//         setPaymentComplete(true);
//       }
//     } catch (e) {
//       console.error('Payment error:', e);
//       // Handle other errors
//     }
//   };

//   return (
//     <ImageBackground source={backgroundImage} style={styles.background}>
//       <GradientBanner text={PROJECT_NAME} />
//       <View style={styles.container}>
//         <View style={styles.pageContent}>
//           <Text style={styles.title}>Payment ~ Gateway</Text>
//           {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> */}
//           {!paymentComplete ? (
//             <View style={styles.InputRow}>
//               <CardField
//                 postalCodeEnabled={true}
//                 onCardChange={(cardDetails) => {handleCardChange(cardDetails)}}
//               />
//             </View>
//           ) : (
//             <Text>Payment Successful!</Text>
//           )}
//           <View style={styles.InputRow}>
//             <GradientButton
//               onPress={initializePaymentSheet}
//               title={'INITIALIZE~PAYMENT'}
//               colors={['#0000FF', '#50C878']}
//               start={{ x: 0, y: 1 }}
//               end={{ x: 1, y: 0 }}
//               buttonStyle={styles.buttonStripe}
//             />
//             <LinearGradient
//               colors={colors || ['#FF5F6D', '#FFC371']} // Default colors if none provided
//               start={start || { x: 0, y: 1 }} // Default start position if none provided
//               end={end || { x: 1, y: 0 }} // Default end position if none provided
//               buttonStyle={styles.buttonStripe}
//               disabled={!cardDetails || !cardDetails.complete}
//               activeOpacity={0.7}
//               underlayColor="#EFEFEF"
             
//             >
//               <Text style={styles.buttonText}>{title}</Text>
//             </LinearGradient>           
//           </View>        
//         </View>
//       </View>
//       <Footer />
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     resizeMode: 'cover', // Scale the image to cover the entire screen
//     justifyContent: 'center', // Center vertically
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   pageContent: {
//     flex: 1, // Ensure content fills the remaining space
//     marginTop: 0, // Set the margin top to 0
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 60,
//   },
//   title: {
//     fontSize: 20,
//     textShadowColor: "blue",
//     fontWeight: 'bold',
//     marginBottom: 16,
//     marginTop: 10
//   },
//   InputRow: {
//     flexDirection: 'row',
//     paddingBottom: 5,
//     justifyContent: 'space-between',
//   },
//   buttonStripe: {
//     height: 36,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 13,
//     width: '54%',
//     marginBottom: 25,
//     backgroundColor: '#227fe3',
//     marginRight: 10
//   }

// });
// export default PaymentGatewayScreen;
