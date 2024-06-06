// App.js
import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { ThemeProvider } from './src/app/LightDarkContext';
import AppNavigator from './src/navigation/index';
import { UserProvider } from './src/app/UserContext';


export default function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <SafeAreaView style={styles.container}>         
          <AppNavigator />        
        </SafeAreaView>
      </ThemeProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
