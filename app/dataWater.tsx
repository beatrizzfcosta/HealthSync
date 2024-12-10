import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import { theme } from '../assets/theme';
import * as Progress from 'react-native-progress';
import WaterSettingsModal from '../components/waterSettings';
import { styles } from './styles/dataWaterStyles';
export default function WaterDataScreen({ navigation }: { navigation: any }) {
  const [dailyGoal, setDailyGoal] = useState('2000');
  const [units, setUnits] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(250);
  const [userProfilePicture, setUserProfilePicture] = useState<string | null>(
    null
  );
  const currentProgress = 250 / parseInt(dailyGoal);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const flatListRef = React.useRef<FlatList<any>>(null);
  const amounts = [150, 250, 350, 500, 750, 1000];
  const itemWidth = 120; // Largura de cada item
  const initialIndex = amounts.indexOf(selectedAmount);
  const initialOffset = initialIndex * itemWidth - itemWidth / 4; // Ajusta para centralizar com paddingHorizontal

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
            progress={currentProgress}
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
          <TouchableOpacity style={styles.addButton}>
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
