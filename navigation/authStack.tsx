import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../app/signIn';
import SignUpScreen from '../app/signUp';
import InicioScreen from '../app/inicio';
import DataWaterScreen from '../app/dataWater';
import DataStepsScreen from '../app/dataSteps';
import AlertSettingsScreen from '../app/alerts';
import HomeSettingScreen from '../app/homePage';
import StepsScreen from '../app/dataSteps';
import ActivityScreen from '../app/dataActivities';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}
