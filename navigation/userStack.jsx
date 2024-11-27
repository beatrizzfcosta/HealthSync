import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import PillScreen from '../screens/Pills';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import PermissionScreen from '../screens/Permission';
import RegisterPillsScreen from '../screens/RegisterPills';
import { theme } from '../assets/theme';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.colorLightBrown },
        tabBarActiveTintColor: theme.colorDarkBrown,
        tabBarInactiveTintColor: 'black',
      }}
    >
      <Tab.Screen
        name="Perfil"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account"
              size={24}
              color={focused ? theme.colorDarkBrown : 'black'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Medicamentos"
        component={PillScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="pill"
              size={24}
              color={focused ? theme.colorDarkBrown : 'black'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function UserStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="Permission" component={PermissionScreen} />
      <Stack.Screen name="RegisterPills" component={RegisterPillsScreen} />
      <Stack.Screen name="Pills" component={TabNavigator} />
    </Stack.Navigator>
  );
}
