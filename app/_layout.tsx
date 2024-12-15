import { NavigationContainer } from '@react-navigation/native';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <NavigationContainer >
        <Stack.Screen name="index" />
      </NavigationContainer>
    </Stack>
  );
}
