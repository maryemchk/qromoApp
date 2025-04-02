import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ActivityIndicator,
  Animated,
  Modal,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';

// Update the path to the correct location of AuthContext
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const businessTypes = [
  'Restaurant',
  'Bar',
  'Patisserie',
  'Clothing Store'
];

export default function AuthScreen() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [businessName, setBusinessName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showBusinessTypes, setShowBusinessTypes] = useState(false);
  const router = useRouter();
  const { login, signup } = useAuth();
  const [buttonScale] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    if (isLoginMode) {
      if (businessName && password) {
        login();
        router.replace('/(tabs)');
      } else {
        Alert.alert('Invalid Credentials', 'Please check your business name and password.');
      }
    } else {
      if (password !== confirmPassword) {
        Alert.alert('Password Mismatch', 'Passwords do not match.');
        setIsLoading(false);
        return;
      }

      try {
        await signup(email, password, businessName, businessType, location, phoneNumber);
        router.replace('/(tabs)');
      } catch (error) {
        Alert.alert('Signup Error', 'Something went wrong. Please try again.');
      }
    }
    setIsLoading(false);
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isLoginMode ? 'Business Login' : 'Register Your Business'}
      </Text>

      {isLoginMode ? (
        <>
          <View style={styles.inputContainer}>
            <Ionicons name="business-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Business Name"
              value={businessName}
              onChangeText={setBusinessName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="business-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Business Name"
              value={businessName}
              onChangeText={setBusinessName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="call-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="location-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
            />
          </View>

          {/* Business Type Selector */}
          <TouchableOpacity 
            style={styles.inputContainer}
            onPress={() => setShowBusinessTypes(true)}
          >
            <Ionicons name="pricetag-outline" size={20} color="#666" style={styles.icon} />
            <Text style={[styles.input, !businessType && { color: '#888' }]}>
              {businessType || 'Select Business Type'}
            </Text>
          </TouchableOpacity>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>
        </>
      )}

      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleSubmit} 
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {isLoginMode ? 'Login' : 'Sign Up'}
            </Text>
          )}
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity onPress={() => setIsLoginMode(!isLoginMode)}>
        <Text style={styles.toggleText}>
          {isLoginMode ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>

      {/* Business Type Modal */}
      <Modal
        visible={showBusinessTypes}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowBusinessTypes(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Business Type</Text>
            <ScrollView>
              {businessTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeButton,
                    businessType === type && styles.selectedType
                  ]}
                  onPress={() => {
                    setBusinessType(type);
                    setShowBusinessTypes(false);
                  }}
                >
                  <Text style={styles.typeText}>{type}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowBusinessTypes(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2ecc71',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  button: {
    backgroundColor: '#2ecc71',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleText: {
    marginTop: 15,
    color: '#2ecc71',
    textAlign: 'center',
    fontSize: 16,
  },
  forgotText: {
    color: '#2ecc71',
    textAlign: 'right',
    fontSize: 14,
    marginBottom: 15,
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    textAlign: 'center',
  },
  typeButton: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedType: {
    backgroundColor: '#f0fff4',
  },
  typeText: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  closeText: {
    color: '#2ecc71',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});[{
	"resource": "/C:/Users/21655/Desktop/project/app/(auth)/login/login/page.tsx",
	"owner": "typescript",
	"code": "2345",
	"severity": 8,
	"message": "Argument of type '\"/(auth)/forgot-password\"' is not assignable to parameter of type 'RelativePathString | ExternalPathString | \"/createPromotion\" | `/createPromotion?${string}` | `/createPromotion#${string}` | \"/subscription\" | `/subscription?${string}` | `/subscription#${string}` | \"/userProfile\" | ... 80 more ... | { ...; }'.",
	"source": "ts",
	"startLineNumber": 83,
	"startColumn": 17,
	"endLineNumber": 83,
	"endColumn": 42
}]