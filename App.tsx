import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DynamicStackNavigator from './src/navigator/stack/DynamicStackNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <DynamicStackNavigator />
    </SafeAreaProvider>
  );
}