import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Earnings() {
  const earnings = [
    { orderId: 'ORDER ID', name: 'CUSTOMER NAME', item: 'ORDERED ITEM', amount: '₹ 250' },
    { orderId: 'ORDER ID', name: 'CUSTOMER NAME', item: 'ORDERED ITEM', amount: '₹ 180' },
    { orderId: 'ORDER ID', name: 'CUSTOMER NAME', item: 'ORDERED ITEM', amount: '₹ 320' },
  ];

  return (
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
      <View style={styles.earningsCard}>
        <Text style={styles.earningsTitle}>EARNINGS</Text>
        {earnings.map((e, idx) => (
          <View key={idx} style={styles.earningCard}>
            <Text style={styles.orderId}>{e.orderId}</Text>
            <Text style={styles.customerName}>{e.name}</Text>
            <Text style={styles.orderedItem}>{e.item}</Text>
            <View style={styles.earningBox}><Text style={styles.earningAmount}>{e.amount}</Text></View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 0,
    paddingBottom: 32,
    backgroundColor: '#fff',
    flexGrow: 1,
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
  earningsCard: {
    backgroundColor: '#e5e5e5',
    borderRadius: 32,
    marginHorizontal: 12,
    padding: 18,
    alignItems: 'center',
  },
  earningsTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 18,
    letterSpacing: 1,
  },
  earningCard: {
    backgroundColor: '#4b4341',
    borderRadius: 24,
    marginBottom: 18,
    padding: 14,
    width: '100%',
  },
  orderId: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
  },
  customerName: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 2,
  },
  orderedItem: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 10,
  },
  earningBox: {
    backgroundColor: '#1db954',
    borderRadius: 16,
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  earningAmount: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
}); 