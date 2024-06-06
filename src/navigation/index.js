// src/navigation/index.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import AddPlayerScreen from '../screens/AddPlayerScreen';
import RecordScoresScreen from '../screens/RecordScoresScreen';
import DynamicScoresDisplayScreen from '../screens/DynamicScoresDisplayScreen';
import ClearScoresScreen from '../screens/ClearScoresScreen';
import MenuScreen from '../screens/MenuScreen';
import ValidatorScreen from '../screens/ValidatorScreen';
import LogoutScreen from '../screens/LogoutScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditScoresScreen from '../screens/EditScoresScreen';
import ReentryScreen from '../screens/ReentryScreen';
import DeleteDuplicatePlayers from '../screens/DeleteDuplicateScreen';
import GameScreen from '../screens/GameScreen';
import SwaggerScreen from '../screens/SwaggerScreen';
import CustomerScreen from '../screens/CustomerScreen';
import UploadScreen from '../screens/UploadScreen';
import ConstitutionScreen from '../screens/ConstitutionSceen';
import WinnerDisplayScreen from '../screens/WinnerDisplayScreen';
import EditConstitutionScreen from '../screens/EditConstitutionScreen';
import EditDistrictScreen from '../screens/EditDistrictScreen';
import DdraggableButton from '../components/DraggableButton'
import CustomerDisplayScreen from '../screens/CustomerDisplayScreen';
import AssetDisplayScreen from '../screens/AssetDisplayScreen'
import PaymentDisplayScreen from '../screens/PaymentDisplayScreen'
import PaymentReceiptScreen from '../screens/PaymentReceiptScreen'
import PrintPDF from '../components/PrintPDF';
//import StripeProvider from '../components/PaymentGatewayScreen';


const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Logout" component={LogoutScreen}  options={{
            gestureEnabled: false, // Disable back and forward gestures
          }}/>
        <Stack.Screen name="Profile" component={ProfileScreen} /> 
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Customer" component={CustomerScreen} />
        <Stack.Screen name="CustomerDisplay" component={CustomerDisplayScreen} />
        <Stack.Screen name="AssetDisplay" component={AssetDisplayScreen} />
        <Stack.Screen name="PaymentDisplay" component={PaymentDisplayScreen} />
        <Stack.Screen name="PaymentReceipt" component={PaymentReceiptScreen} />
        <Stack.Screen name="PrintPDF" component={PrintPDF} />
        {/* <Stack.Screen name="PaymentGateway" component={StripeProvider} /> */}
        <Stack.Screen name="Upload" component={UploadScreen} />
        <Stack.Screen name="Constitution" component={ConstitutionScreen}/>
        <Stack.Screen name="WinnerDisplay" component={WinnerDisplayScreen} />
        <Stack.Screen name="EditConstitution" component={EditConstitutionScreen} />
        <Stack.Screen name="EditDistrict" component={EditDistrictScreen} />
        <Stack.Screen name="Theme" component={DdraggableButton} />  
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="AddPlayer" component={AddPlayerScreen} />
        <Stack.Screen name="RecordScores" component={RecordScoresScreen} />
        <Stack.Screen name="DynamicDispaly" component={DynamicScoresDisplayScreen} />
        <Stack.Screen name="ClearScores" component={ClearScoresScreen} />
        <Stack.Screen name="Validator" component={ValidatorScreen} /> 
        <Stack.Screen name="EditScores" component={EditScoresScreen} />   
        <Stack.Screen name="Reentry" component={ReentryScreen} /> 
        <Stack.Screen name="DeleteDuplicate" component={DeleteDuplicatePlayers} />  
        <Stack.Screen name="CreateGame" component={GameScreen} />  
        <Stack.Screen name="Swagger" component={SwaggerScreen} />    

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
