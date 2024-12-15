import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from '../assets/theme';
import AlertItem from '../components/alertItem';
import { styles } from './styles/alertsStyles';
import AlarmService, { AlarmData } from '../components/AlarmService';
import notifee, { AuthorizationStatus } from '@notifee/react-native';
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
  const [loading, setLoading] = useState(true);

  // Fetch alerts from Firebase
  const fetchAlarms = async () => {
    try {
      const fetchedAlarms = await AlarmService.getAlarms(); // Fetch alarms from Firebase
      const updatedAlerts = { ...alerts };

      fetchedAlarms.forEach((alarm) => {
        const key = alarm.name as keyof AlertsState; // Ensure the key is valid
        console.log('Fetched Alarms:', fetchedAlarms);
        if (key === 'water' || key === 'move') {
          if (alarm.type === 'interval') {
            updatedAlerts[key] = {
              enabled: alarm.enabled,
              interval: alarm.interval || 15,
              id: alarm.id,
            } as AlertWithInterval;
          }
        } else if (
          key === 'sleep' ||
          key === 'wakeUp' ||
          key === 'lunch' ||
          key === 'snack' ||
          key === 'dinner'
        ) {
          if (alarm.type === 'time') {
            updatedAlerts[key] = {
              enabled: alarm.enabled,
              time: alarm.time || { hours: 0, minutes: 0 },
              id: alarm.id,
            } as AlertWithTime;
          }
        }
      });

      setAlerts(updatedAlerts);
      setLoading(false); // Update loading state
    } catch (error) {
      console.error('Error fetching alarms from Firebase:', error);
      Alert.alert('Error', 'Failed to fetch alarms. Please try again.');
      setLoading(false); // Ensure loading is cleared even on error
    }
  };

  const requestUserPermission = async () => {
    const settings = await notifee.requestPermission();

    if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      console.log('Notification permission granted:', settings);
    } else {
      console.warn('User declined notification permissions');
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await requestUserPermission();
      await fetchAlarms();
    };

    initialize();
  }, []); // Run once on mount

  // Toggles the enabled state of an alert
  const toggleAlert = async (key: keyof AlertsState) => {
    setAlerts((prev) => {
      const updatedAlerts = {
        ...prev,
        [key]: { ...prev[key], enabled: !prev[key].enabled },
      };

      const updatedAlert = updatedAlerts[key];

      // Construct `alarmData` based on the alert type
      const alarmData: AlarmData =
        'interval' in updatedAlert
          ? {
              name: key,
              enabled: updatedAlert.enabled,
              type: 'interval',
              interval: updatedAlert.interval,
            }
          : {
              name: key,
              enabled: updatedAlert.enabled,
              type: 'time',
              time: updatedAlert.time,
            };

      if (alarmData.enabled) {
        // Save the alarm to Firestore
        AlarmService.saveAlarm(alarmData)
          .then((alarmId) => {
            // Atualizar o estado com o ID do Firebase
            setAlerts((prevState) => ({
              ...prevState,
              [key]: {
                ...(prevState[key] as any),
                id: alarmId, // Salvar o ID no estado
              },
            }));

            // Agendar a notificação com o ID
            return AlarmService.scheduleNotification(alarmData, alarmId);
          })
          .catch((error) => {
            console.error(
              `Error saving or scheduling alarm for ${key}:`,
              error
            );
            Alert.alert(
              'Error',
              `Failed to save or schedule alarm for ${key}. Please try again.`
            );
          });
      } else {
        // Retrieve the alarmId from the state
        const alarmId = (updatedAlert as any).id;

        if (alarmId) {
          // Delete the alarm using the stored ID
          AlarmService.deleteAlarm(alarmId)
            .then(() => {
              // Remove the ID from state after deletion
              setAlerts((prevState) => ({
                ...prevState,
                [key]: {
                  ...prevState[key],
                  id: undefined, // Clear the Firestore ID
                },
              }));
            })
            .catch((error) => {
              console.error(`Error deleting alarm for ${key}:`, error);
              Alert.alert(
                'Error',
                `Failed to delete alarm for ${key}. Please try again.`
              );
            });
        } else {
          console.warn(`No alarmId found for ${key}, cannot delete.`);
        }
      }

      return updatedAlerts;
    });
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
            onPress={() => navigation.navigate('Profile')}
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
