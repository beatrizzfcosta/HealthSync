import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
  Ionicons,
  FontAwesome,
  FontAwesome6,
  FontAwesome5,
} from '@expo/vector-icons';
import { theme } from '@/assets/theme';
import * as Progress from 'react-native-progress';
import StepsSettingsModal from '@/components/stepsSettings';

export default function StepsScreen({ navigation }: { navigation: any }) {
  const [dailyGoal, setDailyGoal] = useState('7000');
  const [userProfilePicture, setUserProfilePicture] = useState<string | null>(
    null
  );
  const currentProgress = 250 / parseInt(dailyGoal);
  const [isModalVisible, setIsModalVisible] = useState(false);
  function handleSaveSettings(dailyGoal: string, units: string): void {
    throw new Error('Function not implemented.');
  }

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
        <Text style={styles.title}>Steps Tracker</Text>
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
            color={theme.colorDarkGreen}
            borderWidth={2}
            thickness={10}
            showsText={true}
          />
        </View>

        {/* Info Cards */}
        <View style={styles.infoCards}>
          <View style={styles.card}>
            <FontAwesome6 name="fire-flame-curved" size={30} color="#000" />
            <Text style={styles.cardText}>54 Kcal</Text>
            <Text style={styles.cardSubtitle}>Calories</Text>
          </View>
          <View style={styles.card}>
            <FontAwesome5 name="walking" size={30} color="#000" />
            <Text style={styles.cardText}>0.54 KM</Text>
            <Text style={styles.cardSubtitle}>Distance</Text>
          </View>
        </View>

        {/* Week Data */}

        <Text style={styles.weekTitle}>WEEK DATA</Text>
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => setIsModalVisible(true)}
        >
          <FontAwesome6 name="gear" size={30} color={theme.colorDarkGreen} />
        </TouchableOpacity>
      </View>
      <StepsSettingsModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSaveSettings}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorLightGreen,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Graduate',
    textAlign: 'center',
  },
  mainContent: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 30,
  },
  containerProgress: {
    paddingBottom: 25,
  },
  infoCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    width: '100%',
  },
  card: {
    width: '48%',
    backgroundColor: theme.colorGreyGreen,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 4,
    fontFamily: 'graduate',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'graduate',
  },

  weekTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colorDarkGreen,
    marginBottom: 8,
    fontFamily: 'graduate',
  },

  footer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  settingsButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
