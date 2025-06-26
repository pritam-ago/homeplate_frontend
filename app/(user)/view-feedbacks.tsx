import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function ViewFeedbacks() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const feedbacks = [
    { name: 'CUSTOMER NAME', item: 'ORDERED ITEM', feedback: '' },
    { name: 'CUSTOMER NAME', item: 'ORDERED ITEM', feedback: '' },
    { name: 'CUSTOMER NAME', item: 'ORDERED ITEM', feedback: '' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#DBDBDB" />
      <View style={[styles.headerContainer, { paddingTop: insets.top + 10, minHeight: 70 + insets.top }]}> 
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton} activeOpacity={0.7}>
          <Text style={styles.backArrow}>{'<'}</Text>
          <Text style={styles.backText}>BACK</Text>
        </TouchableOpacity>
        <View style={styles.spacer} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.topRow}>
          <View style={styles.avatarWrapper}>
            <Text style={styles.avatarIcon}>👤</Text>
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.welcome}>WELCOME CHEF!</Text>
            <Text style={styles.chefIdLink}>CHEF ID</Text>
          </View>
        </View>
        <View style={styles.feedbacksCard}>
          <Text style={styles.feedbacksTitle}>VIEW FEEDBACKS</Text>
          {feedbacks.map((fb, idx) => (
            <View key={idx} style={styles.feedbackCard}>
              <Text style={styles.customerName}>{fb.name}</Text>
              <Text style={styles.orderedItem}>{fb.item}</Text>
              <View style={styles.feedbackBox} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#DBDBDB',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  backArrow: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 6,
    color: '#333333',
  },
  backText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  spacer: {
    width: 80,
  },
  scrollContent: {
    padding: 0,
    paddingBottom: 32,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginLeft: 24,
    marginBottom: 16,
  },
  avatarWrapper: {
    backgroundColor: '#ccc',
    borderRadius: 40,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIcon: {
    fontSize: 36,
  },
  welcome: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 2,
    letterSpacing: 1,
  },
  chefIdLink: {
    color: '#0074D9',
    fontWeight: 'bold',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  feedbacksCard: {
    backgroundColor: '#e5e5e5',
    borderRadius: 32,
    marginHorizontal: 12,
    padding: 18,
    alignItems: 'center',
  },
  feedbacksTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 18,
    letterSpacing: 1,
  },
  feedbackCard: {
    backgroundColor: '#4b4341',
    borderRadius: 24,
    marginBottom: 18,
    padding: 14,
    width: '100%',
  },
  customerName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
  },
  orderedItem: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 10,
  },
  feedbackBox: {
    backgroundColor: '#d3d3d3',
    borderRadius: 16,
    height: 48,
    width: '100%',
  },
}); 