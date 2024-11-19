import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="alerts" />
      <Stack.Screen name="dataActivities" />
      <Stack.Screen name="dataSteps" />
      <Stack.Screen name="dataWater" />
      <Stack.Screen name="homePage" />
      <Stack.Screen name="index" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="signUp" />
      <Stack.Screen name="signIn" />
    </Stack>
  );
}
