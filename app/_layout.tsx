import { NavigationContainer } from '@react-navigation/native';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
    <NavigationContainer>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </NavigationContainer>
    </Stack>
  );
}
