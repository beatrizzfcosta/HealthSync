import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from '@react-native-firebase/database';

//Configurações para acessar à firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDPlJKK7rGgUBnDWe21D24XhzI4tOfg4rQ',
  authDomain: 'healthsync-7b1b5.firebaseapp.com',
  projectId: 'healthsync-7b1b5',
  storageBucket: 'healthsync-7b1b5.firebasestorage.app',
  messagingSenderId: '152216370944',
  appId: '1:152216370944:web:05d2b4c73957d350a8bde5',
};
//Inicializar a firebase com os dados fornecidos
export const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
console.log(FIREBASE_AUTH);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

export const FIREBASE_REALTIME_DB = getDatabase();
