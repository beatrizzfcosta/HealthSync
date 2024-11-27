import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../app/singIn';
const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: '#0e1529',
        },
        headerShown: false,
      }}
    >
      <Stack.Screen name="Sign In" component={SignInScreen} />
    </Stack.Navigator>
  );
}
