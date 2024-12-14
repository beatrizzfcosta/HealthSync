import notifee, {
  TimestampTrigger,
  TriggerType,
  RepeatFrequency,
} from '@notifee/react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Alarm data interface
export interface AlarmData {
  name: string;
  enabled: boolean;
  type: 'interval' | 'time';
  interval?: number;
  time?: { hours: number; minutes: number };
}

class AlarmService {
  // Retrieve the current user's ID from Firebase Auth
  private getUserId(): string | undefined {
    return auth().currentUser?.uid;
  }

  /**
   * Save an alarm to Firestore.
   * @param alarm Alarm data to save.
   */
  async saveAlarm(alarm: AlarmData): Promise<string> {
    const userId = this.getUserId();
    if (!userId) throw new Error('Usuário não autenticado');

    try {
      const userRef = firestore().collection('users').doc(userId);
      const alarmRef = await userRef.collection('alarms').add({
        ...alarm,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      console.log('Alarme salvo na Firebase:', alarmRef.id);
      return alarmRef.id;
    } catch (error) {
      console.error('Erro ao salvar o alarme na Firebase:', error);
      throw new Error('Erro ao salvar o alarme');
    }
  }

  /**
   * Schedule a notification based on the alarm type.
   * @param alarm Alarm data for scheduling the notification.
   */
  async scheduleNotification(alarm: AlarmData): Promise<void> {
    if (!alarm.enabled) return;

    if (alarm.type === 'time' && alarm.time) {
      const nextDate = this.getNextOccurrence(alarm.time);
      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: nextDate.getTime(),
        repeatFrequency: RepeatFrequency.DAILY,
      };

      await notifee.createTriggerNotification(
        {
          title: alarm.name,
          body: `É hora de ${alarm.name.toLowerCase()}!`,
          android: { channelId: 'Reminder' },
        },
        trigger
      );
    } else if (alarm.type === 'interval' && alarm.interval) {
      const now = Date.now();
      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: now + alarm.interval * 60000,
        repeatFrequency: RepeatFrequency.HOURLY,
      };

      await notifee.createTriggerNotification(
        {
          title: alarm.name,
          body: `Lembre-se de ${alarm.name.toLowerCase()}!`,
          android: { channelId: 'Reminder' },
        },
        trigger
      );
    } else {
      throw new Error('Dados do alarme inválidos para agendamento');
    }
  }

  /**
   * Calculate the next occurrence of a given time.
   * @param time Target time {hours, minutes}.
   * @returns The Date object for the next occurrence.
   */
  private getNextOccurrence(time: { hours: number; minutes: number }): Date {
    const now = new Date();
    const targetDate = new Date(now);

    targetDate.setHours(time.hours, time.minutes, 0, 0);

    // If the target time is today but has already passed, move to the next day
    if (now.getTime() > targetDate.getTime()) {
      targetDate.setDate(targetDate.getDate() + 1);
    }

    return targetDate;
  }

  /**
   * Delete an alarm from Firestore and cancel its notification.
   * @param alarmId ID of the alarm to delete.
   */
  async deleteAlarm(alarmId: string): Promise<string> {
    const userId = this.getUserId();
    if (!userId) throw new Error('Usuário não autenticado');

    try {
      const userRef = firestore().collection('users').doc(userId);
      const alarmRef = userRef.collection('alarms').doc(alarmId);

      await alarmRef.delete();
      console.log(`Alarme com ID ${alarmId} apagado da Firebase`);

      await notifee.cancelTriggerNotification(alarmId);
      return `Alarme com ID ${alarmId} apagado com sucesso`;
    } catch (error) {
      console.error('Erro ao apagar o alarme:', error);
      throw new Error('Erro ao apagar o alarme');
    }
  }
}

export default new AlarmService();
