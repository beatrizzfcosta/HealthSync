import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../app/signIn';
import SignUpScreen from '../app/signUp';
import InicioScreen from '../app/inicio';
import { NavigationContainer } from '@react-navigation/native';

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
        <Stack.Screen name="Inicio" component={InicioScreen} />
        <Stack.Screen name="Sign In" component={SignInScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
      </Stack.Navigator>
  );
}
