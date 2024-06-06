import React from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';
import PaymentGatewayScreen from './PaymentGatewayScreen'; // Replace with your actual PaymentGatewayScreen component

function StripeProvider() {
  const publishableKey = 'your_publishable_key'; // Replace with your Stripe publishable key
  const merchantIdentifier = 'merchant.identifier'; // Replace with your Apple merchant identifier
  const urlScheme = 'your-url-scheme'; // Replace with your URL scheme

  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier={merchantIdentifier} // Required for Apple Pay
      urlScheme={urlScheme} // Required for 3D Secure and bank redirects
    >
      <PaymentGatewayScreen />
    </StripeProvider>
  );
}

export default StripeProvider;
