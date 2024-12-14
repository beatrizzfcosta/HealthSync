// React
import React from 'react';
import { useEffect, useState } from 'react';

// Components
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal,
  Alert,
  Image,
  Button,
  TextInput,
} from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Input } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';

// Database
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Internals
import { styles } from './styles/profileStyles';
import { Platform } from 'react-native';
import { theme } from '../assets/theme';

import * as Font from 'expo-font';

export default function Perfil({ navigation }: { navigation: any }) {
  // Estados para definir quais campos estão em modo de edição
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    birthDate: false,
    height: false,
    startingWeight: false,
    targetWeight: false,
    fitnessLevel: false,
  });

  // Estados para armazenar dados do usuário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [height, setHeight] = useState('');
  const [startingWeight, setStartingWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('');

  const [fontLoaded, setFontLoaded] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [userProfilePicture, setUserProfilePicture] = useState<string | null>(
    null
  );

  const [isFitnessLevelFocus, setIsFitnessLevelFocus] = useState(false);

  // Níveis de atividade disponíveis
  const activityLevels = [
    { label: 'Sedentário', value: 'sedentary' },
    { label: 'Levemente Ativo: 1-2/semana', value: 'lightly_active' },
    { label: 'Moderadamente Ativo: 3-4/semana', value: 'moderately_active' },
    { label: 'Muito Ativo: 5-6/semana', value: 'very_active' },
    { label: 'Extremamente Ativo: 6-7/semana', value: 'extremely_active' },
  ];

  const [showDatePicker, setShowDatePicker] = useState(false);

  // Font loader
  useEffect(() => {
    Font.loadAsync({
      Graduate: require('../assets/fonts/Graduate-Regular.ttf'),
    })
      .then(() => setFontLoaded(true))
      .catch((error) => console.error('Error loading fonts:', error));
  }, []);

  console.log('22222222222222222222');

  // Function to get user data from database
  const fetchUserData = async () => {
    try {
      const user = auth().currentUser;
      if (!user) throw new Error('User not authenticated');

      const userId = user.uid;
      const userRef = firestore().collection('users').doc(userId);
      const dataCollection = await userRef.collection('data').get();

      // Check if user's data obj is empty
      if (!dataCollection.empty) {
        const userInfo = dataCollection.docs[0].data();

        // If userInfo then set all the data on the appropriate fields
        if (userInfo) {
          setName(userInfo.username || '');
          setEmail(user.email || '');
          setHeight(userInfo.height || '');
          setStartingWeight(userInfo.formattedWeights.weight || '');
          setTargetWeight(userInfo.targetWeight.weight || '');
          setPhotoUrl(userInfo.profilePhotoUrl || null);
          setFitnessLevel(userInfo.activityLevel || '');

          if (
            userInfo.formatBirthDate &&
            userInfo.formatBirthDate.includes('/')
          ) {
            const [day, month, year] = userInfo.formatBirthDate
              .split('/')
              .map(Number);
            setBirthDate(new Date(year, month - 1, day));
          } else {
            setBirthDate(new Date());
          }
        }
      } else {
        console.warn("No document found for user's data collection object");
      }
    } catch (error) {
      console.error('Error fething user data:', error);
    }
  };

  // useEffect para buscar os dados quando o componente for montado
  useEffect(() => {
    fetchUserData();
  }, []);

  /* Função para salvar as atualizações do perfil do usuário
  const handleSave = async () => {
    Alert.alert(
      'Confirmação',
      'Deseja mesmo fazer essa atualização?',
      [
        {
          text: 'Não',
          onPress: () => console.log('Atualização cancelada'),
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            try {
              const user = auth().currentUser;
              if (!user) throw new Error('Utilizador não autenticado');
          
              const userId = user.uid;
              const userRef = firestore().collection('users').doc(userId);
          
              // Obtendo a subcoleção 'data'
             const dataCollection = await userRef.collection('data').get();
          
              if (!dataCollection.empty) {
                // Atualiza o primeiro documento encontrado na subcoleção 'data'
                const docId = dataCollection.docs[0].id;
          
                // Formata a data de nascimento antes de salvar

                if (height && weight && birthDate) {
                  await userRef.collection('data').doc(docId).update({
                    username,
                    gender,
                    birthDate,
                    height: parseFloat(height),
                    weight: parseFloat(weight),
                    activityLevel,
                    profilePhotoUrl: photoUrl // Atualizar a foto de perfil
                  });
                } else {
                  console.warn('Por favor, preencha todos os campos antes de salvar.');
                }
          
                console.log('Dados atualizados com sucesso');
          
                // Atualiza os dados do estado chamando novamente o `fetchUserData`
                fetchUserData();
          
                // Redefine `isEditing` para `false` após salvar os dados
                setIsEditing({
                  username: false,
                  gender: false,
                  birthDate: false,
                  height: false,
                  weight: false,
                  activityLevel: false,
                });

                // Navega para a homepage após salvar
                // navigation.navigate('homePage');
              } else {
                console.warn('Nenhum documento encontrado na subcoleção "data" do usuário para atualizar');
              }
            } catch (error) {
              console.error('Erro ao atualizar os dados do usuário:', error);
            }
          },
        },
      ]
    );
  };*/

  /* Função para voltar à página inicial com confirmação
  const handleHomePage = () => {
    Alert.alert(
      'Nenhuma atualização será feita',
      'Deseja mesmo voltar a página inicial?',
      [
        {
          text: 'Não',
          onPress: () => console.log('Atualização cancelada'),
          style: 'cancel',
        },
        {
          text: "sim",
          onPress: () => navigation.navigate('homePage'),
        }
        ])
  };*/

  // Função para adicionar foto de perfil
  /*
  const handleAddProfilePhoto = async () => {
    try {
      if (Platform.OS === 'android') {
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Desculpe, precisamos da permissão para acessar suas fotos!');
          return;
        }

        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraStatus !== 'granted') {
          alert('Desculpe, precisamos da permissão para acessar a câmera!');
          return;
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        console.log('Imagem selecionada:', result.assets[0].uri);
        setPhotoUrl(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Erro ao selecionar a foto de perfil:', error);
    }
  };*/

  function handleDataSaveAndExit() {
    Alert.alert(
      'Saving and exit',
      'Do you really wish to save and return to home screen?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => navigation.navigate('Home'),
        },
      ]
    );
  }

  function handleSignOut() {
    Alert.alert('End Session', 'Do you really wish to end your session?', [
      {
        text: 'No',
        onPress: () => console.log('Atualização cancelada'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          try {
            await auth().signOut();
            navigation.navigate('Sign In');
          } catch (error) {
            console.error('Error loging out the user:', error);
          }
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {userProfilePicture ? (
          <Image
            source={{ uri: userProfilePicture }}
            style={styles.profileImage}
          />
        ) : (
          <FontAwesome
            name="user-circle"
            size={125}
            color={theme.colorDarkGreen}
          />
        )}

        <View style={styles.detailsContainer}>
          <Text style={styles.secText}>Nome</Text>

          <Text style={styles.secText}>Email</Text>
        </View>
      </View>

      <View style={styles.inputsOutsideContainer}>
        <Text
          style={{
            paddingTop: 15,
            textAlign: 'left',
            fontFamily: 'Graduate',
            fontSize: 20,
            color: theme.colorDarkGreen,
            width: '90%',
          }}
        >
          Personal Details
        </Text>

        <View style={styles.inputsInsideContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              value={name}
              placeholder={`Name`}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              value={birthDate.toISOString().split('T')[0]}
              placeholder={`Birth Date`}
              editable={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput value={height} placeholder={`Height`} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput value={startingWeight} placeholder={`Starting weight`} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput value={targetWeight} placeholder={`Target weight`} />
          </View>

          <View style={styles.inputContainer}>
            <Dropdown
              //style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              data={activityLevels}
              labelField="label"
              valueField="value"
              placeholder={
                !isFitnessLevelFocus ? 'Select Fitness Level' : '...'
              }
              value={fitnessLevel}
              onFocus={() => setIsFitnessLevelFocus(true)}
              onBlur={() => setIsFitnessLevelFocus(false)}
              onChange={(item: any) => {
                setFitnessLevel(item.value);
                setIsFitnessLevelFocus(false);
              }}
            />
          </View>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleDataSaveAndExit}>
          <Text style={styles.buttonText}>Save & Leave</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
