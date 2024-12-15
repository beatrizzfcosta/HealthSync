import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  View,
} from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';
import RootNavigation from '../navigation/index';
import * as Font from 'expo-font';
import {
  FIREBASE_APP,
  FIREBASE_AUTH,
  FIREBASE_DB,
  FIREBASE_REALTIME_DB,
} from '../config/healthsyncConfig';
import { theme } from '../assets/theme';
async function setupNotificationChannel() {
  await notifee.createChannel({
    id: 'Reminder',
    name: 'Alarm Reminders',
    importance: AndroidImportance.HIGH,
    sound: 'alarm',
  });
}

export default function Index() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function initializeApp() {
      try {
        // Testar se o Firebase foi inicializado corretamente
        console.log('Firebase App:', FIREBASE_APP);
        console.log('Firebase Auth:', FIREBASE_AUTH);
        console.log('Firebase Firestore:', FIREBASE_DB);
        console.log('Firebase Realtime DB:', FIREBASE_REALTIME_DB);

        // Configurar notificações
        await setupNotificationChannel();

        // Carregar fontes personalizadas
        await Font.loadAsync({
          Graduate: require('../assets/fonts/Graduate-Regular.ttf'),
        });

        setFontLoaded(true);
      } catch (error) {
        console.error('Erro ao inicializar o aplicativo:', error);
      }
    }

    initializeApp();
  }, []);

  if (!fontLoaded) {
    // Mostrar um indicador de carregamento enquanto as fontes não carregam
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    //Abrir a RootNavigation para verificar se o utilizador está ativo
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, marginTop: 40 }}
    >
      <RootNavigation />
    </KeyboardAvoidingView>
  );
}
