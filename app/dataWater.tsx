import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList  } from 'react-native';
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
  const [currentProgress,setCurrentProgress] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const flatListRef = React.useRef<FlatList<any>>(null);
  const amounts = [150, 250, 350, 500, 750, 1000];
  const itemWidth = 120; // Largura de cada item
  const initialIndex = amounts.indexOf(selectedAmount);
  const initialOffset = initialIndex * itemWidth - itemWidth / 4; // Ajusta para centralizar com paddingHorizontal

  const fetchWeights = async () => {
    try {
      console.log('entrei no fetch user')
      const user = auth().currentUser;
      if (!user) throw new Error('Utilizador não autenticado');

      const userId = user.uid;
      const userRef = firestore().collection('users').doc(userId);
      const dataCollection = await userRef.collection('data').get();
      if (!dataCollection.empty) {
        const userInfo = dataCollection.docs[0].data();
        console.log('dataCollection Existe')
        console.log('userInfo:', userInfo);
        if (userInfo.waterInfo && userInfo.waterInfo.length > 0) {
          const sortedWaterInfo = userInfo.waterInfo.sort(
            (a: { date: string | number | Date }, b: { date: string | number | Date }) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          );
        
          const latestWaterInfo = sortedWaterInfo[0]; // Obtem o objeto mais recente
          const water = latestWaterInfo.water; // Corrigido para acessar "water"
          const dailyGoal = sortedWaterInfo[0]?.dailyGoal || 0;// Corrigido para acessar "dailyGoal"
          console.log('latestWaterInfo',{latestWaterInfo})
          console.log('Progresso diário:', { water });
          console.log('Meta diária:', { dailyGoal });
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

        const dailyGoal = waterInfo[0]?.dailyGoal || 0;
        const currentDate = new Date().toISOString().split('T')[0];
        const parsedCurrentProgress = Number(currentProgress) || 0; // Converte para número
        const parsedSelectedAmount = Number(selectedAmount) || 0; // Converte para número
        const newProgress = parsedCurrentProgress + parsedSelectedAmount;
        console.log(newProgress);
        // Atualiza os dados no Firestore
        await userRef
          .collection('data')
          .doc(userInfo.id) // Usa o ID do documento específico
          .update({
            waterInfo: [
              ...waterInfo,
              {
                date: currentDate,
                water: newProgress,
                dailyGoal: dailyGoal, 
              },
            ],
          });
  
        // Atualiza o estado local
        setCurrentProgress(newProgress);
        console.log('Água adicionada com sucesso:', selectedAmount, 'ml');
      } else {
        console.error('Não foi possível encontrar dados do utilizador');
      } 
    } catch (error) {
      console.error('Erro ao adicionar a quantidade de água:', error);
    }
  };
  

  useEffect(() => {
      console.log('entrei no useEffect')
      fetchWeights();
    }, []);
    
  const handleSaveSettings = () => {
    // Lógica para salvar as configurações
    setIsModalVisible(false); // Fecha o modal ao salvar
  };

  React.useEffect(() => {
    // Role automaticamente para o valor inicial (250) ao carregar a tela
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({
        offset: initialOffset,
        animated: false, // Sem animação para o carregamento inicial
      });
    }
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
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.containerProgress}>
          <Progress.Circle
            progress={currentProgress/dailyGoal}
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
          <TouchableOpacity style={styles.resetButton}>
            <FontAwesome5 name="redo" size={15} color={theme.colorDarkGreen} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton}  onPress={addWaterAmount}>
            <FontAwesome name="plus" size={25} color={theme.colorLightGreen} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.completButton}>
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
        onSave={handleSaveSettings}
      />
    </View>
  );
}
