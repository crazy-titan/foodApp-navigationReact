import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CartProvider } from './src/context/CartContext';
import { AuthProvider } from './src/context/AuthContext';
import DynamicStackNavigator from './src/navigator/stack/DynamicStackNavigator';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthProvider>
        <CartProvider>
          <DynamicStackNavigator />
        </CartProvider>
      </AuthProvider>
    </SafeAreaView>
  );
}