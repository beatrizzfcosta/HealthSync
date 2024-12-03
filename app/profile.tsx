import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Modal, Alert, Image, Button } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Input } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import DatePicker from 'react-native-date-picker';
import { Platform } from 'react-native';
import { theme } from '@/assets/theme';

export default function Perfil() {
  
  // Estados para definir quais campos estão em modo de edição
  const [isEditing, setIsEditing] = useState({
    username: false,
    gender: false,
    birthDate: false,
    height: false,
    weight: false,
    activityLevel: false,
  });

  // Estados para armazenar dados do usuário
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState<string>('');

  // Opções de gênero disponíveis
  const genders = [
    { label: 'Masculino', value: 'masculino' },
    { label: 'Feminino', value: 'feminino' },
    { label: 'Outro', value: 'outro' },
  ];

  const [activityLevel, setActivityLevel] = useState<string>('');
  
  // Níveis de atividade disponíveis
  const activityLevels = [
    { label: 'Sedentário', value: 'sedentary' },
    { label: 'Levemente Ativo: 1-2/semana', value: 'lightly_active' },
    { label: 'Moderadamente Ativo: 3-4/semana', value: 'moderately_active' },
    { label: 'Muito Ativo: 5-6/semana', value: 'very_active' },
    { label: 'Extremamente Ativo: 6-7/semana', value: 'extremely_active' },
  ];

  const [dri, setDri] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // Função para buscar dados do usuário no Firestore
  const fetchUserData = async () => {
    console.log('useEffect executado - buscando dados do usuário');
    try {
      const user = auth().currentUser;
      if (!user) throw new Error('Utilizador não autenticado');
  
      const userId = user.uid;
      const userRef = firestore().collection('users').doc(userId);
  
      // Obtém a subcoleção 'data' do usuário
      const dataCollection = await userRef.collection('data').get();
  
      // Verifica se há documentos na subcoleção 'data'
      if (!dataCollection.empty) {
        const userInfo = dataCollection.docs[0].data();
        console.log('Dados do usuário:', userInfo);
  
        if (userInfo) {
           // Define os dados no estado com os valores recuperados
          setUsername(userInfo.username || '');
          setGender(userInfo.gender || '');
          // Verifica se a data de nascimento está formatada e define `birthDate`
          if (userInfo.formatBirthDate && userInfo.formatBirthDate.includes('/')) {
            const [day, month, year] = userInfo.formatBirthDate.split('/').map(Number);
            setBirthDate(new Date(year, month - 1, day));
          } else {
            setBirthDate(new Date());
          }

          setHeight(userInfo.height?.toString() || '');
          setWeight(userInfo.weight?.toString() || '');
          setActivityLevel(userInfo.activityLevel || '');
          setPhotoUrl(userInfo.profilePhotoUrl || '');
  
        }
      } else {
        console.warn('Nenhum documento encontrado na subcoleção "data" do usuário');
      }
    } catch (error) {
      console.error('Erro ao buscar os dados do usuário:', error);
    }
  };
  
  // Função para salvar as atualizações do perfil do usuário
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
  };
  
  // useEffect para buscar os dados quando o componente for montado
  useEffect(() => {
    fetchUserData();
  }, []);

  // Função para confirmar a data de nascimento
  const handleConfirm = () => {
    // Verifica se a data está corretamente definida e atualiza o estado
    if (birthDate) {
      setShowDatePicker(false); // Fecha o modal
      console.log('Data de nascimento selecionada:', birthDate);
    } else {
      console.warn('Nenhuma data de nascimento selecionada');
    }
  };

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
  
  /* Função para adicionar foto de perfil
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
  };

*/
 // Função para deslogar o usuário com confirmação
  const handleLogOut = () => {

    Alert.alert(
      'Terminar Sessão',
      'Deseja mesmo terminar sessão?',
      [
        {
          text: 'Não',
          onPress: () => console.log('Atualização cancelada'),
          style: 'cancel',
        },
        {
          text: "sim",
          onPress: async () => 
          {
            try {
              await auth().signOut();
              console.log('Usuário deslogado com sucesso');
              //navigation.navigate('index');
            } catch (error) {
              console.error('Erro ao deslogar o usuário:', error);
            }
          }
        }
        ])
  };

  // Função para alternar o estado de edição de um campo específico
  const handleEditToggle = (field: keyof typeof isEditing) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };


  return (
    <View style={styles.container}>
      
      <View style={styles.imageContainer}>
        <View></View>
      </View>
      
      <View style={styles.inputsContainer}>
        <View style={styles.inputContainer}></View>
        <View style={styles.inputContainer}></View>
        <View style={styles.inputContainer}></View>
        <View style={styles.inputContainer}></View>
        <View style={styles.inputContainer}></View>
        <View style={styles.inputContainer}></View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colorLightGreen,
    alignItems:'center',
    height: '100%',
    width: '100%',
    flex:1
  },

  imageContainer: {
    backgroundColor: 'black',
    width: '90%',
    height: '30%',
  },

  inputsContainer: {
    backgroundColor: 'green',
    height: '50%',
    width: '90%',
    justifyContent: 'space-evenly', 
    alignItems: 'center',      
    flexDirection: 'column',      
  },

  buttonsContainer: {
    backgroundColor: 'red',
    height: '20%',
    width: '90%',
    justifyContent: 'space-evenly', 
    alignItems: 'center',      
    flexDirection: 'column',      
  },

  button: {
    borderRadius: 10,
    height: '30%',
    width: '80%',
    alignItems: 'center', 
    backgroundColor: theme.colorDarkGreen,
    justifyContent: 'center',
  },

  buttonText: {
    color: theme.colorLightGreen,
    fontSize: 14,
    fontFamily: 'Graduate'
  },

  inputContainer: {
    backgroundColor: 'white',
    height: '10%',
    width: '80%',
  },
});
