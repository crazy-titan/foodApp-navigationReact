import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View,Text } from 'react-native'
import HomeScreen from '../../screen/HomeScreen';
import RestaurantScreen from '../../screen/RestaurantScreen';
import CartScreen from '../../screen/CartScreen';

const Tab = createBottomTabNavigator();

function MyTabs(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Restaurant" component={RestaurantScreen}/>
            <Tab.Screen name="Cart" component={CartScreen}/>
        </Tab.Navigator>
    )
}

export default function DynamicStackNavigator(){
    return (
        <NavigationContainer>
            <MyTabs/>
        </NavigationContainer>
    )
}