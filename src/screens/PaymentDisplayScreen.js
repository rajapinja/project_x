import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Text, FlatList } from 'react-native';
import axios from 'axios';
import { BASE_URL, PROJECT_NAME } from '../app/Config';
import GradientBanner from '../components/Header';
import backgroundImage from '../images/iceland-1979445_1280.jpg';
import Footer from '../components/Footer';
import GradientButton from '../components/GradientButton';
import UseApiHeaders from '../components/UseApiHeaders';
import PaymentPicker from '../components/PaymentPicker';


const PaymentDisplayScreen = ({ navigation }) => {


    const [payments, setPayments] = useState([]);
    const [selectedPaymentType, setSelectedPaymentType] = useState('');
  
    const { jwtToken, headers } = UseApiHeaders();

    // Fetch constitutions when jwtToken or selectedDistrict changes
    useEffect(() => {
        if (jwtToken && selectedPaymentType) {
            fetchPayments();
        }
    }, [jwtToken, selectedPaymentType]);

   
    const fetchPayments = async () => {
        
        await axios.get(`${BASE_URL}/api/payments?selectedPaymentType=${selectedPaymentType}`, { headers: headers })
            .then(response => {
                console.log("payments :", response.data.payments);
                setPayments(response.data.payments);
            })
            .catch(error => {
                if (error.response) {
                    // Handle response-related errors
                    console.error('Response:', error.response);
                } else if (error.request) {
                    // Handle request-related errors
                    console.error('Request:', error.request);
                } else {
                    // Handle other errors
                    console.error('Other Error:', error.message);
                }
            });
    };

    const renderPaymentItem = ({ item }) => ( //asset_location, payment_type, down_payment_amount, phase
        <View style={styles.dataRow}>
            <Text style={styles.dataCellPlayer}>{item.customer_name}</Text>
            <Text style={styles.dataCellName}>{item.project_name}</Text>   
            <Text style={styles.dataCellGame}>{item.asset_location}</Text>
            <Text style={styles.dataCellName}>{item.payment_type}</Text> 
            <Text style={styles.dataCellPlayer}>{item.down_payment_amount}</Text>
            <Text style={styles.dataCellGame}>{item.phase}</Text>
        </View>
    );

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <GradientBanner text={PROJECT_NAME} />
            <View style={styles.container}>
                <View style={styles.pageContent}>
                    <Text style={styles.title}>Payment(s) ~ Info</Text>
                    <View style={styles.InputRow}>
                        <PaymentPicker
                            selectedValue={selectedPaymentType}
                            onValueChange={(itemValue) => {
                                setSelectedPaymentType(itemValue),
                                    fetchPayments()
                            }}
                        />
                    </View>                    
                    <View style={styles.InputRow}>
                        <GradientButton
                            onPress={fetchPayments}
                            title={'DISPLAY~PAYMENTS'}
                            colors={['#0000FF', '#50C878']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0 }}
                            buttonStyle={styles.buttonPayment}
                        />
                    </View>
                    <View style={[styles.rowWrapper, { flex: 1 }]}>
                        <FlatList
                                data={payments}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderPaymentItem}
                                ListHeaderComponent={() => (
                                    <View style={styles.headerRow}>
                                        <Text style={styles.headerCell}>Customer Name</Text>
                                        <Text style={styles.headerCell}>Project Name</Text> 
                                        <Text style={styles.headerCell}>Asset Location</Text>                                                                              
                                        <Text style={styles.headerCell}>Payment Type</Text>                                        
                                        <Text style={styles.headerCell}>Down Pay Amout</Text>
                                        <Text style={styles.headerCell}>Phase</Text>
                                    </View>
                                )}                              
                            />
                    </View>
                </View>
            </View>
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
    pageContent: {
        flex: 1, // Ensure content fills the remaining space
        marginTop: 0, // Set the margin top to 0
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
    },   
    dataRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingBottom: 5,
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    dataCell: {
        flex: 1,
        textAlign: 'center',
    },
    dataCellName: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#0c2f96',
        fontSize: 12,
    },
    dataCellGame: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 12,
    },
    title: {
        fontSize: 20,
        textShadowColor: "blue",
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 2
    },
    InputRow: {
        flexDirection: 'row',
        paddingBottom: 5,
        justifyContent: 'space-between',
    },
    buttonPayment: {
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 13,
        width: '54%',
        marginBottom: 26,
        backgroundColor: '#227fe3',
        marginRight: 10
    },
    partyIcon: {
        width: 30, // Adjust the width as needed
        height: 30, // Adjust the height as needed
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        borderRadius: 15,
    },
    candidateInfo: {
        marginBottom: 1 // Adjust this padding to create space between text and icon
    },
    year: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 16,
        alignContent: 'center',
        color: 'blue'
    },
    yearView: {
        alignItems: 'center',

    },
    rowWrapper: {
        flexDirection: 'row',
        //flexWrap: 'wrap', // Allow content to wrap
        marginBottom:16
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingBottom: 5,
        marginBottom: 10,
        justifyContent: 'space-between',
    }
});

export default PaymentDisplayScreen;