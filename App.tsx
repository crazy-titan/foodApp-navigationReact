import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider } from './src/context/CartContext';
import { AuthProvider } from './src/context/AuthContext';
import DynamicStackNavigator from './src/navigator/stack/DynamicStackNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CartProvider>
          <DynamicStackNavigator />
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}