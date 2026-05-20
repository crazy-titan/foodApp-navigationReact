import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Pressable, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useCart } from '../context/CartContext';

// Sharing same global mock database for consistent searching
const SEARCHABLE_ITEMS = [
  {
    id: 'm1',
    name: 'Butter Chicken Wrap',
    price: 249.00,
    description: 'Spiced tandoori chicken wrapped in a warm flatbread with yogurt mint chutney and fresh sliced onions.',
    image: 'https://images.unsplash.com/photo-1626700051175-6518c4793fde?q=80&w=400&auto=format&fit=crop',
    category: 'Rolls',
  },
  {
    id: 'm2',
    name: 'Paneer Tikka Roll',
    price: 189.00,
    description: 'Grilled cottage cheese cubes in aromatic spices, wrapped with crunchy vegetables and house dressing.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=400&auto=format&fit=crop',
    category: 'Rolls',
  },
  {
    id: 'm3',
    name: 'Spicy Chicken Keema Bowl',
    price: 299.00,
    description: 'Flavorful minced chicken cooked with local spices, served over basmati rice and seasoned salad.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400&auto=format&fit=crop',
    category: 'Mains',
  },
  {
    id: 'm4',
    name: 'Garlic Butter Fries',
    price: 120.00,
    description: 'Crisp golden brown fries tossed in rich melted garlic butter and sprinkled with fresh herbs.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=400&auto=format&fit=crop',
    category: 'Sides',
  },
  {
    id: 'm5',
    name: 'Mango Lassi',
    price: 90.00,
    description: 'Creamy yogurt beverage flavored with sweet Alphonso mango pulp, cardamom, and saffron.',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=400&auto=format&fit=crop',
    category: 'Drinks',
  },
];

const CATEGORIES = ['All', 'Rolls', 'Mains', 'Sides', 'Drinks'];

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { cartItems, addToCart, removeFromCart } = useCart();

  const filteredItems = SEARCHABLE_ITEMS.filter(item => {
    const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase()) || 
                         item.description.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  const renderSearchItem = ({ item }: { item: typeof SEARCHABLE_ITEMS[0] }) => {
    const cartItem = cartItems.find(i => i.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.cardDetails}>
          <View style={styles.cardHeader}>
            <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.itemPrice}>₹{item.price.toFixed(0)}</Text>
          </View>
          <Text style={styles.itemDesc} numberOfLines={2}>{item.description}</Text>
          
          <View style={styles.cardFooter}>
            <Text style={styles.categoryBadge}>{item.category}</Text>
            {quantity > 0 ? (
              <View style={styles.quantityContainer}>
                <Pressable 
                  style={styles.quantityBtn} 
                  onPress={() => removeFromCart(item.id)}
                >
                  <Ionicons name="remove" size={16} color="#FF5E3A" />
                </Pressable>
                <Text style={styles.quantityText}>{quantity}</Text>
                <Pressable 
                  style={styles.quantityBtn} 
                  onPress={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })}
                >
                  <Ionicons name="add" size={16} color="#FF5E3A" />
                </Pressable>
              </View>
            ) : (
              <Pressable 
                style={styles.addBtn}
                onPress={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })}
              >
                <Ionicons name="add-circle" size={18} color="#FFFFFF" style={{ marginRight: 4 }} />
                <Text style={styles.addBtnText}>Add</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        {/* Search Input Box */}
        <View style={styles.searchHeader}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#6B7280" style={styles.searchIcon} />
            <TextInput
              style={styles.input}
              placeholder="Search dishes, snacks, or drinks..."
              placeholderTextColor="#9CA3AF"
              value={query}
              onChangeText={setQuery}
              autoCorrect={false}
              clearButtonMode="while-editing"
            />
            {query.length > 0 && (
              <Pressable onPress={() => setQuery('')}>
                <Ionicons name="close-circle" size={20} color="#6B7280" />
              </Pressable>
            )}
          </View>
        </View>

        {/* Categories Chips */}
        <View style={styles.categoriesWrapper}>
          <FlatList
            data={CATEGORIES}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.categoriesList}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => setSelectedCategory(item)}
                style={[
                  styles.categoryChip,
                  selectedCategory === item && styles.categoryChipActive
                ]}
              >
                <Text style={[
                  styles.categoryChipText,
                  selectedCategory === item && styles.categoryChipTextActive
                ]}>
                  {item}
                </Text>
              </Pressable>
            )}
          />
        </View>

        {/* Results List */}
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={renderSearchItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="search-outline" size={60} color="#9CA3AF" style={{ marginBottom: 12 }} />
              <Text style={styles.emptyTitle}>No results found</Text>
              <Text style={styles.emptySubtitle}>Try looking for "Chicken", "Paneer", "Fries", or "Lassi"</Text>
            </View>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  searchHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontFamily: 'Outfit_500Medium',
    fontSize: 15,
    color: '#1F2937',
  },
  categoriesWrapper: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#FF5E3A',
  },
  categoryChipText: {
    fontSize: 14,
    fontFamily: 'Outfit_600SemiBold',
    color: '#4B5563',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 120,
  },
  cardDetails: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Outfit_700Bold',
    color: '#1F2937',
    flex: 1,
    marginRight: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: 'Outfit_700Bold',
    color: '#FF5E3A',
  },
  itemDesc: {
    fontSize: 12,
    fontFamily: 'Outfit_400Regular',
    color: '#6B7280',
    marginVertical: 4,
    lineHeight: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  categoryBadge: {
    fontSize: 11,
    fontFamily: 'Outfit_600SemiBold',
    color: '#FF5E3A',
    backgroundColor: '#FFEBE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF5E3A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addBtnText: {
    fontSize: 12,
    fontFamily: 'Outfit_700Bold',
    color: '#FFFFFF',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF2F0',
    borderWidth: 1,
    borderColor: '#FFD3CB',
    borderRadius: 8,
    paddingHorizontal: 4,
  },
  quantityBtn: {
    padding: 4,
  },
  quantityText: {
    fontSize: 13,
    fontFamily: 'Outfit_700Bold',
    color: '#FF5E3A',
    marginHorizontal: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'Outfit_700Bold',
    color: '#374151',
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: 'Outfit_400Regular',
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 32,
  },
});
