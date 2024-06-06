import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { BASE_URL, PROJECT_NAME } from '../app/Config';
import GradientBanner from '../components/Header';
import backgroundImage from '../images/iceland-1979445_1280.jpg';
import Footer from '../components/Footer';
import GradientButton from '../components/GradientButton';
import UseApiHeaders from '../components/UseApiHeaders';
import { LinearGradient } from 'expo-linear-gradient';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';


const PaymentReceiptScreen = ({ navigation }) => {

    const [projectName, setProjectName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [paymentReceipts, setPaymentReceipts] = useState([]);

    const { jwtToken, headers } = UseApiHeaders();

    // Fetch constitutions when jwtToken or selectedDistrict changes
    useEffect(() => {
        if (jwtToken) {
            fetchPaymentReceipts();
        }
    }, [jwtToken]);

    const fetchPaymentReceipts = async () => {
        try {
            if (jwtToken) {
                const response = await axios.get(`${BASE_URL}/api/paymentreceipts`, {
                    params: {
                        projectName: projectName,
                        firstName: firstName,
                        lastName: lastName
                    },
                    headers: headers
                });
                console.log("payments :", response.data.paymentreceipts);
                setPaymentReceipts(response.data.paymentreceipts);
            }
        } catch (error) {
            if (error.response) {
                console.error('Response:', error.response);
            } else if (error.request) {
                console.error('Request:', error.request);
            } else {
                console.error('Other Error:', error.message);
            }
        }
    };

    const handlePrintReceipt = async (payment) => {
        const receiptContent = `
            <html><head>
            <h1>Payment Receipt</h1></head>
                <body>
                    <p><strong>Customer Name:</strong> ${payment.customer_name}</p>
                    <p><strong>Project Name:</strong> ${payment.project_name}</p>
                    <p><strong>Asset Location:</strong> ${payment.asset_location}</p>
                    <p><strong>Payment Type:</strong> ${payment.payment_type}</p>
                    <p><strong>Down Payment Amount:</strong> ${payment.down_payment_amount}</p>
                    <p><strong>Phase:</strong> ${payment.phase}</p>
                </body>
            </html> `;

        try {
            const options = {
                html: receiptContent,
            };

            const { uri } = await Print.printToFileAsync(options);

            if (uri) {
                //await Share.shareAsync(pdf.uri);
                await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
            }
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    const renderReceipts = () => {
        if (!paymentReceipts || paymentReceipts.length === 0) {
            return <Text>No payment receipts available.</Text>;
        }

        return paymentReceipts.map((payment, index) => (
            <View key={index}>
                <LinearGradient
                    style={styles.receiptContainer}
                    colors={['teal', 'white']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Text style={styles.receiptTextHeader}>Payment Receipt - [{index + 1}] </Text>
                    <Text style={styles.receiptText}>
                        Customer Name: <Text style={{ color: 'blue' }}>{payment.customer_name}</Text>
                    </Text>
                    <Text style={styles.receiptText}>
                        Project Name: <Text style={{ color: 'brown' }}>{payment.project_name}</Text>
                        Asset Location: <Text style={{ color: 'brown' }}>{payment.asset_location}</Text>
                    </Text>
                    <Text style={styles.receiptText}>
                        Payment Type: <Text style={{ color: 'gold' }}>{payment.payment_type}</Text>
                    </Text>
                    <Text style={styles.receiptText}>
                        Paid Amount: <Text style={{ color: 'purple' }}>{payment.down_payment_amount}</Text>
                        Phase: <Text style={{ color: 'blue' }}>{payment.phase}</Text>
                    </Text>
                    <GradientButton
                        onPress={() => handlePrintReceipt(payment)}
                        title={'PRINT~RECEIPT'}
                        colors={['#11998e', '#38ef7d']}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 0 }}
                        buttonStyle={styles.buttonPrint}
                    />
                    {/* <TouchableOpacity onPress={() => handlePrintReceipt(payment)} style={styles.printButton}>
                        <Text style={styles.printButtonText}>Print Receipt</Text>
                    </TouchableOpacity> */}
                </LinearGradient>
            </View>
        ));
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <GradientBanner text={PROJECT_NAME} />
            <View style={styles.container}>
                <View style={styles.pageContent}>
                    <Text style={styles.title}>Payment(s) ~ Receipt</Text>
                    <View style={styles.InputRow}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Project Name"
                            value={projectName}
                            onChangeText={(text) => setProjectName(text.toUpperCase())}
                        />
                    </View>
                    <View style={styles.InputRow}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter First Name"
                            value={firstName}
                            onChangeText={(text) => setFirstName(text.toUpperCase())}
                        />
                    </View>
                    <View style={styles.InputRow}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Last Name"
                            value={lastName}
                            onChangeText={(text) => setLastName(text.toUpperCase())}
                        />
                    </View>
                    <View style={styles.InputRow}>
                        <GradientButton
                            onPress={fetchPaymentReceipts}
                            title={'PAYMENT~RECEIPT'}
                            colors={['#0000FF', '#50C878']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0 }}
                            buttonStyle={styles.buttonPayment}
                        />
                    </View>
                    <ScrollView style={styles.scrollView}>
                        {renderReceipts()}
                    </ScrollView>
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
        marginTop: -10
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
        width: '60%',
        marginBottom: 16,
        backgroundColor: '#227fe3',
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
    },
    receiptText: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    receiptTextHeader: {
        fontSize: 13,
        //fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    input: {
        width: '60%',
        padding: 10,
        borderWidth: 1, // Apply border
        borderColor: 'gray', // Border color
        borderRadius: 5, // Border radius
        textAlign: 'center',
        marginBottom: 6,
        // marginTop: 140,
        fontSize: 12,
        height: 36
    },
    receiptContainer: {
        backgroundColor: '#DFFF00',
        padding: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        width: '100%', // Adjust the width as needed
        alignSelf: 'center', // Center the receipt horizontally
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 10,
        //width: '30%', // Adjust the label width
    },
    value: {
        flex: 1,
        //width: '70%', // Adjust the value width
    },
    printButton_1: {
        //width: '60%',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,

    },
    printButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    printButton: {
        backgroundColor: 'green', // Customize this color as needed
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
});

export default PaymentReceiptScreen;