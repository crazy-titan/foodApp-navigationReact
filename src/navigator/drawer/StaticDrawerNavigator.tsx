import * as React from 'react';
import { Text, View } from 'react-native';
import {
    createStaticNavigation,
    useNavigation,
} from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../../screen/HomeScreen';
import ProfileScreen from '../../screen/ProfileScreen';



const MyDrawer = createDrawerNavigator({
    screens: {
        Home: HomeScreen,
        Profile: ProfileScreen,
    },
});

const Navigation = createStaticNavigation(MyDrawer);

export default function StaticDrawerNavigation() {
    return <Navigation />;
}