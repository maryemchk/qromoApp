import { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export default function RootLayout() {
  const router = useRouter();
  // Replace this with your actual authentication logic
  const isLoggedIn = false;

  useEffect(() => {
    window.frameworkReady?.();
    if (!isLoggedIn) {
      router.replace('/(auth)/login');
    }
  }, [isLoggedIn, router]);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
