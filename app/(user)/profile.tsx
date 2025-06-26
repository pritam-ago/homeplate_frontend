import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [showStatus, setShowStatus] = useState(false);
  const [status, setStatus] = useState<'on' | 'off'>('on');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');

  return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#DBDBDB" />
        <View style={[styles.headerContainer, { paddingTop: insets.top + 10, minHeight: 70 + insets.top }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={24} color="#333333" />
            <Text style={styles.backText}>BACK</Text>
          </TouchableOpacity>
          <View style={styles.spacer} />
        </View>
        <View style={styles.profileSection}>
          <Text style={styles.welcome}>WELCOME CHEF!</Text>
          <View style={styles.avatarWrapper}>
            <Text style={styles.avatarIcon}>👤</Text>
          </View>
          <Text style={styles.chefId}>CHEF ID</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.actionBtn}><Text style={styles.btnText}>CONTACT ADMIN</Text></TouchableOpacity>
            <View style={{ width: '100%', alignItems: 'center' }}>
              <TouchableOpacity style={styles.actionBtn} onPress={() => setShowStatus((v) => !v)}>
                <Text style={styles.btnText}>RESTAURANT STATUS</Text>
                {showStatus && (
                    <View style={styles.statusInline}>
                      <Text style={[styles.statusDisplay, status === 'on' ? styles.statusOn : styles.statusOff]}>{status === 'on' ? 'ON' : 'OFF'}</Text>
                      <View style={styles.statusRow}>
                        <Text style={styles.setStatus}>SET STATUS</Text>
                        <View style={styles.toggleGroup}>
                          <TouchableOpacity
                              style={[styles.toggleBtn, status === 'on' && styles.toggleOn]}
                              onPress={() => setStatus('on')}
                              activeOpacity={0.8}
                          >
                            <Text style={[styles.toggleText, status === 'on' && styles.toggleTextActiveOn]}>ON</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                              style={[styles.toggleBtn, status === 'off' && styles.toggleOff]}
                              onPress={() => setStatus('off')}
                              activeOpacity={0.8}
                          >
                            <Text style={[styles.toggleText, status === 'off' && styles.toggleTextActiveOff]}>OFF</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.actionBtn} onPress={() => router.push('/(user)/view-feedbacks')}><Text style={styles.btnText}>VIEW FEEDBACKS</Text></TouchableOpacity>
            <View style={{ width: '100%', alignItems: 'center' }}>
              <TouchableOpacity style={styles.actionBtn} onPress={() => setShowFeedback((v) => !v)}>
                <Text style={styles.btnText}>SEND FEEDBACK</Text>
                {showFeedback && (
                    <View style={styles.feedbackCard}>
                      <View style={styles.inputWrapper}>
                        <Ionicons name="paper-plane-outline" size={20} color="#888" style={styles.inputIcon} />
                        <TextInput
                            style={styles.feedbackInput}
                            placeholder="TYPE YOUR FEEDBACK"
                            placeholderTextColor="#888"
                            value={feedback}
                            onChangeText={setFeedback}
                        />
                      </View>
                    </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    paddingBottom: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    zIndex: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(51, 51, 51, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
  },
  backArrow: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 6,
    color: '#333333',
  },
  backText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333333',
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  spacer: {
    width: 80,
  },
  profileSection: {
    backgroundColor: '#e5e5e5',
    marginTop: 10,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
    paddingTop: 30,
    flex: 1,
  },
  welcome: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 10,
    marginTop: 10,
    letterSpacing: 1,
  },
  avatarWrapper: {
    backgroundColor: '#ccc',
    borderRadius: 100,
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  avatarIcon: {
    fontSize: 90,
    marginTop: 10,
  },
  chefId: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
    letterSpacing: 1,
  },
  buttonGroup: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  actionBtn: {
    backgroundColor: '#4b4341',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 30,
    marginVertical: 10,
    width: '85%',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  statusCard: {
    backgroundColor: '#4b4341',
    borderRadius: 28,
    marginTop: 10,
    marginBottom: 10,
    padding: 18,
    width: '100%',
    alignItems: 'center',
  },
  statusTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    letterSpacing: 1,
    marginBottom: 16,
    textAlign: 'center',
  },
  statusRow: {
    backgroundColor: '#fff',
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  setStatus: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
    marginLeft: 8,
    flex: 1,
  },
  toggleGroup: {
    flexDirection: 'row',
    gap: 10,
    flex: 1.5,
    justifyContent: 'flex-end',
  },
  toggleBtn: {
    backgroundColor: '#DBDBDB',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginHorizontal: 4,
    minWidth: 60,
    alignItems: 'center',
  },
  toggleActive: {
    backgroundColor: '#bdbdbd',
  },
  toggleText: {
    color: '#444',
    fontWeight: 'bold',
    fontSize: 16,
  },
  toggleTextActive: {
    color: '#222',
  },
  statusDisplay: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 12,
    marginTop: -8,
    letterSpacing: 2,
    textAlign: 'center',
  },
  statusOn: {
    color: '#1db954', // green
  },
  statusOff: {
    color: '#e53935', // red
  },
  toggleOn: {
    backgroundColor: '#1db954',
  },
  toggleOff: {
    backgroundColor: '#e53935',
  },
  toggleTextActiveOn: {
    color: '#fff',
    fontWeight: 'bold',
  },
  toggleTextActiveOff: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeBtn: {
    marginTop: 18,
    backgroundColor: '#DBDBDB',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  closeBtnText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  statusInline: {
    marginTop: 10,
    alignItems: 'center',
    width: '100%',
  },
  feedbackCard: {
    backgroundColor: '#4b4341',
    borderRadius: 28,
    marginTop: 10,
    marginBottom: 10,
    padding: 18,
    width: '100%',
    alignItems: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    width: '100%',
  },
  inputIcon: {
    marginRight: 6,
  },
  feedbackInput: {
    flex: 1,
    fontSize: 14,
    color: '#222',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
});