import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation<any>();

  
  const userName = "Abhinav Anand";
  const userEmail = "contact@meetabhinav.com";
  const userPhone = "+91 XXXXXXXXXX";
  
  // Set to a custom image URL (e.g. Unsplash, hosting link, or local require statement)
  // Set to null or "" (empty string) to automatically fallback to name initials (e.g., "AA")
  const profilePic = null;


  const getUserInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };
  
  const menuItems = [
    { icon: 'receipt-outline', title: 'My Orders', sub: 'Manage your active and past orders', action: () => navigation.navigate("MyOrders") },
    { icon: 'location-outline', title: 'Delivery Addresses', sub: 'Home, Work and other locations', action: () => {} },
    { icon: 'card-outline', title: 'Payment Methods', sub: 'Visa Card ending in 4321', action: () => {} },
    { icon: 'notifications-outline', title: 'Notifications', sub: 'Promos, order alerts, updates', action: () => navigation.navigate("Settings") },
    { icon: 'gift-outline', title: 'Refer & Earn', sub: 'Get ₹250 free on inviting friends', action: () => {} },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              {profilePic ? (
                <Image source={{ uri: profilePic }} style={styles.avatarImage} />
              ) : (
                <Text style={styles.avatarText}>{getUserInitials(userName)}</Text>
              )}
            </View>
            <Pressable style={styles.editAvatarButton}>
              <Ionicons name="camera" size={16} color="#ffffff" />
            </Pressable>
          </View>
          
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
          <Text style={styles.userPhone}>{userPhone}</Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>18</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>₹500</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>4.9 ★</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <Pressable 
              key={index}
              style={({ pressed }) => [
                styles.menuItem,
                pressed && styles.menuItemPressed
              ]}
              onPress={item.action}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.iconBox}>
                  <Ionicons name={item.icon as any} size={22} color="#FF5E3A" />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemSub}>{item.sub}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </Pressable>
          ))}
        </View>

        {/* Logout Quick Link */}
        <Pressable 
          style={styles.logoutButton}
          onPress={() => navigation.navigate("LogOut")}
        >
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Log Out Account</Text>
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  userCard: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FF5E3A',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF5E3A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 1,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1F2937',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2937',
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    fontWeight: '500',
  },
  userPhone: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 16,
    paddingVertical: 14,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
    fontWeight: '500',
  },
  verticalDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#F3F4F6',
  },
  menuContainer: {
    backgroundColor: '#ffffff',
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemPressed: {
    backgroundColor: '#FFF9F8',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    backgroundColor: '#FFF0ED',
    padding: 8,
    borderRadius: 10,
  },
  menuTextContainer: {
    marginLeft: 14,
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  menuItemSub: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#FEF2F2',
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 16,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 8,
  },
});