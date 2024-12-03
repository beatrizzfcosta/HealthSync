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
import { theme } from '@/assets/theme';

export default function LoginPage({ navigation }: { navigation: any }) {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Função que faz o login com email e password do utilizador e se assim for navegar para a homePage

  /**const handleHomePage = async () => {
    try {
      await auth().signInWithEmailAndPassword(mail, password);
      console.log('autenticado');

    } catch (error) {
      console.error("Erro ao autenticar:", error);
      setErrorMessage('Senha ou email incorretos, tente novamente.');
    }
  };*/
  // Navegação para a página Index
  //const handleIndex = () => {
  /*  Alert.alert(
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
                    navigation.navigate('index')
                },
            },
        ],
        { cancelable: true }
    );
}
*/
  // Navegação para página de registo
  const handleRegisto = () => {
    navigation.navigate('Sign Up');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={'#fff'}
        barStyle={'dark-content'}
        hidden={false}
      />
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

      <TouchableOpacity style={styles.button}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  icon: {
    alignSelf: 'flex-start',
    marginLeft: 45,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: 'Graduate',
  },
  containerTitle: {
    marginBottom: 20,
    alignItems: 'center',
    gap: 15,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 45,
    fontFamily: 'Graduate',
  },
  input: {
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 14,
    fontFamily: 'Graduate',
  },
  inputContainer: {
    width: 300,
    paddingLeft: 0,
    paddingRight: 0,
  },
  button: {
    marginTop: 30,
    backgroundColor: theme.colorDarkGreen,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    width: 200,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Graduate',
  },
  registerText: {
    color: '#000',
    textDecorationLine: 'underline',
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    alignItems: 'center',
    padding: 10,
  },
});
