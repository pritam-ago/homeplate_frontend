import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [phone, setPhone] = useState('');

  const handleLogin = () => {
    if (!id.trim() || !phone.trim()) {
      Alert.alert('Validation Error', 'Both ID and Phone Number are required.');
      return;
    }
    router.push('/otp');
  };

  return (
      <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

        {/* Top Section with Welcome Text */}
        <View style={styles.topSection}>
          <Text style={styles.welcomeText}>WELCOME</Text>
          <Text style={styles.subWelcomeText}>TO CHEF PLATE</Text>
        </View>

        {/* Bottom Section with Login Form */}
        <View style={styles.bottomSection}>
          <Text style={styles.loginTitle}>LOGIN</Text>

          <View style={styles.formContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                  placeholder="ID"
                  style={styles.input}
                  placeholderTextColor="#999999"
                  value={id}
                  onChangeText={setId}
                  autoCapitalize="none"
                  autoCorrect={false}
              />
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                  placeholder="Password"
                  style={styles.input}
                  placeholderTextColor="#999999"
                  value={phone}
                  onChangeText={setPhone}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  autoCorrect={false}
              />
            </View>

            <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 50,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000000',
    textAlign: 'center',
  },
  subWelcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 48,
    color: '#000000',
    textAlign: 'center',
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 32,
    textAlign: 'center',
    color: '#000000',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  inputWrapper: {
    marginBottom: 20,
    marginHorizontal: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 24,
    fontSize: 16,
    color: '#000000',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  loginButton: {
    backgroundColor: '#4A4A4A',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginTop: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  loginButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});

