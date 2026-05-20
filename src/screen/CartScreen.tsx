import { StyleSheet, Text, View, Pressable, ScrollView, Image, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useCart } from '../context/CartContext';

const CartScreen = ({ route }: any) => {
  const navigation = useNavigation<any>();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isPlacing, setIsPlacing] = useState(false);

  // Math breakdown
  const subtotal = cartTotal;
  const deliveryFee = subtotal > 300 || subtotal === 0 ? 0 : 40.00;
  const tax = parseFloat((subtotal * 0.05).toFixed(2)); // 5% GST
  const promoDiscount = subtotal > 200 ? 50.00 : 0.00;
  const grandTotal = parseFloat((subtotal + deliveryFee + tax - promoDiscount).toFixed(2));

  const handlePlaceOrder = () => {
    setIsPlacing(true);
    // Simulate order placement
    setTimeout(() => {
      setIsPlacing(false);
      setOrderPlaced(true);
      clearCart(); // Empties global cart upon successful checkout
    }, 1500);
  };

  const handleResetCart = () => {
    setOrderPlaced(false);
    // Navigate back to exploration
    navigation.navigate("Explore");
  };

  if (orderPlaced) {
    return (
      <SafeAreaView style={styles.successContainer}>
        <View style={styles.successContent}>
          <View style={styles.successBadge}>
            <Ionicons name="checkmark-circle" size={80} color="#10B981" />
          </View>
          <Text style={styles.successTitle}>Order Placed!</Text>
          <Text style={styles.successSubtitle}>
            Your meal is being prepared and will arrive at your address in approximately 25-30 minutes.
          </Text>
          
          <View style={styles.trackerCard}>
            <View style={styles.trackerRow}>
              <Ionicons name="restaurant" size={20} color="#FF5E3A" />
              <View style={styles.trackerTextContainer}>
                <Text style={styles.trackerStepTitle}>Preparing your food</Text>
                <Text style={styles.trackerStepSub}>Kitchen is preparing your delicious meal</Text>
              </View>
            </View>
            <View style={styles.trackerDivider} />
            <View style={styles.trackerRow}>
              <Ionicons name="bicycle" size={20} color="#9CA3AF" />
              <View style={styles.trackerTextContainer}>
                <Text style={styles.trackerStepTitleMuted}>Out for delivery</Text>
                <Text style={styles.trackerStepSub}>Valet not assigned yet</Text>
              </View>
            </View>
          </View>

          <Pressable 
            style={({ pressed }) => [
              styles.successButton,
              pressed && styles.buttonPressed
            ]}
            onPress={handleResetCart}
          >
            <Text style={styles.successButtonText}>Track Order & Browse</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      {subtotal > 0 ? (
        <View style={styles.mainContainer}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            
            {/* Delivery address card */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Delivery Address</Text>
            </View>
            <View style={styles.addressCard}>
              <View style={styles.addressHeader}>
                <View style={styles.row}>
                  <Ionicons name="home" size={18} color="#FF5E3A" />
                  <Text style={styles.addressType}>Home</Text>
                </View>
                <Pressable>
                  <Text style={styles.changeLink}>Change</Text>
                </Pressable>
              </View>
              <Text style={styles.addressText}>123 Main St, Apt 4B, Central Area, 10001</Text>
              <Text style={styles.addressPhone}>Phone: +1 (555) 019-2834</Text>
            </View>

            {/* Order items card summary */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Selected Meals</Text>
            </View>
            <View style={styles.itemsCard}>
              {cartItems.map((item) => (
                <React.Fragment key={item.id}>
                  <View style={styles.itemRow}>
                    <View style={styles.row}>
                      <View style={styles.itemQtyBadge}>
                        <Text style={styles.itemQtyText}>{item.quantity}x</Text>
                      </View>
                      <View>
                        <Text style={styles.itemNameText}>{item.name}</Text>
                        <Text style={styles.itemPriceText}>₹{item.price.toFixed(2)} each</Text>
                      </View>
                    </View>
                    <Text style={styles.itemTotalText}>₹{(item.price * item.quantity).toFixed(2)}</Text>
                  </View>
                  <View style={styles.dashDivider} />
                </React.Fragment>
              ))}
              <View style={styles.promoAppliedBox}>
                <Ionicons name="gift-outline" size={16} color="#10B981" />
                <Text style={styles.promoAppliedText}>
                  {subtotal > 200 ? "Promo Applied: -₹50.00 first order discount" : "Add items above ₹200 for discount!"}
                </Text>
              </View>
            </View>

            {/* Payment Method Card */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Payment Method</Text>
            </View>
            <View style={styles.paymentCard}>
              <View style={styles.row}>
                <View style={styles.cardBrandBox}>
                  <Ionicons name="card" size={22} color="#1F2937" />
                </View>
                <View style={styles.paymentDetails}>
                  <Text style={styles.paymentTitle}>Visa Card</Text>
                  <Text style={styles.paymentSub}>•••• •••• •••• 4321</Text>
                </View>
              </View>
              <Pressable>
                <Text style={styles.changeLink}>Edit</Text>
              </Pressable>
            </View>

            {/* Bill Details */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Bill Summary</Text>
            </View>
            <View style={styles.billCard}>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Item Subtotal</Text>
                <Text style={styles.billValue}>₹{subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Delivery Partner Fee</Text>
                <Text style={styles.billValue}>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}</Text>
              </View>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Taxes & GST (5%)</Text>
                <Text style={styles.billValue}>₹{tax.toFixed(2)}</Text>
              </View>
              {promoDiscount > 0 && (
                <View style={styles.billRow}>
                  <Text style={styles.billLabelGreen}>Discount (Promo)</Text>
                  <Text style={styles.billValueGreen}>-₹{promoDiscount.toFixed(2)}</Text>
                </View>
              )}
              <View style={styles.billDivider} />
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Grand Total</Text>
                <Text style={styles.totalValue}>₹{grandTotal.toFixed(2)}</Text>
              </View>
            </View>
          </ScrollView>

          {/* Place Order CTA Bar */}
          <View style={styles.bottomBar}>
            <View style={styles.priceContainer}>
              <Text style={styles.payText}>Total Price</Text>
              <Text style={styles.priceText}>₹{grandTotal.toFixed(2)}</Text>
            </View>
            
            <Pressable 
              style={({ pressed }) => [
                styles.payButton,
                pressed && styles.buttonPressed
              ]}
              onPress={handlePlaceOrder}
              disabled={isPlacing}
            >
              {isPlacing ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.payButtonText}>Place Order</Text>
              )}
            </Pressable>
          </View>
        </View>
      ) : (
        /* Empty Cart State */
        <View style={styles.emptyContainer}>
          <View style={styles.emptyImageBg}>
            <Ionicons name="cart-outline" size={70} color="#FF5E3A" />
          </View>
          <Text style={styles.emptyTitle}>Your Basket is Empty</Text>
          <Text style={styles.emptySubtitle}>
            Browse our list of top restaurants and pick your favorite delicious food!
          </Text>
          
          <Pressable 
            style={({ pressed }) => [
              styles.browseButton,
              pressed && styles.buttonPressed
            ]}
            onPress={() => navigation.navigate("Explore")}
          >
            <Text style={styles.browseButtonText}>Browse Restaurants</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  mainContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#374151',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressType: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    marginLeft: 6,
  },
  changeLink: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FF5E3A',
  },
  addressText: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  addressPhone: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 6,
    fontWeight: '500',
  },
  itemsCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemQtyBadge: {
    backgroundColor: '#FFF0ED',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 10,
  },
  itemQtyText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FF5E3A',
  },
  itemNameText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  itemPriceText: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  itemTotalText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  dashDivider: {
    height: 1,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderStyle: 'dashed',
    marginVertical: 12,
  },
  promoAppliedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F8F5',
    borderRadius: 8,
    padding: 8,
  },
  promoAppliedText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#10B981',
    marginLeft: 6,
  },
  paymentCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  cardBrandBox: {
    backgroundColor: '#F3F4F6',
    padding: 8,
    borderRadius: 8,
  },
  paymentDetails: {
    marginLeft: 12,
  },
  paymentTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  paymentSub: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 1,
  },
  billCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    marginBottom: 16,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  billLabel: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  billValue: {
    fontSize: 13,
    color: '#1F2937',
    fontWeight: '600',
  },
  billLabelGreen: {
    fontSize: 13,
    color: '#10B981',
    fontWeight: '600',
  },
  billValueGreen: {
    fontSize: 13,
    color: '#10B981',
    fontWeight: '700',
  },
  billDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1F2937',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FF5E3A',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  priceContainer: {
    flexDirection: 'column',
  },
  payText: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  priceText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
  },
  payButton: {
    backgroundColor: '#FF5E3A',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: '#FF5E3A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  payButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyImageBg: {
    backgroundColor: '#FFF0ED',
    padding: 24,
    borderRadius: 40,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: '#FF5E3A',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 24,
    shadowColor: '#FF5E3A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  browseButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  successContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  successContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  successBadge: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 28,
  },
  trackerCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  trackerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  trackerTextContainer: {
    marginLeft: 12,
  },
  trackerStepTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  trackerStepSub: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 1,
  },
  trackerStepTitleMuted: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  trackerDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#D1D5DB',
    marginLeft: 9,
    marginVertical: 4,
  },
  successButton: {
    backgroundColor: '#FF5E3A',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 26,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#FF5E3A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  successButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});