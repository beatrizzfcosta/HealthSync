import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
//import notifee, { AndroidImportance } from '@notifee/react-native';
import RootNavigation from '../navigation/index';

// async function setupNotificationChannel() {
//   await notifee.createChannel({
//     id: 'Reminder',
//     name: 'Medication Reminders',
//     importance: AndroidImportance.HIGH,
//     sound: 'alarm',
//   });
// }

export default function Index() {
  // useEffect(() => {
  //   setupNotificationChannel();
  // }, []);

  return (
    //Abrir a RootNavigation para verificar se o utilizador está ativo
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <RootNavigation />
    </KeyboardAvoidingView>
  );
}
