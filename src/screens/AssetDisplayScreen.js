import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Text, FlatList } from 'react-native';
import axios from 'axios';
import { BASE_URL, PROJECT_NAME } from '../app/Config';
import GradientBanner from '../components/Header';
import backgroundImage from '../images/iceland-1979445_1280.jpg';
import Footer from '../components/Footer';
import GradientButton from '../components/GradientButton';
import UseApiHeaders from '../components/UseApiHeaders';
import AssetPicker from '../components/AssetPicker';


const AssetDisplayScreen = ({ navigation }) => {


    const [assets, setAssets] = useState([]);
    const [selectedAssetType, setSelectedAssetType] = useState('');
  
    const { jwtToken, headers } = UseApiHeaders();

    // Fetch constitutions when jwtToken or selectedDistrict changes
    useEffect(() => {
        if (jwtToken && selectedAssetType) {
            fetchAssets();
        }
    }, [jwtToken, selectedAssetType]);

   
    const fetchAssets = async () => {
        
        await axios.get(`${BASE_URL}/api/assets?selectedAssetType=${selectedAssetType}`, { headers: headers })
            .then(response => {
                console.log("assets :", response.data.assets);
                setAssets(response.data.assets);
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

    const renderAssetItem = ({ item }) => (
        <View style={styles.dataRow}>
            <Text style={styles.dataCellPlayer}>{item.customer_name}</Text>
            <Text style={styles.dataCellGame}>{item.asset_location}</Text>
            <Text style={styles.dataCellName}>{item.asset_value}</Text>            
            <Text style={styles.dataCellName}>{item.project_name}</Text>           
            {/* <Text style={styles.dataCellPlayer}>{item.asset_type}</Text> */}
            <Text style={styles.dataCellGame}>{item.booking_date}</Text>
        </View>
    );

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <GradientBanner text={PROJECT_NAME} />
            <View style={styles.container}>
                <View style={styles.pageContent}>
                    <Text style={styles.title}>Asset(s) ~ Info</Text>
                    <View style={styles.InputRow}>
                        <AssetPicker
                            selectedValue={selectedAssetType}
                            onValueChange={(itemValue) => {
                                setSelectedAssetType(itemValue),
                                    fetchAssets()
                            }}
                        />
                    </View>                    
                    <View style={styles.InputRow}>
                        <GradientButton
                            onPress={fetchAssets}
                            title={'DISPLAY~ASSETS'}
                            colors={['#0000FF', '#50C878']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0 }}
                            buttonStyle={styles.buttonAsset}
                        />
                    </View>
                    <View style={[styles.rowWrapper, { flex: 1 }]}>
                        <FlatList
                                data={assets}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderAssetItem}
                                ListHeaderComponent={() => (
                                    <View style={styles.headerRow}>
                                        <Text style={styles.headerCell}>Customer Name</Text>
                                        <Text style={styles.headerCell}>Asset Location</Text>                                                                              
                                        <Text style={styles.headerCell}>Asset Value</Text>
                                        <Text style={styles.headerCell}>Project Name</Text> 
                                        <Text style={styles.headerCell}>Booking Date</Text>
                                        {/* <Text style={styles.headerCell}>Asset Type</Text> */}
                                    </View>
                                )}
                                //horizontal
                                //showsHorizontalScrollIndicator={false}
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
    candidateCardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    candidateCard: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 5,
        width: '32%', // Adjust the width as needed
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent white background
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // Android shadow
        marginRight: 10,
        marginBottom: 20,
        position: 'relative'
    },
    candidateText: {
        fontSize: 12,
        marginBottom: 5,
        color: 'blue',
        fontWeight: '600'
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
    buttonAsset: {
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

export default AssetDisplayScreen;