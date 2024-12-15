import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import { Input } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
import { theme } from '../assets/theme';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import DatePicker from 'react-native-date-picker';
import { formatDate } from '../components/formatDate'; // Ajuste o caminho conforme necessário
import { styles } from './styles/signUpStyles';
import { calculateWaterGoal } from '../utils/waterQuantity';
export default function RegisterScreen({ navigation }: { navigation: any }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState<string>('');
  const genders = [
    { label: 'Masculino', value: 'masculino' },
    { label: 'Feminino', value: 'feminino' },
    { label: 'Outro', value: 'outro' },
  ];
  const [activityLevel, setActivityLevel] = useState<string>('');
  const activityLevels = [
    { label: 'Sedentário', value: 'sedentary' },
    { label: 'Levemente Ativo: 1-2/semana', value: 'lightly_active' },
    { label: 'Moderadamente Ativo: 3-4/semana', value: 'moderately_active' },
    { label: 'Muito Ativo: 5-6/semana', value: 'very_active' },
    { label: 'Extremamente Ativo: 6-7/semana', value: 'extremely_active' },
  ];

  const handleConfirm = (selectedDate: Date) => {
    setBirthDate(selectedDate);
    setShowDatePicker(false);
  };

  // Adiciona um novo utilizador a base de dados
  const handleRegister = async () => {
    console.log('entrei');

    if (password !== confirmPassword) {
      console.error('As senhas não correspondem.');
      // Aqui você pode exibir um alerta ou uma mensagem de erro para o usuário
      return;
    }

    try {
      const auth = getAuth();
      console.log(auth);
      console.log('Email:', email);
      // Cria o usuário com e-mail e senha
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const formatBirthDate = formatDate(birthDate);
      // Calcula o DRI antes de armazenar
      const currentDate = new Date().toISOString().split('T')[0];
      // Referência ao documento do usuário
      const userRef = firestore().collection('users').doc(user.uid);
      const formattedWeights = [
        {
          weight: `${weight}`, // ou Number(weight)
          date: currentDate,
        },
      ];
      console.log('Pesos formatados:', formattedWeights);

      const stepsInfo = [
        {
          steps: 0,
          date: currentDate,
          dailyGoal: 10000,
        },
      ];
      const activityInfo = [
        {
          activity: [],
          time: 0,
          Calories: 0,
        },
      ];
      const waterInfo = [
        {
          water: 0,
          date: currentDate,
          dailyGoal: calculateWaterGoal(birthDate, parseFloat(weight)),
        },
      ];

      const targetWeight = [
        {
          weight: `${weight}`,
        },
      ];

      // Adiciona dados adicionais em uma subcoleção
      await userRef.collection('data').add({
        username,
        formatBirthDate,
        targetWeight,
        height,
        formattedWeights,
        gender,
        activityLevel,
        stepsInfo,
        waterInfo,
        activityInfo,
      });

      // Adicção das Refeições defaults para o utilizador

      navigation.navigate('Sign In');
      console.log('Registrado com sucesso');
      // Redirecionar para outra tela, se necessário
    } catch (error) {
      console.error('Erro ao registrar:', error);
      // Você pode adicionar uma mensagem de erro para o usuário aqui
    }
  };

  const _renderItem = (item: {
    label:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | React.ReactPortal
      | null
      | undefined;
  }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  // Verifica de todos os dados foram preenchidos

  const isFormValid = () => {
    return (
      username &&
      email &&
      gender &&
      birthDate &&
      height &&
      weight &&
      password == confirmPassword
    );
  };

  const handleRegisto = () => {
    if (isFormValid()) {
      Alert.alert(
        'Seus dados estão correctos?',
        'Bem vindo a Calorize!',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Registar',
            onPress: () => {
              handleRegister();
            },
          },
        ],
        { cancelable: true }
      );
    } else {
      Alert.alert(
        'Atenção',
        'Todos os campos são obrigatórios. Preencha todos os campos antes de adicionar.'
      );
    }
  };

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

  const renderContent = () => (
    <View style={styles.contentContainer}>
      <TouchableOpacity style={styles.icon}>
        <FontAwesome
          name="arrow-left"
          size={24}
          color="black"
          onPress={() => navigation.navigate('Sign In')}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Registo</Text>
      <Text style={styles.label}>Nome</Text>
      <Input
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        placeholder="Insira o username"
        placeholderTextColor="#a3a19e"
        value={username}
        onChangeText={setUsername}
        leftIcon={
          <FontAwesome
            name="user"
            size={24}
            color={theme.colorDarkGreen}
            style={{ marginRight: 5 }}
          />
        }
      />
      <Text style={styles.label}>E-mail</Text>
      <Input
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        placeholder="Insira o seu e-mail"
        placeholderTextColor="#a3a19e"
        value={email}
        onChangeText={setEmail}
        leftIcon={
          <FontAwesome
            name="envelope"
            size={24}
            color={theme.colorDarkGreen}
            style={{ marginRight: 5 }}
          />
        }
      />
      <Text style={styles.label}>Género</Text>
      <View style={styles.dropdownWrapper}>
        <Dropdown
          data={genders}
          value={gender}
          placeholder="Selecione o género"
          placeholderStyle={styles.placeholder}
          style={[styles.dropdown, styles.inputContainer]}
          onChange={(item) => {
            setGender(item.value);
            console.log('selected', item);
          }}
          renderLeftIcon={() => (
            <FontAwesome
              name="venus-mars"
              size={24}
              color={theme.colorDarkGreen}
              style={{ marginRight: 5 }}
            />
          )}
          renderItem={_renderItem}
          labelField={'label'}
          valueField={'value'}
        />
      </View>

      <Text style={styles.label}>Data de Nascimento</Text>
      <TouchableOpacity
        style={styles.dateInputContainer}
        onPress={() => setShowDatePicker(true)}
      >
        <FontAwesome
          name="calendar"
          size={24}
          color={theme.colorDarkGreen}
          style={{ marginRight: 5 }}
        />
        <Text style={styles.dateText}>
          {birthDate.toLocaleDateString('pt-PT')}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.pickerContainer}>
            <DatePicker
              date={birthDate}
              onDateChange={setBirthDate}
              maximumDate={new Date()} // Define o máximo como hoje para impedir datas futuras
              mode="date"
            />
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => handleConfirm(birthDate)}
            >
              <Text style={styles.confirmButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.rowContainer}>
        <View style={styles.columnContainer}>
          <Text style={styles.label}>Altura</Text>
          <Input
            inputStyle={styles.input}
            placeholder="cm"
            placeholderTextColor="#a3a19e"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
            leftIcon={
              <FontAwesome
                name="arrows-v"
                size={24}
                color={theme.colorDarkGreen}
                style={{ marginRight: 5 }}
              />
            }
          />
        </View>

        <View style={styles.columnContainer}>
          <Text style={styles.label}>Peso</Text>
          <Input
            inputStyle={styles.input}
            placeholder="kg"
            placeholderTextColor="#a3a19e"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            leftIcon={
              <FontAwesome
                name="balance-scale"
                size={24}
                color={theme.colorDarkGreen}
                style={{ marginRight: 5 }}
              />
            }
          />
        </View>
      </View>

      <Text style={styles.label}>Password</Text>
      <Input
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        placeholder="Insira a password"
        placeholderTextColor="#a3a19e"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        leftIcon={
          <FontAwesome
            name="lock"
            size={24}
            color={theme.colorDarkGreen}
            style={{ marginRight: 5 }}
          />
        }
      />

      <Text style={styles.label}>Confirmar Password</Text>
      <Input
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        placeholder="Confirmar a password"
        placeholderTextColor="#a3a19e"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        leftIcon={
          <FontAwesome
            name="lock"
            size={24}
            color={theme.colorDarkGreen}
            style={{ marginRight: 5 }}
          />
        }
      />

      <TouchableOpacity style={styles.button} onPress={handleRegisto}>
        <Text style={styles.buttonText}>Registar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={[{ key: 'formContent' }]}
      renderItem={renderContent}
      keyExtractor={(item) => item.key}
      contentContainerStyle={styles.scrollContainer}
    />
  );
}
