import { StyleSheet, Text, View, Pressable, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';

const HelpScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const FAQS = [
    {
      q: 'How do I track my active order?',
      a: 'Once your order is accepted, you can track it live on the Home screen or in "My Orders" in the Profile drawer. You will see real-time updates as your food is prepared and dispatched.',
    },
    {
      q: 'Can I cancel my order after placing it?',
      a: 'Orders can only be cancelled within 60 seconds of placement. After this window, the restaurant starts preparing your fresh meals, and cancellations are no longer permitted.',
    },
    {
      q: 'What should I do if my food is cold or damaged?',
      a: 'We are sorry to hear that. Please take a photo of the received packaging and tap the "Start Live Chat" button below to connect with our 24/7 customer resolution desk.',
    },
    {
      q: 'How do promo codes and cashbacks work?',
      a: 'You can apply any valid promo code at checkout. Cashbacks are automatically credited to your eatNact Wallet within 24 hours of successful delivery.',
    },
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(prev => (prev === index ? null : index));
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Support Header Banner */}
        <View style={styles.headerBanner}>
          <Text style={styles.bannerTitle}>How can we help?</Text>
          <Text style={styles.bannerSub}>Search FAQ or choose a support option below</Text>
          
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color="#9CA3AF" />
            <TextInput
              placeholder="Search help topics..."
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Contact Support Options */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Contact Channels</Text>
        </View>
        
        <View style={styles.contactGrid}>
          <Pressable style={({ pressed }) => [
            styles.contactCard,
            pressed && styles.cardPressed
          ]}>
            <View style={[styles.iconContainer, { backgroundColor: '#FFF0ED' }]}>
              <Ionicons name="chatbubbles" size={24} color="#FF5E3A" />
            </View>
            <Text style={styles.contactTitle}>Live Chat</Text>
            <Text style={styles.contactSub}>Avg. response 2m</Text>
          </Pressable>

          <Pressable style={({ pressed }) => [
            styles.contactCard,
            pressed && styles.cardPressed
          ]}>
            <View style={[styles.iconContainer, { backgroundColor: '#EBF5FB' }]}>
              <Ionicons name="call" size={24} color="#2980B9" />
            </View>
            <Text style={styles.contactTitle}>Call Center</Text>
            <Text style={styles.contactSub}>24/7 hotline</Text>
          </Pressable>
        </View>

        {/* FAQ Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        </View>

        <View style={styles.faqCard}>
          {FAQS.filter(faq => faq.q.toLowerCase().includes(searchQuery.toLowerCase())).map((faq, index) => {
            const isExpanded = expandedFaq === index;
            return (
              <View key={index} style={styles.faqItem}>
                <Pressable 
                  style={styles.faqHeader} 
                  onPress={() => toggleFaq(index)}
                >
                  <Text style={styles.faqQuestion}>{faq.q}</Text>
                  <Ionicons 
                    name={isExpanded ? "chevron-up" : "chevron-down"} 
                    size={18} 
                    color="#4B5563" 
                  />
                </Pressable>
                
                {isExpanded && (
                  <View style={styles.faqAnswerContainer}>
                    <Text style={styles.faqAnswerText}>{faq.a}</Text>
                  </View>
                )}
                {index < FAQS.length - 1 && <View style={styles.divider} />}
              </View>
            );
          })}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  headerBanner: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2937',
  },
  bannerSub: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
    fontWeight: '500',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
    marginTop: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    marginLeft: 8,
    height: '100%',
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
  contactGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  contactCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  iconContainer: {
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  contactSub: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
    fontWeight: '500',
  },
  faqCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    overflow: 'hidden',
  },
  faqItem: {
    backgroundColor: '#ffffff',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
    flex: 1,
    marginRight: 10,
  },
  faqAnswerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#FAFBFB',
  },
  faqAnswerText: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
});