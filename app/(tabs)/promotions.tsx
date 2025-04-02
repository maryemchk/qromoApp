import React, { useState } from 'react';

import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PromotionsScreen() {
  // State for controlling the Create New modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);
  // State for the new promotion form
  const [promotionTitle, setPromotionTitle] = useState('');
  const [promotionDescription, setPromotionDescription] = useState('');
  const [promotionStatus, setPromotionStatus] = useState('Active');

  const handleCreatePromotion = () => {
    if (!promotionTitle || !promotionDescription) {
      Alert.alert('Validation Error', 'Please fill out all fields.');
      return;
    }

    console.log('New Promotion Created:', { promotionTitle, promotionDescription, promotionStatus });
    
    // Reset the form and close the modal
    setPromotionTitle('');
    setPromotionDescription('');
    setPromotionStatus('Active');
    setIsModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Promotions</Text>
        <TouchableOpacity 
          style={styles.createButton} 
          onPress={() => setIsModalVisible(true)}
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
          <Text style={styles.createButtonText}>Create New</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Active Promotions</Text>
        <View style={styles.promotionCard}>
          <View style={styles.promotionHeader}>
            <Text style={styles.promotionTitle}>Happy Hour Special</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Active</Text>
            </View>
          </View>
          <Text style={styles.promotionDescription}>
            20% off all drinks between 3PM - 5PM
          </Text>
          <View style={styles.promotionStats}>
            <Text style={styles.statsText}>Sent to: 150 customers</Text>
            <Text style={styles.statsText}>Opens: 45%</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Promotion</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.promotionCard, styles.scheduledCard]}>
          <View style={styles.promotionHeader}>
            <Text style={styles.promotionTitle}>Weekend Brunch</Text>
            <View style={[styles.statusBadge, styles.scheduledBadge]}>
              <Text style={styles.statusText}>Scheduled</Text>
            </View>
          </View>
          <Text style={styles.promotionDescription}>
            Free mimosa with any brunch entrée
          </Text>
          <Text style={styles.scheduleText}>Starts: Saturday, 10:00 AM</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Promotion</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Past Promotions</Text>
        <View style={[styles.promotionCard, styles.pastCard]}>
          <View style={styles.promotionHeader}>
            <Text style={styles.promotionTitle}>Valentine's Day Special</Text>
            <View style={[styles.statusBadge, styles.completedBadge]}>
              <Text style={styles.statusText}>Completed</Text>
            </View>
          </View>
          <Text style={styles.promotionDescription}>
            Couples dinner package with complimentary dessert
          </Text>
          <View style={styles.promotionStats}>
            <Text style={styles.statsText}>Sent to: 200 customers</Text>
            <Text style={styles.statsText}>Opens: 68%</Text>
            <Text style={styles.statsText}>Redemptions: 45</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  createButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  createButtonText: {
    color: '#FFFFFF',
    marginLeft: 5,
    fontWeight: '600',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#1a1a1a',
  },
  promotionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  promotionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  promotionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  statusBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scheduledBadge: {
    backgroundColor: '#FF9800',
  },
  completedBadge: {
    backgroundColor: '#9E9E9E',
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  promotionDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
  },
  promotionStats: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
    marginTop: 10,
  },
  statsText: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  scheduleText: {
    fontSize: 12,
    color: '#FF9800',
    fontWeight: '600',
    marginTop: 5,
  },
  editButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  scheduledCard: {
    borderColor: '#FF9800',
    borderWidth: 1,
  },
  pastCard: {
    opacity: 0.8,
  },
});
