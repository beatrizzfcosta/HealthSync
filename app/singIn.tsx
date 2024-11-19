import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Dimensions, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Input } from 'react-native-elements';
const { width: screenWidth } = Dimensions.get('window');


const LoginPage = ({ navigation }: { navigation: any }) => {
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
                    navigation.navigate('index')
                },
            },
        ],
        { cancelable: true }
    );
}

  // Navegação para página de registo
  const handleRegisto = () => {
    navigation.navigate('registo');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={'#fff'}
        barStyle={'dark-content'}
        hidden={false}
      />
      <TouchableOpacity style={styles.icon} onPress={handleIndex}>
                <FontAwesome name='arrow-left'
                        size={24}
                        color='black'/>
            </TouchableOpacity>
      <Text style={styles.title}>Login</Text>

      <Text style={styles.label}>Email</Text>
      <Input
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        placeholder='Insira o email'
        placeholderTextColor="#a3a19e"
        value={mail}
        onChangeText={setMail}
        leftIcon={
          <FontAwesome
            name='user'
            size={24}
            color='#c6f000'
          />
        }
      />

      <Text style={styles.label}>Password</Text>
      <Input
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        placeholder='Insira a password'
        placeholderTextColor="#a3a19e"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        leftIcon={
          <FontAwesome
            name='lock'
            size={24}
            color='#c6f000'
          />
        }
      />

      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}

      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRegisto}>
        <Text style={styles.registerText}>Ainda não tenho conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  icon:{
    alignSelf: 'flex-start',
    marginLeft:45,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 45,
  },
  input: {
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  inputContainer: {
    width: 300,
    paddingLeft: 0,
    paddingRight: 0,
  },
  waveContainerBottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  button: {
    backgroundColor: '#c6f000',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    width: 200,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#000',
    textDecorationLine: 'underline',
  },
  errorMessage:{
    color: 'red',
    fontSize: 14,
    alignItems: 'center',
    padding:10
  }
});

export default LoginPage;
