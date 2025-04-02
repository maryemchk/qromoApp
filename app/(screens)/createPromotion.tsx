import React, { useState, useEffect } from 'react';
import { 
  Alert, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';

const mockSubscription = {
  plan: 'Professional',
  credits: 5000,
  usedCredits: 1500,
  renewDate: '2024-03-01',
  status: 'active'
};

export default function CreatePromotionScreen() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'Active',
    date: new Date(),
    customers: 100
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate subscription loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) setForm(prev => ({ ...prev, date }));
  };

  const handleSubmit = () => {
    if (!form.title || !form.description) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    if (form.customers > mockSubscription.credits) {
      Alert.alert('Insufficient Credits', 
        `You need ${form.customers} credits (Available: ${mockSubscription.credits})`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Upgrade', onPress: () => router.push('/subscription') }
        ]
      );
      return;
    }

    Alert.alert('Success', `Promotion created!\n${form.customers} credits deducted`);
    router.back();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Return Button */}
      <TouchableOpacity 
        style={styles.returnButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#007AFF" />
      </TouchableOpacity>

      {/* Subscription Header */}
      <View style={styles.subscriptionHeader}>
        <View style={styles.planBadge}>
          <Ionicons name="shield-checkmark" size={18} color="#007AFF" />
          <Text style={styles.planText}>{mockSubscription.plan} Plan</Text>
        </View>
        
        <View style={styles.creditMeter}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { 
              width: `${(mockSubscription.usedCredits / mockSubscription.credits) * 100}%`
            }]} />
          </View>
          <Text style={styles.creditText}>
            {mockSubscription.credits - mockSubscription.usedCredits} credits remaining
          </Text>
        </View>
      </View>

      {/* Creation Form */}
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>New Promotion</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Promotion Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Summer Sale"
            value={form.title}
            onChangeText={text => setForm(prev => ({ ...prev, title: text }))}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe your promotion..."
            value={form.description}
            onChangeText={text => setForm(prev => ({ ...prev, description: text }))}
            multiline
            numberOfLines={4}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Recipients</Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderValue}>{form.customers} customers</Text>
            <Slider
              minimumValue={1}
              maximumValue={mockSubscription.credits}
              step={1}
              value={form.customers}
              onValueChange={value => setForm(prev => ({ ...prev, customers: Math.round(value) }))}
              minimumTrackTintColor="#007AFF"
              maximumTrackTintColor="#e8e8e8"
              thumbTintColor="#007AFF"
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>Min: 1</Text>
              <Text style={styles.sliderLabel}>Max: {mockSubscription.credits}</Text>
            </View>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.statusContainer}>
            {['Active', 'Scheduled'].map(status => (
              <TouchableOpacity
                key={status}
                style={[styles.statusButton, form.status === status && styles.activeStatus]}
                onPress={() => setForm(prev => ({ ...prev, status }))}
              >
                <Text style={[styles.statusText, form.status === status && styles.activeStatusText]}>
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {form.status === 'Scheduled' && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Schedule Time</Text>
            <TouchableOpacity 
              style={styles.dateInput}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name="time-outline" size={20} color="#666" />
              <Text style={styles.dateText}>
                {form.date.toLocaleString()}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={form.date}
                mode="datetime"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
              />
            )}
          </View>
        )}

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitText}>Create Promotion</Text>
          <Ionicons name="rocket-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  returnButton: {
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
  },
  subscriptionHeader: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  planBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  planText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginLeft: 8,
  },
  creditMeter: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  creditText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  sliderContainer: {
    marginTop: 8,
  },
  sliderValue: {
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 8,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  sliderLabel: {
    fontSize: 12,
    color: '#666',
  },
  statusContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 4,
  },
  statusButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeStatus: {
    backgroundColor: 'white',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeStatusText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  dateText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#1a1a1a',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});
