"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from "react-native"

// Define proper types
interface Order {
    id: string
    name: string
    deliveryPartner: string
    quantity: number
    userRating: number
    status: "active" | "previous"
}

interface OrderCardProps {
    order: Order
    isActive: boolean
    isExpanded: boolean
    onToggleExpand: () => void
    onComplete: () => void
    onToggleCheck?: () => void
    isChecked?: boolean
}

const mockOrders: Order[] = [
    {
        id: "ORD001",
        name: "John Doe",
        deliveryPartner: "FastDelivery",
        quantity: 3,
        userRating: 4.5,
        status: "active",
    },
    {
        id: "ORD002",
        name: "Jane Smith",
        deliveryPartner: "QuickEats",
        quantity: 2,
        userRating: 4.8,
        status: "active",
    },
    {
        id: "ORD003",
        name: "Mike Johnson",
        deliveryPartner: "SpeedyFood",
        quantity: 1,
        userRating: 4.2,
        status: "active",
    },
    {
        id: "ORD004",
        name: "Sarah Wilson",
        deliveryPartner: "RapidDelivery",
        quantity: 4,
        userRating: 4.9,
        status: "active",
    },
    {
        id: "ORD005",
        name: "David Brown",
        deliveryPartner: "FastTrack",
        quantity: 2,
        userRating: 4.3,
        status: "previous",
    },
    {
        id: "ORD006",
        name: "Lisa Davis",
        deliveryPartner: "QuickServe",
        quantity: 3,
        userRating: 4.7,
        status: "previous",
    },
    {
        id: "ORD007",
        name: "Tom Anderson",
        deliveryPartner: "ExpressEats",
        quantity: 1,
        userRating: 4.1,
        status: "previous",
    },
    {
        id: "ORD008",
        name: "Emma Taylor",
        deliveryPartner: "SwiftDelivery",
        quantity: 5,
        userRating: 4.6,
        status: "previous",
    },
    {
        id: "ORD009",
        name: "Robert Wilson",
        deliveryPartner: "QuickEats",
        quantity: 2,
        userRating: 4.4,
        status: "previous",
    },
    {
        id: "ORD010",
        name: "Maria Garcia",
        deliveryPartner: "FastDelivery",
        quantity: 3,
        userRating: 4.8,
        status: "previous",
    },
]

