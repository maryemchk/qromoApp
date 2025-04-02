import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme, SafeAreaView, Platform } from 'react-native';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const handleCreatePromotion = () => {
    router.push('/createPromotion');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }]}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#8E8E93',
          tabBarStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1C1C1E' : '#FFFFFF',
            height: 80,
            borderTopWidth: 1,
            borderTopColor: colorScheme === 'dark' ? '#2C2C2E' : '#F0F0F0',
            paddingHorizontal: 20,
            paddingTop: 12,
            paddingBottom: 24,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
            marginBottom: 8,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="customers"
          options={{
            title: 'Customers',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="people" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="promotions"
          options={{
            title: 'Promotions',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="megaphone" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tabs>

      {/* Enhanced Floating Action Button */}
      <TouchableOpacity 
        style={[
          styles.fab,
          { 
            backgroundColor: '#007AFF',
            shadowColor: colorScheme === 'dark' ? '#000' : '#007AFF',
          }
        ]} 
        onPress={handleCreatePromotion}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.select({
      ios: 30,  // Extra padding for iOS notch
      android: 25 // Padding for Android status bar
    })
  },
  fab: {
    position: 'absolute',
    bottom: Platform.select({
      ios: 70,
      android: 60,
      web: 20 // Add web-specific positioning
    }),
    left: '50%',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -30 }],
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});