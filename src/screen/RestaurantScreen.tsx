import { StyleSheet, Text, View, Pressable, ScrollView, Image, FlatList } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

// Mock menu items database
const MENU_ITEMS = [
  {
    id: 'm1',
    name: 'Butter Chicken Wrap',
    price: 249.00,
    description: 'Spiced tandoori chicken wrapped in a warm flatbread with yogurt mint chutney and fresh sliced onions.',
    image: 'https://images.unsplash.com/photo-1626700051175-6518c4793fde?q=80&w=400&auto=format&fit=crop',
    tag: 'Bestseller',
  },
  {
    id: 'm2',
    name: 'Paneer Tikka Roll',
    price: 189.00,
    description: 'Grilled cottage cheese cubes in aromatic spices, wrapped with crunchy vegetables and house dressing.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=400&auto=format&fit=crop',
    tag: 'Vegetarian',
  },
  {
    id: 'm3',
    name: 'Spicy Chicken Keema Bowl',
    price: 299.00,
    description: 'Flavorful minced chicken cooked with local spices, served over basmati rice and seasoned salad.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400&auto=format&fit=crop',
    tag: 'Trending',
  },
  {
    id: 'm4',
    name: 'Garlic Butter Fries',
    price: 120.00,
    description: 'Crisp golden brown fries tossed in rich melted garlic butter and sprinkled with fresh herbs.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=400&auto=format&fit=crop',
    tag: 'Popular Side',
  },
  {
    id: 'm5',
    name: 'Mango Lassi',
    price: 90.00,
    description: 'Creamy yogurt beverage flavored with sweet Alphonso mango pulp, cardamom, and saffron.',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=400&auto=format&fit=crop',
    tag: 'Cooler',
  },
];

// Helper to match restaurant names with banners
const getRestaurantImage = (name: string) => {
  const norm = name.toLowerCase();
  if (norm.includes('hut')) return 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800';
  if (norm.includes('subway')) return 'https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=800';
  if (norm.includes('burger')) return 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800';
  if (norm.includes('zen')) return 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800';
  return 'https://images.unsplash.com/photo-1547058886-f36594d2243d?q=80&w=800'; // Fasoos / Default
};

