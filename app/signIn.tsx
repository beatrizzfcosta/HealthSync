import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Input } from 'react-native-elements';
import { theme } from '../assets/theme';
import { styles } from './styles/signInStyles';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
export default function LoginPage({ navigation }: { navigation: any }) {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Função que faz o login com email e password do utilizador e se assim for navegar para a homePage

  const handleHomePage = async () => {
    try {
      await auth().signInWithEmailAndPassword(mail, password);
      console.log('autenticado');
      navigation.replace('Home');
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      setErrorMessage('Senha ou email incorretos, tente novamente.');
    }
  };
  // Navegação para a página Index
  const handleIndex = () => {
    Alert.alert(
      'Index',
      'Deseja voltar ao index?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Voltar',
          onPress: () => {
            navigation.navigate('index');
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Navegação para página de registo
  const handleRegisto = () => {
    navigation.navigate('Sign Up');
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Welcome to{'\n'}HealthSync</Text>
        <FontAwesome5 name="heartbeat" size={35} color={theme.colorDarkGreen} />
      </View>
      <Text style={styles.label}>Email</Text>
      <Input
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#a3a19e"
        value={mail}
        onChangeText={setMail}
        leftIcon={
          <FontAwesome name="user" size={24} color={theme.colorDarkGreen} />
        }
      />

      <Text style={styles.label}>Password</Text>
      <Input
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#a3a19e"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        leftIcon={
          <FontAwesome name="lock" size={24} color={theme.colorDarkGreen} />
        }
      />

      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleHomePage}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.registerText} onPress={handleRegisto}>
          Don't have an account yet? Sign up here!
        </Text>
      </TouchableOpacity>
    </View>
  );
}
