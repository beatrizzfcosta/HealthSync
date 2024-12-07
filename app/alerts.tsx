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
  Switch,
  Platform,
} from 'react-native';
import { theme } from '@/assets/theme';
import SwitchToggle from 'react-native-switch-toggle';
import AlertItem from '@/components/alertItem';
import {styles} from './styles/alertsStyles'

type AlertWithInterval = {
  enabled: boolean;
  interval: number;
};

type AlertWithTime = {
  enabled: boolean;
  time: {
    hours: number;
    minutes: number;
  };
};

type AlertsState = {
  water: AlertWithInterval;
  move: AlertWithInterval;
  sleep: AlertWithTime;
  wakeUp: AlertWithTime;
  lunch: AlertWithTime;
  snack: AlertWithTime;
  dinner: AlertWithTime;
};

export default function AlertSettingsScreen({
  navigation,
}: {
  navigation: any;
}) {
  const [alerts, setAlerts] = useState<AlertsState>({
    water: { enabled: false, interval: 15 },
    move: { enabled: false, interval: 15 },
    sleep: { enabled: false, time: { hours: 22, minutes: 0 } },
    wakeUp: { enabled: false, time: { hours: 7, minutes: 0 } },
    lunch: { enabled: false, time: { hours: 12, minutes: 30 } },
    snack: { enabled: false, time: { hours: 16, minutes: 0 } },
    dinner: { enabled: false, time: { hours: 19, minutes: 30 } },
  });

  const toggleAlert = (key: keyof AlertsState) => {
    setAlerts((prev) => ({
      ...prev,
      [key]: { ...prev[key], enabled: !prev[key].enabled },
    }));
  };

  const updateInterval = (key: 'water' | 'move', value: number) => {
    setAlerts((prev) => ({
      ...prev,
      [key]: { ...prev[key], interval: value },
    }));
  };

  const updateTime = (
    key: 'sleep' | 'wakeUp' | 'lunch' | 'snack' | 'dinner',
    field: 'hours' | 'minutes',
    value: number
  ) => {
    setAlerts((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        time: { ...prev[key].time, [field]: value },
      },
    }));
  };

  const alertTitles: {
    key: keyof AlertsState;
    title: string;
    isReminder: boolean;
  }[] = [
    { key: 'water', title: 'Water Alert', isReminder: false },
    { key: 'move', title: 'Move Alert', isReminder: false },
    { key: 'sleep', title: 'Sleep Alert', isReminder: true },
    { key: 'wakeUp', title: 'Wake Up Alert', isReminder: true },
    { key: 'lunch', title: 'Lunch Alert', isReminder: true },
    { key: 'snack', title: 'Snack Alert', isReminder: true },
    { key: 'dinner', title: 'Dinner Alert', isReminder: true },
  ];
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Alert Settings</Text>
        <TouchableOpacity>
          <FontAwesome
            name="user-circle"
            size={35}
            color={theme.colorDarkGreen}
          />
        </TouchableOpacity>
      </View>

      {/* Alert Items */}
      {alertTitles.map(({ key, title, isReminder }) => (
        <AlertItem
          key={key}
          title={title}
          switchOn={alerts[key].enabled}
          onToggle={() => toggleAlert(key as keyof typeof alerts)}
          theme={theme}
          isReminder={isReminder}
          timeValue={(alerts[key] as AlertWithTime)?.time}
          notificationInterval={(alerts[key] as AlertWithInterval)?.interval}
          onIntervalChange={(value) =>
            updateInterval(key as 'water' | 'move', value)
          }
          onTimeChange={(field, value) =>
            updateTime(
              key as 'sleep' | 'wakeUp' | 'lunch' | 'snack' | 'dinner',
              field,
              value
            )
          }
        />
      ))}
    </View>
  );
}
