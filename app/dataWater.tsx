import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { theme } from '../assets/theme';
import * as Progress from 'react-native-progress';
import WaterSettingsModal from '../components/waterSettings';
import { styles } from './styles/dataWaterStyles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function WaterDataScreen({ navigation }: { navigation: any }) {
  const [dailyGoal, setDailyGoal] = useState(2000);
  const [selectedAmount, setSelectedAmount] = useState(250);
  const [userProfilePicture, setUserProfilePicture] = useState<string | null>(
    null
  );
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const flatListRef = React.useRef<FlatList<any>>(null);
  const amounts = [150, 250, 350, 500, 750, 1000];
  const itemWidth = 120; // Largura de cada item
  const initialIndex = amounts.indexOf(selectedAmount);
  const initialOffset = initialIndex * itemWidth - itemWidth / 4; // Ajusta para centralizar com paddingHorizontal

  const fetchWeights = async () => {
    try {
      console.log('entrei no fetch user');
      const user = auth().currentUser;
      if (!user) throw new Error('Utilizador não autenticado');

      const userId = user.uid;
      const userRef = firestore().collection('users').doc(userId);
      const dataCollection = await userRef.collection('data').get();

      if (!dataCollection.empty) {
        const userInfo = dataCollection.docs[0].data();
        console.log('userInfo:', userInfo);

        if (userInfo.waterInfo && userInfo.waterInfo.length > 0) {
          const sortedWaterInfo = userInfo.waterInfo.sort(
            (
              a: { date: string | number | Date },
              b: { date: string | number | Date }
            ) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );

          const currentDate = new Date().toISOString().split('T')[0];
          const todayEntry = sortedWaterInfo.find(
            (info: { date: string }) => info.date === currentDate
          );

          if (todayEntry) {
            console.log('Progresso diário encontrado:', {
              water: todayEntry.water,
            });
            console.log('Meta diária:', { dailyGoal: todayEntry.dailyGoal });

            setCurrentProgress(Number(todayEntry.water));
            setDailyGoal(Number(todayEntry.dailyGoal));
          } else {
            console.log('Nenhum progresso encontrado para hoje, resetando...');
            setCurrentProgress(0);
            setDailyGoal(2000);
          }
        }
      }
    } catch (error) {
      console.error('Erro ao buscar os dados do usuário:', error);
    }
  };

  const addWaterAmount = async () => {
    try {
      const user = auth().currentUser;
      if (!user) throw new Error('Utilizador não autenticado');

      const userId = user.uid;
      const userRef = firestore().collection('users').doc(userId);

      // Busca os dados atuais do utilizador
      const userDoc = await userRef.collection('data').get();
      if (!userDoc.empty) {
        const userInfo = userDoc.docs[0];
        const waterInfo = userInfo.data().waterInfo || [];

        // Obtém a data atual no formato "yyyy-MM-dd"
        const currentDate = new Date().toISOString().split('T')[0];

        // Verifica se já existe uma entrada para a data atual
        const existingEntryIndex = waterInfo.findIndex(
          (info: { date: string }) => info.date === currentDate
        );

        let newWaterInfo;

        if (existingEntryIndex !== -1) {
          // Entrada encontrada: soma o valor
          waterInfo[existingEntryIndex].water += Number(selectedAmount);
          newWaterInfo = [...waterInfo];
        } else {
          // Nenhuma entrada encontrada: cria nova
          newWaterInfo = [
            ...waterInfo,
            {
              date: currentDate,
              water: Number(selectedAmount),
              dailyGoal: dailyGoal, // Usa o dailyGoal atual
            },
          ];
        }

        console.log('Dados atualizados:', newWaterInfo);

        // Atualiza os dados no Firestore
        await userRef.collection('data').doc(userInfo.id).update({
          waterInfo: newWaterInfo,
        });

        // Atualiza o estado local
        const updatedProgress =
          existingEntryIndex !== -1
            ? waterInfo[existingEntryIndex].water
            : Number(selectedAmount);
        setCurrentProgress(updatedProgress);

        console.log('Água adicionada com sucesso:', selectedAmount, 'ml');
      } else {
        console.error('Não foi possível encontrar dados do utilizador');
      }
    } catch (error) {
      console.error('Erro ao adicionar a quantidade de água:', error);
    }
  };

  const updateDailyGoal = async (
    newDailyGoal: string | React.SetStateAction<number>
  ) => {
    try {
      const user = auth().currentUser;
      if (!user) throw new Error('Utilizador não autenticado');

      const userId = user.uid;
      const userRef = firestore().collection('users').doc(userId);

      // Busca os dados atuais do utilizador
      const userDoc = await userRef.collection('data').get();
      if (!userDoc.empty) {
        const userInfo = userDoc.docs[0];
        const waterInfo = userInfo.data().waterInfo || [];

        // Atualiza o dailyGoal no primeiro registro de waterInfo
        if (waterInfo.length > 0) {
          waterInfo[0].dailyGoal = newDailyGoal;

          // Atualiza os dados no Firestore
          await userRef.collection('data').doc(userInfo.id).update({
            waterInfo,
          });
          // Atualiza o estado local
          setDailyGoal(Number(newDailyGoal));

          console.log('Meta diária de água atualizada para:', newDailyGoal);
        } else {
          console.error('Nenhum registro encontrado em waterInfo.');
        }
      } else {
        console.error('Não foi possível encontrar dados do utilizador.');
      }
    } catch (error) {
      console.error('Erro ao atualizar a meta diária de água:', error);
    }
  };

  useEffect(() => {
    console.log('entrei no useEffect');
    fetchWeights();
  }, []);

  React.useEffect(() => {
    // Role automaticamente para o valor inicial (250) ao carregar a tela
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({
        offset: initialOffset,
        animated: false, // Sem animação para o carregamento inicial
      });
    }
  }, []);

  const completeGoal = async () => {
    try {
      const user = auth().currentUser;
      if (!user) throw new Error('Utilizador não autenticado');

      const userId = user.uid;
      const userRef = firestore().collection('users').doc(userId);

      // Busca os dados atuais do utilizador
      const userDoc = await userRef.collection('data').get();
      if (!userDoc.empty) {
        const userInfo = userDoc.docs[0];
        const waterInfo = userInfo.data().waterInfo || [];

        // Obtém a data atual no formato "yyyy-MM-dd"
        const currentDate = new Date().toISOString().split('T')[0];

        // Verifica se já existe uma entrada para a data atual
        const existingEntryIndex = waterInfo.findIndex(
          (info: { date: string }) => info.date === currentDate
        );

        if (existingEntryIndex !== -1) {
          // Atualiza o progresso para a meta diária
          waterInfo[existingEntryIndex].water = dailyGoal;

          // Atualiza no Firestore
          await userRef.collection('data').doc(userInfo.id).update({
            waterInfo,
          });

          // Atualiza o estado local
          setCurrentProgress(dailyGoal);
          console.log('Meta diária completada!');
        } else {
          console.error('Nenhum registro encontrado para hoje.');
        }
      }
    } catch (error) {
      console.error('Erro ao completar a meta diária:', error);
    }
  };

  const resetProgress = async () => {
    try {
      const user = auth().currentUser;
      if (!user) throw new Error('Utilizador não autenticado');

      const userId = user.uid;
      const userRef = firestore().collection('users').doc(userId);

      // Busca os dados atuais do utilizador
      const userDoc = await userRef.collection('data').get();
      if (!userDoc.empty) {
        const userInfo = userDoc.docs[0];
        const waterInfo = userInfo.data().waterInfo || [];

        // Obtém a data atual no formato "yyyy-MM-dd"
        const currentDate = new Date().toISOString().split('T')[0];

        // Verifica se já existe uma entrada para a data atual
        const existingEntryIndex = waterInfo.findIndex(
          (info: { date: string }) => info.date === currentDate
        );

        if (existingEntryIndex !== -1) {
          // Atualiza o progresso para zero
          waterInfo[existingEntryIndex].water = 0;

          // Atualiza no Firestore
          await userRef.collection('data').doc(userInfo.id).update({
            waterInfo,
          });

          // Atualiza o estado local
          setCurrentProgress(0);
          console.log('Progresso diário resetado!');
        } else {
          console.error('Nenhum registro encontrado para hoje.');
        }
      }
    } catch (error) {
      console.error('Erro ao resetar o progresso diário:', error);
    }
  };

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
        <Text style={styles.title}>Water Tracker</Text>
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
              onPress={() => navigation.navigate('Profile')}
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.containerProgress}>
          <Progress.Circle
            progress={currentProgress / dailyGoal}
            size={180}
            color={'#054F77'}
            borderWidth={2}
            thickness={10}
            showsText={true}
          />
        </View>
        {/* Carrossel Horizontal */}
        <View style={styles.carouselContainer}>
          <FlatList
            ref={flatListRef}
            data={amounts}
            keyExtractor={(item) => item.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            contentContainerStyle={{
              paddingHorizontal: 115,
            }}
            onScrollEndDrag={(event) => {
              const offset = event.nativeEvent.contentOffset.x;
              const index = Math.round(offset / 110); // Calcula o índice baseado no deslocamento
              setSelectedAmount(amounts[index]);
            }}
            decelerationRate="fast"
            onMomentumScrollEnd={(event) => {
              const offset = event.nativeEvent.contentOffset.x;
              const index = Math.round(offset / 110); // Divisão pela largura do item
              setSelectedAmount(amounts[index]);
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.carouselItem,
                  item === selectedAmount && styles.selectedCarouselItem, // Adiciona destaque ao item selecionado
                ]}
                onPress={() => {
                  const index = amounts.indexOf(item);
                  setSelectedAmount(item);
                  flatListRef.current?.scrollToOffset({
                    offset: index * 110, // Calcula a posição para centralizar
                    animated: true,
                  });
                }}
              >
                <Text
                  style={[
                    styles.carouselText,
                    item === selectedAmount && styles.selectedCarouselText,
                  ]}
                >
                  {item} ml
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.resetButton} onPress={resetProgress}>
            <FontAwesome5 name="redo" size={15} color={theme.colorDarkGreen} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={addWaterAmount}>
            <FontAwesome name="plus" size={25} color={theme.colorLightGreen} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.completButton} onPress={completeGoal}>
            <FontAwesome5
              name="check-circle"
              size={20}
              color={theme.colorDarkGreen}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.weekData}>WEEK DATA</Text>
      </View>

      {/* Footer */}
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => setIsModalVisible(true)}
      >
        <FontAwesome6 name="gear" size={30} color={theme.colorDarkGreen} />
      </TouchableOpacity>

      <WaterSettingsModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={(newDailyGoal) => updateDailyGoal(newDailyGoal)}
      />
    </View>
  );
}
