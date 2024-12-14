import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
  Ionicons,
  FontAwesome,
  FontAwesome6,
  FontAwesome5,
} from '@expo/vector-icons';
import { theme } from '../assets/theme';
import * as Progress from 'react-native-progress';
import StepsSettingsModal from '../components/stepsSettings';
import { styles } from './styles/dataStepsStyles';
import { Accelerometer } from 'expo-sensors';
import { Constants } from 'expo-constants';


export default function StepsScreen({ navigation }: { navigation: any }) {
  const [steps, setSteps] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [lastTimestamp, setLastTimestamp] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(10000);
  const [userProfilePicture, setUserProfilePicture] = useState<string | null>(
    null
  );
  const [calories, setCalories] = useState(0); // Calorias queimadas
  const [distance, setDistance] = useState(0); // Distância percorrida
  const [userHeight, setUserHeight] = useState(170); // Altura do usuário (em cm)
  const [userGender, setUserGender] = useState('male'); // Gênero do usuário ('male' ou 'female')
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    let subscription: { remove: any; };
    Accelerometer.isAvailableAsync().then((result) => {
      if (result) {
        subscription = Accelerometer.addListener((accelerometerData) => {
          const { y } = accelerometerData;
          const threshold = 0.1;
          const timestamp = new Date().getTime();

          if (
            Math.abs(y - lastY) > threshold &&
            !isCounting &&
            (timestamp - lastTimestamp > 800)
          ) {
            setIsCounting(true)
            setLastY(y)
            setLastTimestamp(timestamp)

            setSteps((prevSteps) => {
              const newSteps = prevSteps + 1;

              // Atualiza calorias e distância
              setCalories((prevCalories) => Math.floor(newSteps * 0.05));
              const strideLength =
                userGender === 'male'
                  ? (0.415 * userHeight) / 100000 // Altura convertida para km
                  : (0.413 * userHeight) / 100000; // Altura convertida para km
              setDistance((newSteps * strideLength)); // Distância já em km

              return newSteps;
            });

            setTimeout(() => {
              setIsCounting(false)
            }, 1200)
          }
        })
      } else {
        console.log("Accelerometer not avaiable on this device")
      }
    })
    return () => {
      if (subscription) {
        subscription.remove()
      }
    }
  }, [isCounting, lastY, lastTimestamp])

  const resetSteps = () => {
    setSteps(0);
    setCalories(0);
    setDistance(0);
  }

  const handleSaveSettings = (goal: string, units: string) => {
    setDailyGoal(parseInt(goal));
    console.log(`Daily Goal: ${goal}, Units: ${units}`);
    setIsModalVisible(false);
  };


  const currentProgress = steps / dailyGoal;

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
          <Text>{steps}</Text>
        </View>

        {/* Info Cards */}
        <View style={styles.infoCards}>
          <View style={styles.card}>
            <FontAwesome6 name="fire-flame-curved" size={30} color="#000" />
            <Text style={styles.cardText}>{calories} Kcal</Text>
            <Text style={styles.cardSubtitle}>Calories</Text>
          </View>
          <View style={styles.card}>
            <FontAwesome5 name="walking" size={30} color="#000" />
            <Text style={styles.cardText}>{distance.toFixed(2)} KM</Text>
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
