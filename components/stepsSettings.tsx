import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import { theme } from '../assets/theme';

interface WaterSettingsModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (dailyGoal: string, units: string) => void;
}

const StepsSettingsModal: React.FC<WaterSettingsModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [selectedAmount, setSelectedAmount] = useState(7000);
  const [showNotification, setShowNotification] = useState(false);

  const amounts = [
    3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500,
    9000, 9500, 10000, 10500, 11000, 11500, 12000, 12500, 13000, 13500, 14000,
    14500, 15000, 15500, 16000, 16500, 17000, 17500, 18000, 18500, 19000, 19500,
    20000,
  ];

  const handleSave = () => {
    onSave(selectedAmount.toString(), '');
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
                <Text style={styles.modalTitle}>Steps Settings</Text>
                <TouchableOpacity
                  style={styles.helpButton}
                  onPressIn={() => setShowNotification(true)}
                  onPressOut={() => setShowNotification(false)}
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
                    The Steps helps you to burn calories
                  </Text>
                </View>
              )}

              {/* Wheel Picker */}
              <View style={styles.pickerContainer}>
                <WheelPickerExpo
                  height={200}
                  width={150}
                  items={amounts.map((amount) => ({
                    label: `${amount} steps`,
                    value: amount,
                  }))}
                  initialSelectedIndex={amounts.indexOf(selectedAmount)}
                  onChange={({ item }) => setSelectedAmount(item.value)}
                  renderItem={(props) => (
                    <Text
                      style={[
                        {
                          fontSize: props.fontSize,
                          fontFamily: 'graduate',
                        },
                      ]}
                    >
                      {props.label}
                    </Text>
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
  pickerContainer: {
    marginVertical: 20,
    width: '100%',
    alignItems: 'center',
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

export default StepsSettingsModal;
