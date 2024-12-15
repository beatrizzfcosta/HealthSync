import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
  Ionicons,
  FontAwesome,
  FontAwesome6,
  FontAwesome5,
} from '@expo/vector-icons';
import { theme } from '../assets/theme';
import * as Progress from 'react-native-progress';
import StepsSettingsModal from '../components/stepsSettings';
import { styles } from './styles/dataStepsStyles';
import { Accelerometer } from 'expo-sensors';
import { Constants } from 'expo-constants';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export default function StepsScreen({ navigation }: { navigation: any }) {
  const [steps, setSteps] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [lastTimestamp, setLastTimestamp] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(10000);
  const [userProfilePicture, setUserProfilePicture] = useState<string | null>(
    null
  );
  const [calories, setCalories] = useState(0); // Calorias queimadas
  const [distance, setDistance] = useState(0); // Distância percorrida
  const [userHeight, setUserHeight] = useState(170); // Altura do usuário (em cm)
  const [userGender, setUserGender] = useState('male'); // Gênero do usuário ('male' ou 'female')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProgress,setCurrentProgress] = useState(0);

  useEffect(() => {
    let subscription: { remove: any; };
    Accelerometer.isAvailableAsync().then((result) => {
      if (result) {
        subscription = Accelerometer.addListener((accelerometerData) => {
          const { y } = accelerometerData;
          const threshold = 0.1;
          const timestamp = new Date().getTime();

          if (
            Math.abs(y - lastY) > threshold &&
            !isCounting &&
            (timestamp - lastTimestamp > 800)
          ) {
            setIsCounting(true)
            setLastY(y)
            setLastTimestamp(timestamp)

            setSteps((prevSteps) => {
              const newSteps = prevSteps + 1;

              // Atualiza calorias e distância
              setCalories((prevCalories) => Math.floor(newSteps * 0.05));
              const strideLength =
                userGender === 'male'
                  ? (0.415 * userHeight) / 100000 // Altura convertida para km
                  : (0.413 * userHeight) / 100000; // Altura convertida para km
              setDistance((newSteps * strideLength)); // Distância já em km

              return newSteps;
            });

            setTimeout(() => {
              setIsCounting(false)
            }, 1200)
          }
        })
      } else {
        console.log("Accelerometer not avaiable on this device")
      }
    })
    return () => {
      if (subscription) {
        subscription.remove()
      }
    }
  }, [isCounting, lastY, lastTimestamp])

  const fetchSteps = async () => {
    try {
      console.log('Fetching steps data...');
      const user = auth().currentUser;
      if (!user) throw new Error('Utilizador não autenticado');
  
      const userId = user.uid;
      const userRef = firestore().collection('users').doc(userId);
      const dataCollection = await userRef.collection('data').get();
  
      if (!dataCollection.empty) {
        const userInfo = dataCollection.docs[0].data();
        console.log('User Info:', userInfo);
  
        if (userInfo.stepInfo && userInfo.stepInfo.length > 0) {
          const sortedStepInfo = userInfo.stepInfo.sort(
            (a: { date: string | number | Date }, b: { date: string | number | Date }) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          );
  
          const currentDate = new Date().toISOString().split('T')[0];
          const todayEntry = sortedStepInfo.find(
            (info: { date: string }) => info.date === currentDate
          );
  
          if (todayEntry) {
            console.log('Progresso diário de passos encontrado:', { steps: todayEntry.steps });
            console.log('Meta diária de passos:', { dailyGoal: todayEntry.dailyGoal });
  
            setCurrentProgress(Number(todayEntry.steps)); // Atualiza o progresso diário
            setDailyGoal(Number(todayEntry.dailyGoal)); // Atualiza a meta de passos
          } else {
            console.log('Nenhum progresso de passos encontrado para hoje, resetando...');
            setCurrentProgress(0); // Reseta o progresso diário
            setDailyGoal(10000); // Define a meta padrão de passos
          }
        }
      }
    } catch (error) {
      console.error('Erro ao buscar os dados de passos do usuário:', error);
    }
  };
  
  const updateStepsOnFirestore = async (newSteps: number) => {
    try {
      const user = auth().currentUser;
      if (!user) throw new Error('Utilizador não autenticado');
  
      const userId = user.uid;
      const userRef = firestore().collection('users').doc(userId);
  
      // Busca os dados atuais do Firestore
      const userDoc = await userRef.collection('data').get();
      if (!userDoc.empty) {
        const userInfo = userDoc.docs[0];
        const stepsInfo = userInfo.data().stepInfo || [];
  
        const currentDate = new Date().toISOString().split('T')[0];
  
        // Verifica se há uma entrada para hoje
        const existingEntryIndex = stepsInfo.findIndex(
          (info: { date: string }) => info.date === currentDate
        );
  
        let updatedStepInfo;
  
        if (existingEntryIndex !== -1) {
          // Soma os novos passos aos passos existentes
          stepsInfo[existingEntryIndex].steps += newSteps;
  
          updatedStepInfo = [...stepsInfo];
        } else {
          // Cria uma nova entrada se não existir
          updatedStepInfo = [
            ...stepsInfo,
            { date: currentDate, steps: newSteps, dailyGoal: dailyGoal },
          ];
        }
  
        // Atualiza no Firestore
        await userRef.collection('data').doc(userInfo.id).update({
          stepInfo: updatedStepInfo,
        });
  
        console.log('Passos atualizados para o dia atual:', stepsInfo[existingEntryIndex]?.steps || newSteps);
      }
    } catch (error) {
      console.error('Erro ao atualizar os passos no Firestore:', error);
    }
  };
  
  
  useEffect(() => {
    if (steps > 0) {
      updateStepsOnFirestore(1);
    }
  }, [steps]);
  
  
  const updateDailyGoal = async (newDailyGoal: string | React.SetStateAction<number>) => {
    try {
      const user = auth().currentUser;
      if (!user) throw new Error('Utilizador não autenticado');
  
      const userId = user.uid;
      const userRef = firestore().collection('users').doc(userId);
  
      // Busca os dados atuais do utilizador
      const userDoc = await userRef.collection('data').get();
      if (!userDoc.empty) {
        const userInfo = userDoc.docs[0];
        const stepsInfo = userInfo.data().stepsInfo || [];
  
        // Atualiza o dailyGoal no primeiro registro de stepsInfo
        if (stepsInfo.length > 0) {
          stepsInfo[0].dailyGoal = newDailyGoal;
  
          // Atualiza os dados no Firestore
          await userRef.collection('data').doc(userInfo.id).update({
            stepsInfo,
          });
          // Atualiza o estado local
          setDailyGoal(Number(newDailyGoal));
  
          console.log('Meta diária de passos atualizada para:', newDailyGoal);
        } else {
          console.error('Nenhum registro encontrado em stepsInfo.');
        }
      } else {
        console.error('Não foi possível encontrar dados do utilizador.');
      }
    } catch (error) {
      console.error('Erro ao atualizar a meta diária de passos:', error);
    }
  };

  useEffect(() => {
    console.log('Carregando dados de passos...');
    fetchSteps();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome
            name="arrow-left"
            size={24}
            color="black"
            onPress={() => navigation.navigate('Home')}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Steps Tracker</Text>
        <TouchableOpacity>
          {userProfilePicture ? (
            <Image
              source={{ uri: userProfilePicture }}
              style={styles.profileImage}
            />
          ) : (
            <FontAwesome
              name="user-circle"
              size={35}
              color={theme.colorDarkGreen}
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.mainContent}>
        <View style={styles.containerProgress}>
          <Progress.Circle
            progress={currentProgress/dailyGoal}
            size={180}
            color={theme.colorDarkGreen}
            borderWidth={2}
            thickness={10}
            showsText={true}
          />
        </View>
          <Text>{steps}</Text>
        {/* Info Cards */}
        <View style={styles.infoCards}>
          <View style={styles.card}>
            <FontAwesome6 name="fire-flame-curved" size={30} color="#000" />
            <Text style={styles.cardText}>{calories} Kcal</Text>
            <Text style={styles.cardSubtitle}>Calories</Text>
          </View>
          <View style={styles.card}>
            <FontAwesome5 name="walking" size={30} color="#000" />
            <Text style={styles.cardText}>{distance.toFixed(2)} KM</Text>
            <Text style={styles.cardSubtitle}>Distance</Text>
          </View>
        </View>

        {/* Week Data */}

        <Text style={styles.weekTitle}>WEEK DATA</Text>
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => setIsModalVisible(true)}
        >
          <FontAwesome6 name="gear" size={30} color={theme.colorDarkGreen} />
        </TouchableOpacity>
      </View>
      <StepsSettingsModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={(newDailyGoal) => updateDailyGoal(newDailyGoal)}
      />
    </View>
  );
}
