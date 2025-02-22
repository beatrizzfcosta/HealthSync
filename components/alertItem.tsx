import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import { theme } from '../assets/theme';
interface AlertProps {
  title: string;
  switchOn: boolean;
  onToggle: () => void;
  theme: any;
  isReminder?: boolean; // Para diferenciar se é um alerta com tempo
  timeValue?: { hours: number; minutes: number } | undefined;
  // O valor deve ser obrigatório e um objeto Date
  onTimeChange?: (key: 'hours' | 'minutes', value: number) => void; // Aceita um único argumento do tipo Date
  notificationInterval?: number; // Intervalo de notificação para Water e Move
  onIntervalChange?: (value: number) => void;
}

const AlertItem = ({
  title,
  switchOn,
  onToggle,
  theme,
  isReminder,
  timeValue,
  onTimeChange,
  notificationInterval,
  onIntervalChange,
}: AlertProps) => {
  // Converte timeValue em um objeto Date para uso no DatePicker
  const convertToDate = (time?: { hours: number; minutes: number }): Date => {
    const now = new Date();
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      time?.hours || 0,
      time?.minutes || 0
    );
  };
  const formatTime = (time?: { hours: number; minutes: number }): string => {
    if (!time) return '--:--'; // Default placeholder
    const hours = time.hours.toString().padStart(2, '0');
    const minutes = time.minutes.toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Sync local state with timeValue prop
  useEffect(() => {
    if (timeValue) {
      setHour(
        new Date(new Date().setHours(timeValue.hours, timeValue.minutes, 0, 0))
      );
    }
  }, [timeValue]);
  // Garantia de que timeValue é um objeto Date
  const validTimeValue = convertToDate(timeValue);
  console.log(timeValue);
  const [hour, setHour] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.alerts}>
      <View style={styles.alertsHeader}>
        <Text style={styles.alertTitle}>{title}</Text>
        <SwitchToggle
          switchOn={switchOn}
          onPress={onToggle}
          circleColorOff={theme.colorWhite}
          circleColorOn={theme.colorDarkGreen}
          backgroundColorOn={theme.colorLightGreen}
          backgroundColorOff="#C4C4C4"
          containerStyle={{
            width: 35,
            height: 18,
            borderRadius: 20,
            padding: 3,
          }}
          circleStyle={{
            width: 15,
            height: 15,
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 8,
            elevation: 5,
          }}
        />
      </View>

      {title === 'Water Alert' || title === 'Move Alert' ? (
        <View style={styles.reminderContainer}>
          <Text style={styles.reminderText}>SEND ALERT EVERY</Text>
          <Picker
            selectedValue={notificationInterval}
            style={styles.picker}
            onValueChange={(value) => onIntervalChange?.(value)}
          >
            {[5, 10, 15, 30, 60].map((interval) => (
              <Picker.Item
                key={interval}
                label={`${interval} MIN`}
                value={interval}
              />
            ))}
          </Picker>
        </View>
      ) : (
        isReminder && (
          <View style={styles.reminderContainer}>
            <Text style={styles.reminderText}>
              WHAT TIME DO YOU WANT US TO REMIND YOU?
            </Text>
            <TouchableOpacity onPress={() => setOpen(true)}>
              <TextInput
                style={[styles.inputModal, { textAlign: 'center' }]}
                value={formatTime(timeValue)}
                editable={false}
              />
            </TouchableOpacity>

            <DatePicker
              mode="time"
              modal
              locale="pt"
              is24hourSource="locale"
              open={open}
              date={hour}
              onConfirm={(date) => {
                const hours = date.getHours();
                const minutes = date.getMinutes();
                onTimeChange?.('hours', hours);
                onTimeChange?.('minutes', minutes);
                setOpen(false);
                setHour(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  alerts: {
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderColor: theme.colorDarkGreen,
    gap: 8,
    height: 90,
  },
  alertsHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  alertTitle: {
    fontFamily: 'graduate',
    fontSize: 18,
  },
  reminderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reminderText: {
    display: 'flex',
    fontSize: 12,
    fontFamily: 'graduate',
    alignItems: 'center',
    width: '60%',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInput: {
    display: 'flex',
    width: 30,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    textAlign: 'center',
  },
  timeLabel: {
    fontFamily: 'graduate',
  },
  picker: {
    width: '30%',
  },
  inputModal: {
    color: 'black',
    width: '40%',
    marginRight: 70,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    textAlignVertical: 'bottom',
    fontSize: 14,
  },
});

export default AlertItem;
