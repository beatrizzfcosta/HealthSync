import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { theme } from '@/assets/theme';

interface WaterSettingsModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (dailyGoal: string, units: string) => void;
}

const WaterSettingsModal: React.FC<WaterSettingsModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [dailyGoal, setDailyGoal] = useState(2000);
  const [units, setUnits] = useState('');
  const [showNotification, setShowNotification] = useState(false)
  const flatListRef = React.useRef<FlatList<any>>(null);
  const amounts = [3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000, 10500, 11000, 11500, 12000, 12500, 13000, 13500, 14000, 14500, 15000, 15500, 16000, 16500, 17000, 17500, 18000, 18500, 19000, 19500, 20000];
  const itemWidth = 120; // Largura de cada item
  const initialIndex = amounts.indexOf(dailyGoal);
  const initialOffset = initialIndex * itemWidth - itemWidth / 4; // Ajusta para centralizar com paddingHorizontal

  React.useEffect(() => {
      // Role automaticamente para o valor inicial (250) ao carregar a tela
      if (flatListRef.current) {
          flatListRef.current.scrollToOffset({
              offset: initialOffset,
              animated: false, // Sem animação para o carregamento inicial
          });
      }
  }, []);

  const handleSave = () => {
    onSave(dailyGoal.toString(), units);
    onClose(); // Fecha o modal após salvar
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <FontAwesome name="times" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>WATER SETTINGS</Text>
                <TouchableOpacity style={styles.helpButton}  
                  onPressIn={() => setShowNotification(true)} // Mostra a notificação ao pressionar
                  onPressOut={() => setShowNotification(false)} // Esconde a notificação ao soltar
                >
                  <FontAwesome5 name="question-circle" size={24} color="black" />
                </TouchableOpacity>
              </View>

               {/* Notificação */}
               {showNotification && (
                <View style={styles.notification}>
                  <Text style={styles.notificationText}>
                    The Steps helps you to burn calouries
                  </Text>
                </View>
              )}

              {/* Formulário */}
              <View style={styles.carouselContainer}>
              <FlatList
  ref={flatListRef}
  data={amounts}
  keyExtractor={(item) => item.toString()}
  showsVerticalScrollIndicator={false} // Indicador de rolagem vertical
  contentContainerStyle={{
    paddingVertical: 10, // Espaçamento para centralizar
    alignItems: 'center', // Centraliza os itens horizontalmente
  }}
  onScrollEndDrag={(event) => {
    const offset = event.nativeEvent.contentOffset.y;
    const index = Math.round(offset / 10); // Calcula o índice baseado no deslocamento
    setDailyGoal(amounts[index]);
  }}
  onMomentumScrollEnd={(event) => {
    const offset = event.nativeEvent.contentOffset.y;
    const index = Math.round(offset / 10); // Divisão pela altura do item
    setDailyGoal(amounts[index]);
  }}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={[
        styles.carouselItem,
        item === dailyGoal && styles.selectedCarouselItem, // Adiciona destaque ao item selecionado
      ]}
      onPress={() => {
        const index = amounts.indexOf(item);
        setDailyGoal(item);
        flatListRef.current?.scrollToOffset({
          offset: index * 40, // Calcula a posição para centralizar
          animated: true,
        });
      }}
    >
      <Text
        style={[
          styles.carouselText,
          item === dailyGoal && styles.selectedCarouselText,
        ]}
      >
        {item} 
      </Text>
    </TouchableOpacity>
  )}
/>
                </View>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.restoreDefaults}>Restore Default</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,  
  },
  closeButton: {
    position: 'absolute',
    left: 10,
  },
  helpButton: {
    position: 'absolute',
    right: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Graduate'
  },
  notification: {
    backgroundColor: '#e5f4e1',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    width: '90%',
  },
  notificationText: {
    fontSize: 14,
    color: '#444',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Graduate',
  },
  carouselContainer: {
    marginVertical: 20,
    width: '100%',
    alignItems: 'center', // Centraliza os itens horizontalmente
    height: 200, // Altura do container para limitar a lista
  },
  carouselItem: {
    width: '100%', // Largura do item para o layout vertical
    height: 40, // Altura de cada item
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 5, // Espaçamento entre os itens
  },
  
carouselText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Graduate'
},
selectedCarouselText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
},
selectedCarouselItem:{

},
  saveButton: {
    backgroundColor: theme.colorDarkGreen,
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Graduate'
  },
  restoreDefaults: {
    marginTop: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'Graduate',
    color: 'red'
  },
});

export default WaterSettingsModal;
