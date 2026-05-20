import * as React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screen/HomeScreen';
import DetailScreen from '../../screen/RestaurantScreen';
import OnboardingScreen from '../../screen/OnboardingScreen';
import RestaurantScreen from '../../screen/RestaurantScreen';
import CartScreen from '../../screen/CartScreen';


const RootStack = createNativeStackNavigator({
    screens: {
        Onboarding: {
            screen: OnboardingScreen,
            options: {title: 'Welcome'},
        },
        Home: {
            screen: HomeScreen,
            options:{title: "Explore Foods"},
        },
        Restaurant:{
            screen: RestaurantScreen,
            options:{title:"Your Search"}
        },
        Cart:{
            screen: CartScreen,
            options:{title:"Total Price"}
        }
}});

const Navigation = createStaticNavigation(RootStack);

export default function StaticStackNavigator(){
    return (
        <Navigation/>
    )
}