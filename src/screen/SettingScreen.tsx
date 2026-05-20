import { StyleSheet, Text, View, Switch, Pressable, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';

const SettingScreen = () => {
  const [pushNotif, setPushNotif] = useState(true);
  const [promoNotif, setPromoNotif] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [bioLogin, setBioLogin] = useState(true);
  const [shareData, setShareData] = useState(true);

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Section: Notifications */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Notifications</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconBox, { backgroundColor: '#E8F8F5' }]}>
                <Ionicons name="notifications-outline" size={20} color="#10B981" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.rowTitle}>Push Notifications</Text>
                <Text style={styles.rowSub}>Receive real-time order tracking alerts</Text>
              </View>
            </View>
            <Switch
              value={pushNotif}
              onValueChange={setPushNotif}
              trackColor={{ false: '#D1D5DB', true: '#FFF0ED' }}
              thumbColor={pushNotif ? '#FF5E3A' : '#F4F3F4'}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconBox, { backgroundColor: '#EBF5FB' }]}>
                <Ionicons name="pricetag-outline" size={20} color="#2980B9" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.rowTitle}>Promos & Offers</Text>
                <Text style={styles.rowSub}>Get alerted on discount and cashbacks</Text>
              </View>
            </View>
            <Switch
              value={promoNotif}
              onValueChange={setPromoNotif}
              trackColor={{ false: '#D1D5DB', true: '#FFF0ED' }}
              thumbColor={promoNotif ? '#FF5E3A' : '#F4F3F4'}
            />
          </View>
        </View>

        {/* Section: Device & Theme */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Device & Theme</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconBox, { backgroundColor: '#F5EEF8' }]}>
                <Ionicons name="moon-outline" size={20} color="#8E44AD" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.rowTitle}>Dark Mode</Text>
                <Text style={styles.rowSub}>Switch between light and dark themes</Text>
              </View>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#D1D5DB', true: '#FFF0ED' }}
              thumbColor={darkMode ? '#FF5E3A' : '#F4F3F4'}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconBox, { backgroundColor: '#FEF9E7' }]}>
                <Ionicons name="finger-print-outline" size={20} color="#F39C12" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.rowTitle}>Biometric Authentication</Text>
                <Text style={styles.rowSub}>Log in quickly using FaceID or TouchID</Text>
              </View>
            </View>
            <Switch
              value={bioLogin}
              onValueChange={setBioLogin}
              trackColor={{ false: '#D1D5DB', true: '#FFF0ED' }}
              thumbColor={bioLogin ? '#FF5E3A' : '#F4F3F4'}
            />
          </View>
        </View>

        {/* Section: Privacy & Cache */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Privacy & Cache</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconBox, { backgroundColor: '#FDEDEC' }]}>
                <Ionicons name="shield-checkmark-outline" size={20} color="#E74C3C" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.rowTitle}>Share Usage Analytics</Text>
                <Text style={styles.rowSub}>Help us improve eatNact services</Text>
              </View>
            </View>
            <Switch
              value={shareData}
              onValueChange={setShareData}
              trackColor={{ false: '#D1D5DB', true: '#FFF0ED' }}
              thumbColor={shareData ? '#FF5E3A' : '#F4F3F4'}
            />
          </View>
          <View style={styles.divider} />
          <Pressable style={({ pressed }) => [
            styles.rowPressedContainer,
            pressed && styles.rowPressed
          ]}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconBox, { backgroundColor: '#F2F4F4' }]}>
                <Ionicons name="trash-outline" size={20} color="#7F8C8D" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.rowTitle}>Clear Application Cache</Text>
                <Text style={styles.rowSub}>Free up 24.3 MB space on device</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </Pressable>
        </View>

        {/* Legal Text */}
        <Text style={styles.versionText}>eatNact v1.0.0 (Production) • Terms & Conditions</Text>

      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#6B7280',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  rowPressedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  rowPressed: {
    backgroundColor: '#F9FAFB',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  iconBox: {
    padding: 8,
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 14,
    flex: 1,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  rowSub: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 16,
  },
  versionText: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 32,
    fontWeight: '600',
  },
});