const RestaurantScreen = ({ route }: any) => {
  const navigation = useNavigation<any>();
  const { restaurant = "Fasoos" } = route.params || {};

  // Store quantities of each item: { itemId: quantity }
  const [cartQuantities, setCartQuantities] = useState<{ [key: string]: number }>({});

  const handleAddItem = (id: string) => {
    setCartQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleRemoveItem = (id: string) => {
    if ((cartQuantities[id] || 0) <= 0) return;
    setCartQuantities(prev => {
      const updated = { ...prev };
      updated[id] = updated[id] - 1;
      if (updated[id] === 0) {
        delete updated[id];
      }
      return updated;
    });
  };

  const getCartTotals = () => {
    let count = 0;
    let price = 0;
    Object.keys(cartQuantities).forEach(id => {
      const item = MENU_ITEMS.find(m => m.id === id);
      if (item) {
        count += cartQuantities[id];
        price += item.price * cartQuantities[id];
      }
    });
    return { count, price: parseFloat(price.toFixed(2)) };
  };

  const { count: totalItemsCount, price: totalCartPrice } = getCartTotals();

  const renderMenuItem = ({ item }: { item: typeof MENU_ITEMS[0] }) => {
    const qty = cartQuantities[item.id] || 0;
    return (
      <View style={styles.menuItemCard}>
        <View style={styles.menuItemDetails}>
          {item.tag && (
            <View style={[
              styles.tagBadge,
              item.tag.includes('Veg') ? styles.tagVeg : styles.tagBestseller
            ]}>
              <Text style={styles.tagText}>{item.tag}</Text>
            </View>
          )}
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>₹{item.price.toFixed(2)}</Text>
          <Text style={styles.itemDescription} numberOfLines={2}>{item.description}</Text>
        </View>
        
        <View style={styles.itemImageContainer}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          
          <View style={styles.actionButtonContainer}>
            {qty > 0 ? (
              <View style={styles.qtyContainer}>
                <Pressable onPress={() => handleRemoveItem(item.id)} style={styles.qtyButton}>
                  <Ionicons name="remove" size={16} color="#FF5E3A" />
                </Pressable>
                <Text style={styles.qtyText}>{qty}</Text>
                <Pressable onPress={() => handleAddItem(item.id)} style={styles.qtyButton}>
                  <Ionicons name="add" size={16} color="#FF5E3A" />
                </Pressable>
              </View>
            ) : (
              <Pressable 
                onPress={() => handleAddItem(item.id)} 
                style={({ pressed }) => [
                  styles.addButton,
                  pressed && styles.addButtonPressed
                ]}
              >
                <Text style={styles.addButtonText}>ADD</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Banner Section */}
        <View style={styles.bannerContainer}>
          <Image source={{ uri: getRestaurantImage(restaurant) }} style={styles.bannerImage} />
          <View style={styles.bannerGradient} />
        </View>

        {/* Info Card Overlay */}
        <View style={styles.infoCard}>
          <Text style={styles.restaurantName}>{restaurant}</Text>
          <Text style={styles.cuisineText}>Wraps, Bowls, Beverages • Fast Food</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <View style={styles.row}>
                <Ionicons name="star" size={16} color="#FF9F29" />
                <Text style={styles.statValue}> 4.4</Text>
              </View>
              <Text style={styles.statLabel}>100+ ratings</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>25 mins</Text>
              <Text style={styles.statLabel}>Delivery time</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>₹40</Text>
              <Text style={styles.statLabel}>Delivery fee</Text>
            </View>
          </View>

          <View style={styles.promoOfferBox}>
            <Ionicons name="pricetag-outline" size={16} color="#FF5E3A" />
            <Text style={styles.promoOfferText}>Get free delivery on orders above ₹300.00</Text>
          </View>
        </View>

        {/* Menu Title */}
        <View style={styles.menuSectionHeader}>
          <Text style={styles.menuTitle}>Recommended</Text>
          <Text style={styles.menuItemsCount}>{MENU_ITEMS.length} items</Text>
        </View>

        {/* Menu List */}
        <FlatList
          data={MENU_ITEMS}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.menuList}
        />
      </ScrollView>

      {/* Floating Bottom Cart Bar */}
      {totalItemsCount > 0 && (
        <SafeAreaView style={styles.bottomBarContainer} edges={['bottom']}>
          <Pressable 
            style={({ pressed }) => [
              styles.checkoutBar,
              pressed && styles.checkoutBarPressed
            ]}
            onPress={() => navigation.navigate("Cart", { price: totalCartPrice })}
          >
            <View>
              <Text style={styles.checkoutItemsCount}>{totalItemsCount} item{totalItemsCount > 1 ? 's' : ''} added</Text>
              <Text style={styles.checkoutSubtotal}>Subtotal: ₹{totalCartPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.viewCartButton}>
              <Text style={styles.viewCartText}>View Cart</Text>
              <Ionicons name="arrow-forward" size={18} color="#ffffff" />
            </View>
          </Pressable>
        </SafeAreaView>
      )}
    </View>
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    paddingBottom: 120, // Extra padding to scroll past the checkout bar
  },
  bannerContainer: {
    height: 200,
    width: '100%',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginHorizontal: 16,
    marginTop: -30,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  restaurantName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2937',
    textAlign: 'center',
  },
  cuisineText: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
    paddingVertical: 12,
  },
  statBox: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
    fontWeight: '500',
  },
  verticalDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E5E7EB',
  },
  promoOfferBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0ED',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  promoOfferText: {
    fontSize: 12,
    color: '#FF5E3A',
    fontWeight: '600',
    marginLeft: 6,
  },
  menuSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
  },
  menuItemsCount: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  menuList: {
    paddingHorizontal: 16,
  },
  menuItemCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2,
  },
  menuItemDetails: {
    flex: 1,
    marginRight: 12,
  },
  tagBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 6,
  },
  tagBestseller: {
    backgroundColor: '#FFF0ED',
  },
  tagVeg: {
    backgroundColor: '#E8F8F5',
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FF5E3A',
    letterSpacing: 0.2,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginTop: 4,
  },
  itemDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 6,
    lineHeight: 16,
  },
  itemImageContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  actionButtonContainer: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    width: 80,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonPressed: {
    backgroundColor: '#FFF0ED',
    borderRadius: 12,
  },
  addButtonText: {
    color: '#FF5E3A',
    fontWeight: '700',
    fontSize: 13,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 6,
  },
  qtyButton: {
    padding: 4,
  },
  qtyText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF5E3A',
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  checkoutBar: {
    backgroundColor: '#FF5E3A',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#FF5E3A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  checkoutBarPressed: {
    opacity: 0.95,
    transform: [{ scale: 0.98 }],
  },
  checkoutItemsCount: {
    fontSize: 12,
    color: '#FFE8E3',
    fontWeight: '600',
  },
  checkoutSubtotal: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '700',
    marginTop: 2,
  },
  viewCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewCartText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
    marginRight: 4,
  },
});