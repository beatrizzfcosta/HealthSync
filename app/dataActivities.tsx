import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
  Ionicons,
  FontAwesome,
  FontAwesome6,
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { theme } from '@/assets/theme';
import * as Progress from 'react-native-progress';
import StepsSettingsModal from '@/components/stepsSettings';
import { styles } from './styles/dataActivitiesStyles'
export default function ActivitiesScreen({ navigation }: { navigation: any }) {
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
        <Text style={styles.title}>Activities Tracker</Text>
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
            <MaterialCommunityIcons
              style={styles.icon}
              name="clock"
              size={30}
              color="#000"
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>74</Text>
              <Text style={styles.cardTextSubtitle}>min</Text>
              <Text style={styles.cardSubtitle}>TimeSpent</Text>
            </View>
          </View>
          <View style={styles.card}>
            <FontAwesome6
              style={styles.icon}
              name="fire-flame-curved"
              size={30}
              color="#000"
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>54</Text>
              <Text style={styles.cardTextSubtitle}>kcal</Text>
              <Text style={styles.cardSubtitle}>Calories</Text>
            </View>
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