import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from '../assets/theme';
import AlertItem from '../components/alertItem';
import { styles } from './styles/alertsStyles';
import AlarmService, { AlarmData } from '../components/AlarmService';

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

  // Toggles the enabled state of an alert
  const toggleAlert = (key: keyof AlertsState) => {
    setAlerts((prev) => ({
      ...prev,
      [key]: { ...prev[key], enabled: !prev[key].enabled },
    }));
  };

  // Updates the interval for interval-based alerts
  const updateInterval = (key: 'water' | 'move', value: number) => {
    if (value < 1) {
      Alert.alert('Invalid Input', 'Interval must be greater than 0.');
      return;
    }
    setAlerts((prev) => ({
      ...prev,
      [key]: { ...prev[key], interval: value },
    }));
  };

  // Updates the time for time-based alerts
  const updateTime = (
    key: 'sleep' | 'wakeUp' | 'lunch' | 'snack' | 'dinner',
    field: 'hours' | 'minutes',
    value: number
  ) => {
    if (
      (field === 'hours' && (value < 0 || value > 23)) ||
      (field === 'minutes' && (value < 0 || value > 59))
    ) {
      Alert.alert('Invalid Input', 'Please enter a valid time.');
      return;
    }
    setAlerts((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        time: { ...prev[key].time, [field]: value },
      },
    }));
  };

  const onSaveAlarm = async () => {
    // Map `alerts` to match `AlarmData`
    const alarmDataList: AlarmData[] = Object.entries(alerts)
      .map(([key, value]) => {
        if ('interval' in value) {
          return {
            name: key,
            enabled: value.enabled,
            type: 'interval', // Set type as 'interval'
            interval: value.interval,
          } as AlarmData;
        } else if ('time' in value) {
          return {
            name: key,
            enabled: value.enabled,
            type: 'time', // Set type as 'time'
            time: value.time,
          } as AlarmData;
        }
        return null; // Return null if the entry doesn't match expected structure
      })
      .filter((alarmData): alarmData is AlarmData => alarmData !== null); // Use type guard to filter null values

    // Save alarms and schedule notifications
    try {
      for (const alarmData of alarmDataList) {
        if (alarmData.enabled) {
          await AlarmService.saveAlarm(alarmData);
          await AlarmService.scheduleNotification(alarmData);
        }
      }
      Alert.alert('Success', 'Alarm settings saved successfully!');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error saving alarms:', error);
      Alert.alert('Error', 'Failed to save alarm settings. Please try again.');
    }
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
          <FontAwesome
            name="arrow-left"
            size={24}
            color="black"
            onPress={() => navigation.navigate('Home')}
          />
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