// Order Card Component
const OrderCard: React.FC<OrderCardProps> = ({
                                                 order,
                                                 isActive,
                                                 isExpanded,
                                                 onToggleExpand,
                                                 onComplete,
                                                 onToggleCheck,
                                                 isChecked,
                                             }) => {
    if (!isActive) {
        // Previous orders - simple card with checkbox, Order ID, and Delivery Partner
        return (
            <View style={styles.previousOrderCard}>
                <TouchableOpacity style={styles.previousCheckbox} onPress={onToggleCheck}>
                    <View style={[styles.checkboxBox, isChecked && styles.checkboxChecked]} />
                </TouchableOpacity>
                <Text style={styles.previousOrderId}>Order ID</Text>
                <Text style={styles.previousDeliveryPartner}>Delivery Partner</Text>
            </View>
        )
    }

    // Active orders - show full details with expansion
    return (
        <View>
            <TouchableOpacity style={styles.orderCard} onPress={onToggleExpand}>
                <View style={styles.orderHeader}>
                    <Text style={styles.orderHeaderText}>ORDER ID</Text>
                </View>
                <View style={styles.orderContent}>
                    <View style={styles.orderRow}>
                        <View style={styles.orderField}>
                            <Text style={styles.fieldLabel}>NAME:</Text>
                            <Text style={styles.fieldValue}>{order.name}</Text>
                        </View>
                        <View style={styles.orderField}>
                            <Text style={styles.fieldLabel}>DELIVERY PARTNER:</Text>
                            <Text style={styles.fieldValue}>{order.deliveryPartner}</Text>
                        </View>
                    </View>
                    <View style={styles.orderRow}>
                        <View style={styles.orderField}>
                            <Text style={styles.fieldLabel}>QUANTITY:</Text>
                            <Text style={styles.fieldValue}>{order.quantity}</Text>
                        </View>
                        <View style={styles.orderField}>
                            <Text style={styles.fieldLabel}>USER RATINGS:</Text>
                            <Text style={styles.fieldValue}>{order.userRating}⭐</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

            {isExpanded && (
                <View style={styles.expandedView}>
                    <View style={styles.expandedContent}>
                        <TouchableOpacity style={styles.completedButton} onPress={onComplete}>
                            <Text style={styles.completedButtonText}>COMPLETED</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    )
}

export default function Orders() {
    const [activeTab, setActiveTab] = useState<"active" | "previous">("active")
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
    const [checkedOrders, setCheckedOrders] = useState<string[]>([])

    // Filter orders based on active tab
    const filteredOrders = mockOrders.filter((order) => order.status === activeTab)

    const handleTabChange = useCallback((tab: "active" | "previous") => {
        setActiveTab(tab)
        setExpandedOrder(null) // Close any expanded order when switching tabs
    }, [])

    const handleToggleExpand = useCallback(
        (orderId: string) => {
            setExpandedOrder(expandedOrder === orderId ? null : orderId)
        },
        [expandedOrder],
    )

    const handleComplete = useCallback((orderId: string) => {
        // Handle order completion logic here
        alert(`OTP IS GENERATED`)
        setExpandedOrder(null) // Close the expanded view
    }, [])

    const handleToggleCheck = useCallback((orderId: string) => {
        setCheckedOrders((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
    }, [])

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Title Section */}
            <View style={styles.titleSection}>
                <Text style={styles.mainTitle}>CHEF'S ORDERS</Text>
                <Text style={styles.subtitle}>tagline/description</Text>
            </View>

            {/* Orders Content */}
            <View style={styles.contentContainer}>
                <ScrollView
                    style={styles.ordersScrollView}
                    contentContainerStyle={styles.ordersScrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {filteredOrders.map((order, index) => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            isActive={activeTab === "active"}
                            isExpanded={expandedOrder === order.id}
                            onToggleExpand={() => handleToggleExpand(order.id)}
                            onComplete={() => handleComplete(order.id)}
                            onToggleCheck={() => handleToggleCheck(order.id)}
                            isChecked={checkedOrders.includes(order.id)}
                        />
                    ))}
                </ScrollView>
            </View>

            {/* Sub Tab Buttons */}
            <View style={styles.subTabContainer}>
                <TouchableOpacity
                    style={[styles.subTabButton, activeTab === "active" && styles.subTabButtonActive]}
                    onPress={() => handleTabChange("active")}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.subTabButtonText, activeTab === "active" && styles.subTabButtonTextActive]}>
                        ACTIVE ORDERS
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.subTabButton, activeTab === "previous" && styles.subTabButtonActive]}
                    onPress={() => handleTabChange("previous")}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.subTabButtonText, activeTab === "previous" && styles.subTabButtonTextActive]}>
                        PREVIOUS ORDERS
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    titleSection: {
        alignItems: "center",
        paddingVertical: 30,
        paddingHorizontal: 20,
        marginTop: 10,
    },
    mainTitle: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
        letterSpacing: 1,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
        fontStyle: "italic",
    },
    contentContainer: {
        flex: 1,
        backgroundColor: "#d0d0d0",
        borderRadius: 30,
        marginHorizontal: 15,
        marginBottom: 20,
        paddingTop: 20,
    },
    ordersScrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    ordersScrollContent: {
        paddingBottom: 20,
    },
    orderCard: {
        backgroundColor: "#f0f0f0",
        borderRadius: 15,
        marginBottom: 15,
        overflow: "hidden",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    orderHeader: {
        backgroundColor: "#666",
        paddingVertical: 12,
        paddingHorizontal: 15,
        alignItems: "center",
    },
    orderHeaderText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 1,
    },
    orderContent: {
        padding: 15,
    },
    orderRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    orderField: {
        flex: 1,
        marginHorizontal: 5,
    },
    fieldLabel: {
        fontSize: 12,
        fontWeight: "600",
        color: "#333",
        marginBottom: 4,
        textTransform: "uppercase",
    },
    fieldValue: {
        fontSize: 14,
        color: "#555",
        fontWeight: "500",
    },
    // Previous Orders - Simple Design
    previousOrderCard: {
        backgroundColor: "#e0e0e0",
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    previousCheckbox: {
        marginRight: 15,
    },
    checkboxBox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#666",
        backgroundColor: "#fff",
    },
    checkboxChecked: {
        backgroundColor: "#666",
    },
    previousOrderId: {
        flex: 1,
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    previousDeliveryPartner: {
        fontSize: 14,
        color: "#666",
        backgroundColor: "#c0c0c0",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
    },
    expandedView: {
        backgroundColor: "#c0c0c0",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        marginTop: -15,
        marginBottom: 15,
        paddingTop: 15,
        overflow: "hidden",
    },
    expandedContent: {
        padding: 20,
        alignItems: "center",
        backgroundColor: "#c0c0c0",
    },
    completedButton: {
        backgroundColor: "#4CAF50",
        borderRadius: 12,
        paddingVertical: 15,
        paddingHorizontal: 30,
        alignItems: "center",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        minWidth: 150,
    },
    completedButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 1,
    },
    subTabContainer: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingBottom: 25,
        gap: 15,
    },
    subTabButton: {
        flex: 1,
        backgroundColor: "#666",
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: "center",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    subTabButtonActive: {
        backgroundColor: "#333",
    },
    subTabButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 0.5,
    },
    subTabButtonTextActive: {
        color: "#fff",
    },
})
