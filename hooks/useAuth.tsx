import { useState, useEffect } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

//Funcao para receber as informaces do utilizador
export function useAuth() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return {
    user,
    loading: initializing,
  };
}
