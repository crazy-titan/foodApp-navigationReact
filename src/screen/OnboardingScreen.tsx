
import { StyleSheet, Text, View, ImageBackground, Pressable } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const FOOD_BG_IMAGE = { uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop' };

const OnboardingScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground source={FOOD_BG_IMAGE} resizeMode="cover" style={styles.image}>
        <View style={styles.overlay}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
              <Text style={styles.brandName}>eat<Text style={styles.accentText}>Nact</Text></Text>
              <Text style={styles.tagline}>Premium Dining & Swift Delivery</Text>
            </View>

            <View style={styles.contentContainer}>
              <Text style={styles.title}>Satisfy Your Cravings</Text>
              <Text style={styles.subtitle}>
                Order from the best local restaurants and get delicious meals delivered hot to your doorstep.
              </Text>

              <Pressable 
                style={({ pressed }) => [
                  styles.button,
                  pressed && styles.buttonPressed
                ]} 
                onPress={() => navigation.navigate("Stack-Tab")}
              >
                <Text style={styles.buttonText}>Get Started</Text>
              </Pressable>
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  image: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)', // Dark premium overlay for readability
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  brandName: {
    fontSize: 38,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 1.5,
  },
  accentText: {
    color: '#FF5E3A', // Vibrant coral orange
  },
  tagline: {
    fontSize: 14,
    color: '#E5E7EB',
    marginTop: 6,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  contentContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#D1D5DB',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    paddingHorizontal: 12,
  },
  button: {
    backgroundColor: '#FF5E3A',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF5E3A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});