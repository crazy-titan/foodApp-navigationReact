import * as React from 'react'
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import OnboardingScreen from '../../screen/OnboardingScreen';
import HomeScreen from '../../screen/HomeScreen';
import RestaurantScreen from '../../screen/RestaurantScreen';
import CartScreen from '../../screen/CartScreen';
import SearchScreen from '../../screen/SearchScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProfileScreen from '../../screen/ProfileScreen';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import SettingScreen from '../../screen/SettingScreen';
import HelpScreen from '../../screen/HelpScreen'
import LogOutScreen from '../../screen/LogOutScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import LoginScreen from '../../screen/LoginScreen';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator<any>();

function CustomDrawerContent(props: any) {
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
            <View style={drawerStyles.headerContainer}>
                <View style={drawerStyles.avatar}>
                    <Text style={drawerStyles.avatarText}>AA</Text>
                </View>
                <Text style={drawerStyles.userName}>Abhinav Anand</Text>
                <Text style={drawerStyles.userEmail}>contact@meetabhinav.com</Text>
            </View>
            <View style={drawerStyles.divider} />
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

function MyDrawer(){
    return (
        <Drawer.Navigator 
            drawerContent={props => <CustomDrawerContent {...props} />}
            screenOptions={{
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
            }}
        >
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
                headerBackTitle: '',
            })}/>
            <StackRestaurant.Screen component={CartScreen} name="Cart" options={{
                title: 'Cart Summary',
                headerBackTitle: '',
            }}/>
        </StackRestaurant.Navigator>
    )
}

const Tab = createBottomTabNavigator();
function MyTabs(){
    const insets = useSafeAreaInsets();
    const { cartCount } = useCart();

    const defaultTabBarStyle = {
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        height: 54 + Math.max(insets.bottom, 12),
        paddingBottom: Math.max(insets.bottom, 12),
        paddingTop: 8,
    };
    
    return(
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: '#FF5E3A',
            tabBarInactiveTintColor: '#9CA3AF',
            tabBarStyle: defaultTabBarStyle,
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
            <Tab.Screen 
                name="Explore Foods" 
                component={MyStackRestaurant} 
                options={({ route }) => {
                    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Explore';
                    const shouldHide = routeName === 'Restaurant' || routeName === 'Cart';
                    return {
                        headerShown: false,
                        tabBarLabel: "Home",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="home" size={size} color={color} />
                        ),
                        tabBarStyle: shouldHide ? { display: 'none' } : defaultTabBarStyle,
                    };
                }} 
            />
            <Tab.Screen 
                name="Search" 
                component={SearchScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search" size={size} color={color} />
                    ),
                    tabBarStyle: defaultTabBarStyle,
                }} 
            />
            <Tab.Screen 
                name="Orders" 
                component={CartScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cart" size={size} color={color} />
                    ),
                    tabBarBadge: cartCount > 0 ? cartCount : undefined,
                    tabBarStyle: { display: 'none' }, // Hides bottom bar on checkout/orders tab
                }} 
            />
            <Tab.Screen 
                name="Profile" 
                component={MyDrawer} 
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                    tabBarStyle: defaultTabBarStyle,
                }} 
            />
        </Tab.Navigator>
    )
}

const Stack = createNativeStackNavigator();

function MyStack(){
    const { isLoading, userToken } = useAuth();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
                <ActivityIndicator size="large" color="#FF5E3A" />
            </View>
        );
    }

    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: "#000000",
            },
            headerTintColor: "#ffffff",
            headerTitleAlign: "center",
            animation: "fade_from_bottom",
            gestureEnabled: true,
            animationDuration: 250,
        }}>
            {userToken === null ? (
                <>
                    <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                </>
            ) : (
                <Stack.Screen name="Stack-Tab" component={MyTabs} options={{ headerShown: false }} />
            )}
        </Stack.Navigator>
    )
}
const linking: any = {
    prefixes: ['foodapp://', 'https://foodapp.com'],
    config: {
        screens: {
            'Stack-Tab': {
                screens: {
                    'Explore Foods': {
                        screens: {
                            Restaurant: 'restaurant/:restaurant',
                        },
                    },
                },
            },
        },
    },
};

export default function DynamicStackNavigator(){
    return (
        <NavigationContainer linking={linking}>
        <MyStack/>
        </NavigationContainer>
    )
}

const drawerStyles = StyleSheet.create({
    headerContainer: {
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#FF5E3A',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#FF5E3A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 5,
        marginBottom: 12,
    },
    avatarText: {
        fontSize: 24,
        fontWeight: '800',
        color: '#FFFFFF',
    },
    userName: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1F2937',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 12,
        fontWeight: '500',
        color: '#6B7280',
    },
    divider: {
        height: 1,
        backgroundColor: '#F3F4F6',
        marginHorizontal: 16,
        marginVertical: 10,
    },
});