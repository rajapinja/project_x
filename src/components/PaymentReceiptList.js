import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import GradientButton from '../components/GradientButton';
import HTMLReceipt from '../components/HTMLReceipt'; // Import HTMLReceipt component
import { LinearGradient } from 'expo-linear-gradient';


const PaymentReceiptList = ({ paymentReceipts }) => {

     // Generate HTML for each payment receipt
  const receiptComponents = paymentReceipts.map((payment, index) => {
    const receiptHTML = generateReceiptHTML(payment);

    return <HTMLReceipt key={index} receiptHTML={receiptHTML} />;
  });

    const renderReceipts = () => {
        if (!paymentReceipts || paymentReceipts.length === 0) {
            return <Text>No payment receipts available.</Text>;
        }

        // ... your HTML receipt rendering logic
        // Please use the generateReceiptHTML function here with the payment prop
        const handlePrintReceipt = async (payment) => {
            const receiptHTML = generateReceiptHTML(payment);

            try {
                const { uri } = await Print.printToFileAsync({ html: receiptHTML });

                if (uri) {
                    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
                }
            } catch (error) {
                console.error('Error generating or sharing receipt:', error);
            }
        };

        return paymentReceipts.map((payment, index) => (
            <View key={index}>
                <HTMLReceipt payment={payment} />
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
                </LinearGradient>
            </View>
        ));
    };

    return (
        <ScrollView style={styles.scrollView}>
            {renderReceipts()}
            {/* Other components or elements */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
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
    scrollView: {
        // Add your scrollView styles here
        flex: 1,
        // Add other desired styles
    },
});

export default PaymentReceiptList;
