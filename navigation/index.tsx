import React from 'react';
import { useAuth } from '../hooks/useAuth';
import AuthStack from './authStack';
import UserStack from './userStack';
import { NavigationContainer } from '@react-navigation/native';

export default function RootNavigation() {
  const { user } = useAuth();
  console.log(user);
  //No caso de o utlizador estiver ativo, vai ter o acesso a Screens da aplicação, se não só terá acesso a screens para criar a conta ou fazer login
  return (
    <NavigationContainer>
      {user ? <UserStack /> : <AuthStack />}
    </NavigationContainer>
  )
}
