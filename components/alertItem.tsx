import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';
import { theme } from '@/assets/theme';
import { Picker } from '@react-native-picker/picker';


interface AlertProps {
    title: string;
    switchOn: boolean;
    onToggle: () => void;
    theme: any;
    isReminder?: boolean; // Para diferenciar se é um alerta com tempo
    timeValue?: { hours: number; minutes: number };
    onTimeChange?: (key: 'hours' | 'minutes', value: number) => void;
    notificationInterval?: number; // Intervalo de notificação para Water e Move
    onIntervalChange?: (value: number) => void;
}

const AlertItem: React.FC<AlertProps> = ({
    title,
    switchOn,
    onToggle,
    theme,
    isReminder,
    timeValue,
    onTimeChange,
    notificationInterval,
    onIntervalChange,
}) => {
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
              <Picker.Item key={interval} label={`${interval} MIN`} value={interval} />
            ))}
          </Picker>
        </View>
      ) : (
        isReminder &&
        timeValue && (
          <View style={styles.reminderContainer}>
            <Text style={styles.reminderText}>WHAT TIME DO YOU WANT US TO REMIND YOU?</Text>
            <View style={styles.timeContainer}>
              <TextInput
                style={styles.timeInput}
                keyboardType="numeric"
                value={timeValue.hours.toString()}
                onChangeText={(text) => onTimeChange?.('hours', parseInt(text) || 0)}
                maxLength={2}
              />
              <Text style={styles.timeLabel}>H:</Text>
              <TextInput
                style={styles.timeInput}
                keyboardType="numeric"
                value={timeValue.minutes.toString()}
                onChangeText={(text) => onTimeChange?.('minutes', parseInt(text) || 0)}
                maxLength={2}
              />
              <Text style={styles.timeLabel}>MIN</Text>
            </View>
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
        gap: 8
    },
    alertsHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    alertTitle: {
        fontFamily: 'graduate',
        fontSize: 15
    },
    reminderContainer:{
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    reminderText:{
        display:'flex',
        fontSize: 10,
        fontFamily: 'graduate',
        alignItems: 'center',
        width:'60%'
    },
    timeContainer:{
        flexDirection:'row',
        alignItems: 'center',   
    },
    timeInput:{
        display:'flex',
        width:30,
        borderWidth:1,
        alignItems: 'center',
        justifyContent: 'center',
        height:20,
        textAlign: 'center',
    },
    timeLabel:{
        fontFamily:'graduate'
    },
    picker: {
        width: 105,
        height: 30,
    },
})

export default AlertItem;