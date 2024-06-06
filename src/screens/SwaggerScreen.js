import React, { useEffect, useState } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'; // Added Button for pagination
import { WebView } from 'react-native-webview';
import axios from 'axios';
import BASE_URL from '../app/Config';
import GradientButton from '../components/GradientButton';
import GradientBanner from '../components/Header';
import backgroundImage from '../images/clouds-1282314_1280.jpg';
import Footer from '../components/Footer';

const ITEMS_PER_PAGE = 10;

const SwaggerScreen = () => {
    const [swaggerData, setSwaggerData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchSwaggerData();
    }, [currentPage]);

    const fetchSwaggerData = () => {
        axios.get(`${BASE_URL}/api/swagger`)
            .then(response => {
                const paginatedSwaggerData = paginateSwagger(response.data, currentPage);
                setSwaggerData(paginatedSwaggerData);
            })
            .catch(error => {
                console.error('Error fetching Swagger:', error);
            });
    };

    const paginateSwagger = (data, page) => {
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;

        if (data && data.paths) {
            const paths = Object.keys(data.paths).slice(startIndex, endIndex).reduce((acc, key) => {
                acc[key] = data.paths[key];
                return acc;
            }, {});

            return { ...data, paths };
        }

        return data;
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
        
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
      <ImageBackground source={backgroundImage} style={styles.background}>
       <GradientBanner text='Score Recorder' />
        <View style={{ flex: 1 }}>
            {swaggerData ? (
                <>
                    <WebView
                        originWhitelist={['*']}
                        source={{ html: renderSwaggerUI(swaggerData) }}
                        style={{ flex: 1 }}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                      <GradientButton
                        onPress={handlePrevPage}
                        title={'PREVIOUS'}
                        disabled={currentPage === 1}                       
                        colors={['#FF6E7F', '#B47AEA']} // Your custom color combination
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 0 }}
                        buttonStyle = {styles.button}
                      />        
                        {/* <Button title="Previous" onPress={handlePrevPage} disabled={currentPage === 1} /> */}
                        {/* <Button title="Next" onPress={handleNextPage} /> */}
                        <GradientButton
                          onPress={handleNextPage}
                          title={'NEXT'}                          
                          colors={['#FF6E7F', '#B47AEA']} // Your custom color combination
                          start={{ x: 1, y: 0 }}
                          end={{ x: 0, y: 1 }}
                          buttonStyle = {styles.button}
                        /> 
                    </View>
                </>
            ) : (
                <Text>Loading Swagger documentation...</Text>
            )}
        </View>
        <Footer/>
      </ImageBackground>
    );
};

const renderSwaggerUI = swaggerData => {
    const swaggerJsonString = JSON.stringify(swaggerData);
    return `
      <html>
        <head>
          <title>Swagger UI</title>
          <!-- Include Swagger UI library -->
          <script src="https://unpkg.com/swagger-ui-dist@3.51.0/swagger-ui-bundle.js"></script>
          <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@3.51.0/swagger-ui.css" />
        </head>
        <body>
          <div id="swagger-ui"></div>
          <script>
            const spec = ${swaggerJsonString};
            const ui = SwaggerUIBundle({
              spec: spec,
              dom_id: '#swagger-ui',
              presets: [SwaggerUIBundle.presets.apis],
              layout: 'BaseLayout',
            });
          </script>
        </body>
      </html>
    `;
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Scale the image to cover the entire screen
    justifyContent: 'center', // Center vertically
  },
  container: {
    flex: 1,
    padding: 16,
  },
  pageContent: {
    flex: 1, // Ensure content fills the remaining space
    marginTop: 0, 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:60
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 0,
    color: 'blue'
  },
 
  buttonContainer: {
    borderRadius: 20, // Border radius 
    justifyContent: 'center', // Center vertically
    width: '50%',
    padding: 10,
    fontSize: 50,
  },
  buttonRow: {
    flexDirection: 'row',
    paddingBottom: 5,
    justifyContent: 'space-between',
    marginTop: 16,
  },

  button: {    
    height: 36, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    width: '37%',
    marginBottom: 10,
    backgroundColor: '#227fe3',
    marginRight:0,
  },
  buttonText: {
    color: '#E0E0E0', // Example text color
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonLogout: {
    height: 36, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    width: '47%',
    marginBottom: 66,
    backgroundColor: '#9e3b34',
    fontSize: 16,

  },
  buttonProfile: {
    height: 36, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: '47%',
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#3949e3',
  },
  
});

export default SwaggerScreen;
