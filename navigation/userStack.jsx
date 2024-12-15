import React from 'react';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { theme } from '../assets/theme';
import ProfileScreen from '../app/profile';
import DataWaterScreen from '../app/dataWater';
import DataStepsScreen from '../app/dataSteps';
import AlertSettingsScreen from '../app/alerts';
import HomeSettingScreen from '../app/homePage';
import StepsScreen from '../app/dataSteps';
import ActivityScreen from '../app/dataActivities';
import HomeScreen from '../app/homePage';
import WeightInScreen from '../app/weightIn';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
//const Tab = createBottomTabNavigator();

// function TabNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: { backgroundColor: theme.colorLightBrown },
//         tabBarActiveTintColor: theme.colorDarkBrown,
//         tabBarInactiveTintColor: 'black',
//       }}
//     >
//       <Tab.Screen
//         name="Perfil"
//         component={HomeScreen}
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <MaterialCommunityIcons
//               name="account"
//               size={24}
//               color={focused ? theme.colorDarkBrown : 'black'}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Medicamentos"
//         component={ProfileScreen} // Exemplo corrigido para evitar erro de referência.
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <MaterialCommunityIcons
//               name="pill"
//               size={24}
//               color={focused ? theme.colorDarkBrown : 'black'}
//             />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

export default function UserStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="DataWater" component={DataWaterScreen} />
      <Stack.Screen name="DataSteps" component={DataStepsScreen} />
      <Stack.Screen name="AlertSettings" component={AlertSettingsScreen} />
      <Stack.Screen name="HomeSettings" component={HomeSettingScreen} />
      <Stack.Screen name="Steps" component={StepsScreen} />
      <Stack.Screen name="Activity" component={ActivityScreen} />
      <Stack.Screen name="WeightIn" component={WeightInScreen} />
    </Stack.Navigator>
  );
}
