import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Modal, Alert, Image } from 'react-native';
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
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Perfil</Text>
        <TouchableOpacity>
          <FontAwesome name="check" size={24} color="black"  />
        </TouchableOpacity>
      </View>
      <View style={styles.profileImageContainer}>
        <View style={styles.profileImage}> 
          {photoUrl ? ( <Image source={{ uri: photoUrl }} style={{ width: 150, height: 150, borderRadius: 75 }} /> ) : ( <FontAwesome name="user-circle" size={150} color={theme.colorDarkGreen} /> )}
        </View>
        <TouchableOpacity >
          <View style={styles.photoAdd}>
            <FontAwesome name="camera" size={24} color={theme.colorDarkGreen} />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <View style={styles.inputRowColumn}>
            <View style={styles.inputRowWithButton}>
              <Text style={styles.label}>Username</Text>
              <TouchableOpacity onPress={() => handleEditToggle('username')}>
                <FontAwesome name="edit" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <Input
              containerStyle={styles.inputContainer}
              inputStyle={[styles.input, { color: isEditing.username ? 'black' : '#a3a19e' }]}
              value={username}
              editable={isEditing.username}
              onChangeText={(value) => setUsername(value)}
              leftIcon={
                <FontAwesome name="user" size={24} color={theme.colorDarkGreen} style={{ marginRight: 5 }} />
              }
            />
          </View>
          <View style={styles.inputDropdown}>
            <View style={styles.inputRowColumn}>
              <View style={styles.inputRowWithButton}>
                <Text style={styles.label}>Genêro</Text>
                <TouchableOpacity onPress={() => handleEditToggle('gender')}>
                  <FontAwesome name="edit" size={20} color="black" />
                </TouchableOpacity>
              </View>
              <Dropdown
                data={genders}
                value={gender}
                placeholder="Selecione o genêro"
                placeholderStyle={{
                  color: isEditing.gender ? 'black' : '#a3a19e',
                  fontSize: 14,
                }}
                style={[styles.dropdown, styles.inputContainer]}
                onChange={(item) => setGender(item.value)}
                renderLeftIcon={() => (
                  <FontAwesome name="venus-mars" size={24} color={theme.colorDarkGreen} style={{ marginRight: 5 }} />
                )}
                disable={!isEditing.gender} labelField={'label'} valueField={'value'} />
            </View>
          </View>
          <View style={styles.inputRowColumn}>
            <View style={styles.inputRowWithButton}>
              <Text style={styles.label}>Data de Nascimento</Text>
              <TouchableOpacity onPress={() => handleEditToggle('birthDate')}>
                <FontAwesome name="edit" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.dateInputContainer} onPress={() => isEditing.birthDate && setShowDatePicker(true)}>
              <FontAwesome name='calendar' size={24} color={theme.colorDarkGreen} style={{ marginRight: 5}} />
              <Text style={styles.dateText}>
                {birthDate.toLocaleDateString('pt-PT')}
              </Text>
            </TouchableOpacity>
          </View>

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
                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                  <Text style={styles.confirmButtonText}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View style={styles.rowContainer}>
            <View style={styles.columnContainer}>
              <View style={styles.inputRowColumn}>
                <View style={styles.inputRowWithButton}>
                  <Text style={styles.label}>Altura</Text>
                  <TouchableOpacity onPress={() => handleEditToggle('height')}>
                    <FontAwesome name="edit" size={20} color="black" />
                  </TouchableOpacity>
                </View>
                <Input
                  containerStyle={styles.inputContainer}
                  inputStyle={[styles.input, { color: isEditing.height ? 'black' : '#a3a19e' }]}
                  value={height}
                  editable={isEditing.height}
                  onChangeText={(value) => setHeight(value)}
                  keyboardType="numeric"
                  leftIcon={
                    <FontAwesome name="arrows-v" size={24} color={theme.colorDarkGreen} style={{ marginRight: 5 }} />
                  }
                />
              </View>
            </View>
            <View style={styles.columnContainer}>
              <View style={styles.inputRowColumn}>
                <View style={styles.inputRowWithButton}>
                  <Text style={styles.label}>Peso</Text>
                  <TouchableOpacity onPress={() => handleEditToggle('weight')}>
                    <FontAwesome name="edit" size={20} color="black" />
                  </TouchableOpacity>
                </View>
                <Input
                  containerStyle={styles.inputContainer}
                  inputStyle={[styles.input, { color: isEditing.weight ? 'black' : '#a3a19e' }]}
                  value={weight}
                  editable={isEditing.weight}
                  onChangeText={(value) => setWeight(value)}
                  keyboardType="numeric"
                  leftIcon={
                    <FontAwesome name="balance-scale" size={24} color={theme.colorDarkGreen} style={{ marginRight: 5 }} />
                  }
                />
              </View>
            </View>
          </View>
          <View style={styles.inputDropdown}>
            <View style={styles.inputRowColumn}>
              <View style={styles.inputRowWithButton}>
                <Text style={styles.label}>Nível de Atividade</Text>
                <TouchableOpacity onPress={() => handleEditToggle('activityLevel')}>
                  <FontAwesome name="edit" size={20} color="black" />
                </TouchableOpacity>
              </View>
              <Dropdown
                data={activityLevels}
                value={activityLevel}
                placeholder="Selecione o nível de atividade"
                placeholderStyle={{
                  color: isEditing.activityLevel ? 'black' : '#a3a19e',
                  fontSize: 14,
                }}
                style={[styles.dropdown, styles.inputContainer]}
                onChange={(item) => setActivityLevel(item.value)}
                renderLeftIcon={() => (
                  <FontAwesome name="heartbeat" size={24} color={theme.colorDarkGreen} style={{ marginRight: 5 }} />
                )}
                disable={!isEditing.activityLevel} labelField={'label'} valueField={'value'} />
            </View>
          </View>
          <View style={styles.inputRowColumn}>
              <Text style={styles.label}>Meta Calórica</Text>
            <Input
              containerStyle={styles.inputContainer}
              inputStyle={[styles.input, { color: isEditing.username ? 'black' : '#a3a19e' }]}
              value={dri}
              editable={false}
              onChangeText={(value) => setDri(value)}
              leftIcon={
                <MaterialCommunityIcons
                  name='fire'
                  size={30}
                  color='#c6f000'
                  style={{ marginRight: 5 }}
                />
              }
            />
          </View>
          <TouchableOpacity style={[styles.button, styles.buttonSelected]} onPress={handleSave}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonSelected]} onPress={handleLogOut}>
            <Text style={styles.buttonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colorLightGreen,
    alignItems:'center',
    flex:1
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    width:350,
    justifyContent:'space-between'
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
  },
  inputRowColumn: {
    width: '90%',
  },
  inputRowWithButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'flex-start',
    fontSize:16
  },
  inputContainer: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  input: {
    fontSize: 16,
  },
  dropdown: {
    padding: 10,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#86939e',
    backgroundColor: 'white',
  },
  placeholder: {
    color: '#a3a19e',
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    alignItems: 'center'
  },
  columnContainer: {
    alignItems: 'center',
    flex: 1,
  },
  button: {
    backgroundColor: '#c6f000',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    width: 200,
  },
  buttonSelected: {
    backgroundColor: '#c6f000',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputDropdown: {
    width: '100%',
    paddingBottom: 15,
    alignItems: 'center',
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#86939e',
    padding: 10,
    borderRadius: 5,
    marginBottom: 12,
    marginTop: 5
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButton: {
    marginTop: 10,
    backgroundColor: '#c6f000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  photoAdd:{
    backgroundColor: theme.colorLightGreen,
    padding:10,
    borderWidth:5,
    borderColor: theme.colorDarkGreen,
    borderRadius:50,
    marginTop:-40,
    marginLeft:70,
  },
  profileImage: {
    alignItems: 'center',
  },
  profileImageContainer: {
    alignItems: 'center',
  },
});
