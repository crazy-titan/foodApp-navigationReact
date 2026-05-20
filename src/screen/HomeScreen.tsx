import { StyleSheet, Text, View, Pressable, TextInput, ScrollView, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';


const CATEGORIES = [
  { id: '1', name: 'Pizza', icon: 'pizza-outline', emoji: '🍕' },
  { id: '2', name: 'Burgers', icon: 'fast-food-outline', emoji: '🍔' },
  { id: '3', name: 'Asian', icon: 'leaf-outline', emoji: '🥢' },
  { id: '4', name: 'Desserts', icon: 'ice-cream-outline', emoji: '🍰' },
  { id: '5', name: 'Healthy', icon: 'nutrition-outline', emoji: '🥗' },
  { id: '6', name: 'Drinks', icon: 'beer-outline', emoji: '🥤' },
];


const RESTAURANTS = [
  {
    id: '1',
    name: 'Fasoos',
    cuisine: 'Wraps & Rice Bowls',
    rating: 4.3,
    deliveryTime: '25 min',
    distance: '1.2 km',
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1547058886-f36594d2243d?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Pizza Hut',
    cuisine: 'Pizza, Italian',
    rating: 4.5,
    deliveryTime: '30 min',
    distance: '2.0 km',
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Subway',
    cuisine: 'Healthy, Sandwiches',
    rating: 4.1,
    deliveryTime: '15 min',
    distance: '0.8 km',
    priceRange: '$',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Burger King',
    cuisine: 'Burgers, American',
    rating: 4.4,
    deliveryTime: '20 min',
    distance: '1.5 km',
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '5',
    name: 'Sushi Zen',
    cuisine: 'Japanese, Sushi',
    rating: 4.8,
    deliveryTime: '35 min',
    distance: '2.8 km',
    priceRange: '$$$',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600&auto=format&fit=crop',
  },
];

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [selectedCategory, setSelectedCategory] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');

  const renderRestaurantCard = ({ item }: { item: typeof RESTAURANTS[0] }) => (
    <Pressable
      style={({ pressed }) => [
        styles.restaurantCard,
        pressed && styles.cardPressed
      ]}
      onPress={() => navigation.navigate("Restaurant", { restaurant: item.name })}
    >
      <Image source={{ uri: item.image }} style={styles.restaurantImage} />
      
      <View style={styles.cardOverlay}>
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color="#FF9F29" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>

      <View style={styles.restaurantDetails}>
        <View style={styles.rowJustified}>
          <Text style={styles.restaurantName}>{item.name}</Text>
          <Text style={styles.priceRange}>{item.priceRange}</Text>
        </View>
        <Text style={styles.cuisineText}>{item.cuisine}</Text>
        
        <View style={styles.divider} />
        
        <View style={styles.metadataRow}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={14} color="#6B7280" />
            <Text style={styles.metaText}>{item.deliveryTime}</Text>
          </View>
          <View style={styles.metaDot} />
          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={14} color="#6B7280" />
            <Text style={styles.metaText}>{item.distance}</Text>
          </View>
          <View style={styles.metaDot} />
          <View style={styles.freeDeliveryBadge}>
            <Text style={styles.freeDeliveryText}>Free Delivery</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Deliver to</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={18} color="#FF5E3A" />
            <Text style={styles.locationText}>Home, Central Area</Text>
            <Ionicons name="chevron-down" size={16} color="#1F2937" />
          </View>
        </View>
        <Pressable 
          style={styles.notificationButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-circle-outline" size={32} color="#1F2937" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            placeholder="Search restaurants, dishes..."
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Pressable style={styles.filterButton}>
            <Ionicons name="options-outline" size={20} color="#ffffff" />
          </Pressable>
        </View>

        {/* Promo Banner */}
        <View style={styles.promoBanner}>
          <View style={styles.promoTextContainer}>
            <Text style={styles.promoTitle}>Grab 50% Off</Text>
            <Text style={styles.promoSubtitle}>On your first order today!</Text>
            <Pressable style={styles.promoButton}>
              <Text style={styles.promoButtonText}>Order Now</Text>
            </Pressable>
          </View>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=400&auto=format&fit=crop' }} 
            style={styles.promoImage} 
          />
        </View>

        {/* Categories Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoriesContainer}
        >
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <Pressable
                key={category.id}
                onPress={() => setSelectedCategory(category.id)}
                style={[
                  styles.categoryCard,
                  isSelected && styles.categoryCardSelected
                ]}
              >
                <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                <Text style={[
                  styles.categoryName,
                  isSelected && styles.categoryNameSelected
                ]}>
                  {category.name}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Restaurants Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Restaurants</Text>
          <Pressable>
            <Text style={styles.seeAllText}>See All</Text>
          </Pressable>
        </View>

        <FlatList
          data={RESTAURANTS.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()))}
          renderItem={renderRestaurantCard}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.restaurantsList}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  welcomeText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginHorizontal: 4,
  },
  notificationButton: {
    padding: 2,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1F2937',
    height: '100%',
  },
  filterButton: {
    backgroundColor: '#FF5E3A',
    padding: 8,
    borderRadius: 10,
  },
  promoBanner: {
    backgroundColor: '#FFF0ED',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    height: 120,
  },
  promoTextContainer: {
    flex: 1,
    zIndex: 2,
  },
  promoTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FF5E3A',
  },
  promoSubtitle: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 2,
    fontWeight: '500',
  },
  promoButton: {
    backgroundColor: '#1F2937',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  promoButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  promoImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: 0,
    bottom: -15,
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF5E3A',
  },
  categoriesContainer: {
    paddingLeft: 20,
    paddingRight: 8,
    paddingBottom: 4,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  categoryCardSelected: {
    backgroundColor: '#FF5E3A',
    borderColor: '#FF5E3A',
  },
  categoryEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },
  categoryNameSelected: {
    color: '#ffffff',
  },
  restaurantsList: {
    paddingHorizontal: 20,
  },
  restaurantCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardPressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.95,
  },
  restaurantImage: {
    width: '100%',
    height: 160,
  },
  cardOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
    marginLeft: 4,
  },
  restaurantDetails: {
    padding: 16,
  },
  rowJustified: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restaurantName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
  },
  priceRange: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  cuisineText: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 12,
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
    fontWeight: '500',
  },
  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#9CA3AF',
    marginHorizontal: 8,
  },
  freeDeliveryBadge: {
    backgroundColor: '#E8F8F5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  freeDeliveryText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#10B981',
  },
});