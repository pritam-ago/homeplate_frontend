"use client"

import React from "react"
import { Tabs } from "expo-router"
import { View, Text, TouchableOpacity, Animated, StyleSheet, StatusBar } from "react-native"
import { Ionicons, MaterialIcons, Feather, Entypo } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { useRouter } from "expo-router"

const labels: string[] = ["Earnings", "Home", "Orders", "Menu"]

interface CustomTabBarProps extends BottomTabBarProps {}

function CustomTabBar({ state, navigation }: CustomTabBarProps): React.ReactElement {
    const insets = useSafeAreaInsets()
    const [animatedValues] = React.useState(state.routes.map(() => new Animated.Value(0)))

    React.useEffect(() => {
        animatedValues.forEach((animatedValue, index) => {
            Animated.timing(animatedValue, {
                toValue: state.index === index ? 1 : 0,
                duration: 200,
                useNativeDriver: false,
            }).start()
        })
    }, [state.index])

    const getIcon = (index: number, isFocused: boolean): React.ReactNode => {
        const color = isFocused ? "#FFFFFF" : "#666666"
        const size = 24

        switch (index) {
            case 0:
                return <MaterialIcons name="account-balance-wallet" size={size} color={color} />
            case 1:
                return <Ionicons name="home" size={size} color={color} />
            case 2:
                return <Feather name="shopping-cart" size={size} color={color} />
            case 3:
                return <Entypo name="open-book" size={size} color={color} />
            default:
                return <Ionicons name="help" size={size} color={color} />
        }
    }

    return (
        <View style={[styles.tabBarContainer, { paddingBottom: insets.bottom + 8 }]}>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index
                const animatedValue = animatedValues[index]

                const onPress = (): void => {
                    if (!isFocused) {
                        navigation.navigate(route.name)
                    }
                }

                const backgroundColor = animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["transparent", "#999999"],
                })

                const scale = animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.1],
                })

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        onPress={onPress}
                        style={styles.tabItem}
                        activeOpacity={0.7}
                    >
                        <Animated.View
                            style={[
                                styles.iconContainer,
                                {
                                    backgroundColor,
                                    transform: [{ scale }],
                                },
                            ]}
                        >
                            {getIcon(index, isFocused)}
                        </Animated.View>
                        <Text
                            style={[
                                styles.tabLabel,
                                {
                                    color: isFocused ? "#333333" : "#666666",
                                    fontWeight: isFocused ? "600" : "400",
                                },
                            ]}
                        >
                            {labels[index]}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

interface CustomHeaderProps {
    showBack: boolean
}

function CustomHeader({ showBack }: CustomHeaderProps): React.ReactElement {
    const router = useRouter()
    const insets = useSafeAreaInsets()

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#DBDBDB" />
            <View
                style={[
                    styles.headerContainer,
                    {
                        paddingTop: insets.top + 10,
                        minHeight: 70 + insets.top,
                    },
                ]}
            >
                {showBack ? (
                    <TouchableOpacity onPress={() => router.replace("/(tabs)")} style={styles.backButton} activeOpacity={0.7}>
                        <Text style={styles.backArrow}>{"<"}</Text>
                        <Text style={styles.backText}>BACK</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.spacer} />
                )}

                <TouchableOpacity style={styles.profileButton} activeOpacity={0.7} onPress={() => router.push("/(user)/profile") }>
                    <Ionicons name="person-outline" size={28} color="#333333" />
                </TouchableOpacity>
            </View>
        </>
    )
}

export default function TabLayout(): React.ReactElement {
    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                tabBarStyle: { display: "none" },
                animation: "shift",
            }}
            tabBar={(props: BottomTabBarProps) => <CustomTabBar {...props} />}
        >
            <Tabs.Screen
                name="earnings"
                options={{
                    title: "Earnings",
                    header: () => <CustomHeader showBack={true} />,
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    header: () => <CustomHeader showBack={false} />,
                }}
            />
            <Tabs.Screen
                name="orders"
                options={{
                    title: "Orders",
                    header: () => <CustomHeader showBack={true} />,
                }}
            />
            <Tabs.Screen
                name="menu"
                options={{
                    title: "Menu",
                    header: () => <CustomHeader showBack={true} />,
                }}
            />
        </Tabs>
    )
}

const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: "row",
        backgroundColor: "#DBDBDB",
        borderTopLeftRadius: 48,
        borderTopRightRadius: 48,
        paddingTop: 16,
        justifyContent: "space-around",
        alignItems: "center",
        height: 100,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 8,
        borderTopWidth: 1,
        borderTopColor: "#CCCCCC",
    },
    tabItem: {
        alignItems: "center",
        flex: 1,
        paddingVertical: 8,
        minHeight: 60,
        justifyContent: "center",
    },
    iconContainer: {
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 8,
        minWidth: 50,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 40,
    },
    tabLabel: {
        fontSize: 12,
        marginTop: 4,
        textAlign: "center",
        minHeight: 16,
    },
    headerContainer: {
        backgroundColor: "#DBDBDB",
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingBottom: 16,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4,
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 8,
    },
    backArrow: {
        fontSize: 18,
        fontWeight: "bold",
        marginRight: 6,
        color: "#333333",
    },
    backText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333333",
    },
    spacer: {
        width: 80,
    },
    profileButton: {
        padding: 8,
        borderRadius: 20,
    },
})

