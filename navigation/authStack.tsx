import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../app/signIn';
import SignUpScreen from '../app/signUp';
import ProfileScreen from '../app/profile';
import DataWaterScreen from '../app/dataWater';
import DataStepsScreen from '../app/dataSteps';
import AlertSettingsScreen from '../app/alerts';

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
      <Stack.Screen name="Sign Up" component={AlertSettingsScreen} />
    </Stack.Navigator>
  );
}
