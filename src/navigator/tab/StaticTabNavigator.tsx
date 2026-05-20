import * as React from 'react';
import { Text, View } from 'react-native';
import {
    createStaticNavigation,
} from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screen/HomeScreen';
import OnboardingScreen from '../../screen/OnboardingScreen';
import RestaurantScreen from '../../screen/RestaurantScreen';
import CartScreen from '../../screen/CartScreen';

const MyTabs = createBottomTabNavigator({
    screens: {
        Onboard: OnboardingScreen,
        Home: HomeScreen,
        Restaurant: RestaurantScreen,
        Cart: CartScreen
    },
});

const Navigation = createStaticNavigation(MyTabs);

export default function StaticTabNavigator() {
    return <Navigation />;
}