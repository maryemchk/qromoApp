import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';

type SubscriptionPlan = {
  id: string;
  name: string;
  price?: number;
  credits?: number;
  features: string[];
};

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    credits: 1000,
    features: ['1000 SMS Credits', 'Basic Analytics', 'Email Support']
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 99,
    credits: 5000,
    features: ['5000 SMS Credits', 'Advanced Analytics', 'Priority Support']
  },
  {
    id: 'business',
    name: 'Business',
    price: 199,
    credits: 15000,
    features: ['15,000 SMS Credits', 'Team Access', 'API Access']
  },
  {
    id: 'custom',
    name: 'Custom',
    features: ['Flexible Credits', 'Pay-as-you-go']
  }
];

export default function SubscriptionScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [customCredits, setCustomCredits] = useState(1000);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvc: ''
  });
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const creditPrice = 0.02;

  // Mock current subscription data
  const currentSubscription = {
    plan: 'Professional',
    renewDate: new Date('2024-03-01'),
    creditsRemaining: 15000
  };

  const handleSubscribe = () => {
    if (!selectedPlan) {
      Alert.alert('Error', 'Please select a plan first');
      return;
    }
    setShowPaymentForm(true);
  };

  const handlePayment = async () => {
    if (!paymentDetails.cardNumber || !paymentDetails.expiry || !paymentDetails.cvc) {
      Alert.alert('Error', 'Please fill all payment details');
      return;
    }

    try {
      setLoadingPayment(true);
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert('Success', 'Payment processed successfully!');
      router.back();
    } catch (error) {
      Alert.alert('Error', 'Payment failed. Please try again.');
    } finally {
      setLoadingPayment(false);
      setShowPaymentForm(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Subscription Plans</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Current Plan Card */}
      <View style={styles.currentPlanCard}>
        <Text style={styles.currentPlanText}>Current Plan: {currentSubscription.plan}</Text>
        <Text style={styles.creditsRemaining}>
          {currentSubscription.creditsRemaining.toLocaleString()} credits remaining
        </Text>
        <Text style={styles.renewDate}>
          Renews on {currentSubscription.renewDate.toLocaleDateString()}
        </Text>
      </View>

      {/* Plans List */}
      <Text style={styles.sectionTitle}>Choose Your Plan</Text>
      
      {subscriptionPlans.map((plan) => (
        <TouchableOpacity
          key={plan.id}
          style={[
            styles.planCard,
            selectedPlan === plan.id && styles.selectedPlanCard
          ]}
          onPress={() => setSelectedPlan(plan.id)}
        >
          <View style={styles.planHeader}>
            <Text style={styles.planName}>{plan.name}</Text>
            {plan.price && (
              <Text style={styles.planPrice}>${plan.price}/mo</Text>
            )}
          </View>

          {plan.id === 'custom' ? (
            <View style={styles.customPlan}>
              <Text style={styles.creditLabel}>
                {customCredits.toLocaleString()} SMS Credits
              </Text>
              <Slider
                style={styles.slider}
                minimumValue={500}
                maximumValue={50000}
                step={500}
                value={customCredits}
                onValueChange={setCustomCredits}
                minimumTrackTintColor="#007AFF"
                maximumTrackTintColor="#e8e8e8"
                thumbTintColor="#007AFF"
              />
              <Text style={styles.customPrice}>
                ${(customCredits * creditPrice).toFixed(2)}/month
              </Text>
            </View>
          ) : (
            <View>
              <Text style={styles.creditCount}>
                {plan.credits?.toLocaleString()} Credits
              </Text>
              <View style={styles.features}>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          
          {selectedPlan === plan.id && (
            <Ionicons 
              name="checkmark-circle" 
              size={24} 
              color="#007AFF" 
              style={styles.selectedIcon}
            />
          )}
        </TouchableOpacity>
      ))}

      {showPaymentForm && (
        <View style={styles.paymentForm}>
          <Text style={styles.paymentTitle}>Payment Details</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            keyboardType="number-pad"
            value={paymentDetails.cardNumber}
            onChangeText={text => setPaymentDetails(prev => ({ ...prev, cardNumber: text }))}
            placeholderTextColor="#999"
          />

          <View style={styles.rowInput}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="MM/YY"
              keyboardType="number-pad"
              value={paymentDetails.expiry}
              onChangeText={text => setPaymentDetails(prev => ({ ...prev, expiry: text }))}
              placeholderTextColor="#999"
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="CVC"
              keyboardType="number-pad"
              secureTextEntry
              value={paymentDetails.cvc}
              onChangeText={text => setPaymentDetails(prev => ({ ...prev, cvc: text }))}
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity 
            style={styles.payButton}
            onPress={handlePayment}
            disabled={loadingPayment}
          >
            {loadingPayment ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.payButtonText}>Confirm Payment</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {!showPaymentForm && (
        <TouchableOpacity 
          style={styles.subscribeButton}
          onPress={handleSubscribe}
        >
          <Text style={styles.subscribeButtonText}>
            {selectedPlan ? `Subscribe to ${selectedPlan}` : 'Choose a Plan'}
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  currentPlanCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  currentPlanText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  creditsRemaining: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  renewDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 16,
  },
  planCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    position: 'relative',
  },
  selectedPlanCard: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  planName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  planPrice: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  creditCount: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  features: {
    marginLeft: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  customPlan: {
    marginVertical: 12,
  },
  creditLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  customPrice: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '600',
    marginTop: 12,
    textAlign: 'center',
  },
  selectedIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  subscribeButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginVertical: 24,
  },
  subscribeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  paymentForm: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#e8e8e8',
    marginBottom: 12,
  },
  rowInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  payButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});