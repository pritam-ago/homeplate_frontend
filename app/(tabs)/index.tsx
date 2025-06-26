import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Alert, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface OrderData {
  orderId: string;
  customerName: string;
  quantity: number;
  userRating: number;
  deliveryPartner: string;
  image: string;
}

export default function Home(): React.ReactElement {
  const insets = useSafeAreaInsets();
  const [hasNewOrder, setHasNewOrder] = useState(true);

  // Sample order data
  const orderData: OrderData = {
    orderId: "ORD001",
    customerName: "John Doe",
    quantity: 2,
    userRating: 4,
    deliveryPartner: "FastDelivery",
    image: "IMG"
  };

  const handleAccept = () => {
    Alert.alert("Order Accepted", "You have accepted the order!");
    setHasNewOrder(false);
  };

  const handleDecline = () => {
    Alert.alert("Order Declined", "You have declined the order.");
    setHasNewOrder(false);
  };

  // Simulate new order after 5 seconds
  useEffect(() => {
    if (!hasNewOrder) {
      const newOrderTimer = setTimeout(() => {
        setHasNewOrder(true);
      }, 5000);
      return () => clearTimeout(newOrderTimer);
    }
  }, [hasNewOrder]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
    
      {/* Main Content - Scrollable */}
      <View className="flex-1 p-4">
        <View className="flex justify-center items-center">
          <Text className="text-lg font-bold m-4">CHEF's DASHBOARD</Text>
          <Text className="text-sm m-4 ">Tagline/description</Text>
        </View>
        <ScrollView 
          className="flex-1 bg-[#d9d9d9] rounded-2xl"
          contentContainerStyle={{ padding: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {hasNewOrder ? (
            <View className="bg-[#AFADAD] rounded-3xl p-4">
              {/* Top Row */}
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-base font-bold text-black">New Order</Text>
                <Text className="text-sm text-black">Order Id:</Text>
              </View>

              {/* Content Row */}
              <View className="flex-row mb-3">
                <View className="flex-1">
                  <View className="mb-2">
                    <Text className="text-sm text-black">Name:</Text>
                  </View>
                  <View className="mb-2">
                    <Text className="text-sm text-black">Quantity:</Text>
                  </View>
                </View>

                <View className="flex-1 pl-4">
                  <View className="mb-2">
                    <Text className="text-sm text-black">User rating: ⭐ {orderData.userRating}/5</Text>
                  </View>
                  <View className="mb-2">
                    <Text className="text-sm text-black"> Delivery Partner</Text>
                  </View>
                </View>

                <View className="w-12 h-12 bg-gray-300 rounded-xl items-center justify-center ml-2">
                  <Text className="text-xs font-bold text-gray-800">IMG</Text>
                </View>
              </View>

              {/* Button Row */}
              <View className="flex-row gap-3">
                <TouchableOpacity 
                  className="flex-1 bg-green-500 rounded-2xl py-3 items-center"
                  onPress={handleAccept}
                  activeOpacity={0.8}
                >
                  <Text className="text-white text-sm font-bold">Accept</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  className="flex-1 bg-red-500 rounded-2xl py-3 items-center"
                  onPress={handleDecline}
                  activeOpacity={0.8}
                >
                  <Text className="text-white text-sm font-bold">Decline</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View className="flex-1 items-center justify-center">
              <Text className="text-lg font-bold text-gray-600 mb-2">No new orders</Text>
              <Text className="text-sm text-gray-500">Waiting for new orders...</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}