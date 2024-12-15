import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../assets/theme';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


interface WaterSettingsModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (dailyGoal: string, units: string) => void;
}

const WaterSettingsModal= ({
  visible,
  onClose,
  onSave
}: WaterSettingsModalProps) => {
  const [newDailyGoal, setNewDailyGoal] = useState('2000');
  const [units, setUnits] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const handleSave = () => {
    const parsedDailyGoal = Number(newDailyGoal);
    if (!isNaN(parsedDailyGoal) && parsedDailyGoal > 0) {
      onSave(parsedDailyGoal.toString(), 'ml'); // Chama a função updateDailyGoal passando o novo valor
      onClose(); // Fecha o modal
    } else {
      console.error('Meta diária inválida.');
    }
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
                <TouchableOpacity
                  style={styles.helpButton}
                  onPressIn={() => setShowNotification(true)} // Mostra a notificação ao pressionar
                  onPressOut={() => setShowNotification(false)} // Esconde a notificação ao soltar
                >
                  <FontAwesome5
                    name="question-circle"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>

              {/* Notificação */}
              {showNotification && (
                <View style={styles.notification}>
                  <Text style={styles.notificationText}>
                    A daily water goal is based on your weight info
                  </Text>
                </View>
              )}

              {/* Formulário */}
              <TextInput
                style={styles.input}
                placeholder="Daily Goal"
                value={newDailyGoal}
                onChangeText={setNewDailyGoal}
              />
              <TextInput
                style={styles.input}
                placeholder="Units"
                value={units}
                onChangeText={setUnits}
              />
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
    fontFamily: 'Graduate',
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
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    fontFamily: 'Graduate',
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
    fontFamily: 'Graduate',
  },
  restoreDefaults: {
    marginTop: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'Graduate',
    color: 'red',
  },
});

export default WaterSettingsModal;
