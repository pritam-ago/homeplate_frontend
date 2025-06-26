"use client"

import { useState } from "react"
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
} from "react-native"
import { useRouter } from "expo-router"

export default function OTP() {
    const router = useRouter()
    const [otp, setOtp] = useState("")

    const handleSubmit = () => {
        if (otp.length === 6) {
            router.replace("/(tabs)")
        } else {
            alert("Please enter a valid 6-digit OTP")
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            {/* Top Section with Welcome Text */}
            <View style={styles.topSection}>
                <Text style={styles.welcomeText}>WELCOME</Text>
                <Text style={styles.subWelcomeText}>TO CHEF PLATE</Text>
            </View>

            {/* Bottom Section with OTP Form */}
            <View style={styles.bottomSection}>
                <Text style={styles.otpTitle}>ENTER OTP</Text>
                <Text style={styles.otpSubtitle}>Please enter the 6-digit verification code sent to your phone</Text>

                <View style={styles.formContainer}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            placeholder="000000"
                            style={styles.input}
                            placeholderTextColor="#999999"
                            keyboardType="numeric"
                            value={otp}
                            onChangeText={setOtp}
                            maxLength={6}
                            textAlign="center"
                            autoFocus={true}
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.submitButton, { opacity: otp.length === 6 ? 1 : 0.6 }]}
                        onPress={handleSubmit}
                        activeOpacity={0.8}
                        disabled={otp.length !== 6}
                    >
                        <Text style={styles.submitButtonText}>SUBMIT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    topSection: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 24,
        paddingTop: 50,
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#000000",
        textAlign: "center",
        textDecorationLine: "underline",
    },
    subWelcomeText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 48,
        color: "#000000",
        textAlign: "center",
        textDecorationLine: "underline",
    },
    bottomSection: {
        flex: 1,
        backgroundColor: "#E5E7EB",
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: 40,
    },
    otpTitle: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 8,
        textAlign: "center",
        color: "#000000",
    },
    otpSubtitle: {
        fontSize: 14,
        color: "#666666",
        textAlign: "center",
        marginBottom: 32,
        lineHeight: 20,
    },
    formContainer: {
        flex: 1,
        justifyContent: "flex-start",
    },
    inputWrapper: {
        marginBottom: 20,
        marginHorizontal: 20,
    },
    input: {
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 24,
        fontSize: 24,
        color: "#000000",
        borderWidth: 1,
        borderColor: "#D1D5DB",
        letterSpacing: 8,
        fontWeight: "bold",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    submitButton: {
        backgroundColor: "#4A4A4A",
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 24,
        marginTop: 20,
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    submitButtonText: {
        color: "#FFFFFF",
        textAlign: "center",
        fontWeight: "600",
        fontSize: 16,
    },
})
