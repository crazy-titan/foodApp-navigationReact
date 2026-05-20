import * as React from 'react';
import { Text, View } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../../screen/HomeScreen';
import ProfileScreen from '../../screen/ProfileScreen';

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        </Drawer.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
        <MyDrawer />
        </NavigationContainer>
    );
}