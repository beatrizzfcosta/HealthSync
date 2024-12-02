import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../app/signIn';
import SignUpScreen from '../app/signUp'
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
      <Stack.Screen name="Sign In" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
