import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View,Text } from 'react-native'
import OnboardingScreen from '../../screen/OnboardingScreen';
import HomeScreen from '../../screen/HomeScreen';
import RestaurantScreen from '../../screen/RestaurantScreen';
import CartScreen from '../../screen/CartScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProfileScreen from '../../screen/ProfileScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingScreen from '../../screen/SettingScreen';
import HelpScreen from '../../screen/HelpScreen'
import LogOutScreen from '../../screen/LogOutScreen';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator<any>();

function MyDrawer(){
    return (
        <Drawer.Navigator screenOptions={{
            drawerPosition: "right",
            drawerActiveTintColor: '#FF5E3A',
            drawerInactiveTintColor: '#4B5563',
            drawerLabelStyle: {
                fontWeight: '600',
                fontSize: 14,
            },
            headerStyle: {
                backgroundColor: '#ffffff',
            },
            headerTintColor: '#1F2937',
            headerTitleStyle: {
                fontWeight: '800',
            },
            headerShadowVisible: false,
        }}>
            <Drawer.Screen name="Your Profile" component={ProfileScreen} options={{
                drawerIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />
            }} />
            <Drawer.Screen name="MyOrders" component={CartScreen} options={{
                title: 'My Orders',
                drawerIcon: ({ color, size }) => <Ionicons name="receipt-outline" size={size} color={color} />
            }} />
            <Drawer.Screen name="Settings" component={SettingScreen} options={{
                drawerIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />
            }} />
            <Drawer.Screen name="Help" component={HelpScreen} options={{
                drawerIcon: ({ color, size }) => <Ionicons name="help-circle-outline" size={size} color={color} />
            }} />
            <Drawer.Screen name="LogOut" component={LogOutScreen} options={{
                title: 'Log Out',
                drawerIcon: ({ color, size }) => <Ionicons name="log-out-outline" size={size} color={color} />
            }} />
        </Drawer.Navigator>
    )
}

const StackRestaurant = createNativeStackNavigator();
function MyStackRestaurant(){
    return (
        <StackRestaurant.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#ffffff',
            },
            headerTintColor: '#1F2937',
            headerTitleStyle: {
                fontWeight: '800',
            },
            headerShadowVisible: false,
        }}>
            <StackRestaurant.Screen component={HomeScreen} name="Explore" options={{ headerShown: false }}/>
            <StackRestaurant.Screen component={RestaurantScreen} name="Restaurant" options={({ route }: any) => ({
                title: route.params?.restaurant || 'Restaurant',
                headerBackTitleVisible: false,
            })}/>
        </StackRestaurant.Navigator>
    )
}

const Tab = createBottomTabNavigator();
function MyTabs(){
    const insets = useSafeAreaInsets();
    
    return(
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: '#FF5E3A',
            tabBarInactiveTintColor: '#9CA3AF',
            tabBarStyle: {
                backgroundColor: '#ffffff',
                borderTopWidth: 1,
                borderTopColor: '#F3F4F6',
                height: 54 + Math.max(insets.bottom, 12),
                paddingBottom: Math.max(insets.bottom, 12),
                paddingTop: 8,
            },
            tabBarLabelStyle: {
                fontSize: 11,
                fontWeight: '700',
            },
            headerStyle: {
                backgroundColor: '#ffffff',
            },
            headerTintColor: '#1F2937',
            headerTitleStyle: {
                fontWeight: '800',
            },
            headerShadowVisible: false,
        }}>
            <Tab.Screen name="Explore Foods" component={MyStackRestaurant} options={{
                headerShown: false,
                tabBarLabel: "Home",
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home" size={size} color={color} />
                ),
            }} />
            <Tab.Screen name="Restaurant" component={RestaurantScreen} options={{
                title: 'Default Restaurant',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="restaurant" size={size} color={color} />
                ),
            }} />
            <Tab.Screen name="Cart" component={CartScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="cart" size={size} color={color} />
                ),
            }} />
            <Tab.Screen name="Profile" component={MyDrawer} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person" size={size} color={color} />
                ),
            }} />
        </Tab.Navigator>
    )
}

const Stack = createNativeStackNavigator();

function MyStack(){
    return (
        <Stack.Navigator  screenOptions={{
            headerStyle: {
            backgroundColor: "#000000",
            },
            headerTintColor: "#ffffff",
            headerTitleAlign: "center",
            animation: "fade_from_bottom",
            gestureEnabled: true,
            animationDuration: 250,
            }}>

            <Stack.Screen name= "Onboarding" component={OnboardingScreen} options={{
                headerShown: false,   
            }}/>
            
            <Stack.Screen name = "Stack-Tab" component={MyTabs} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}
export default function DynamicStackNavigator(){
    return (
        <NavigationContainer>
        <MyStack/>
        </NavigationContainer>
    )
}