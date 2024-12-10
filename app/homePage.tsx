import {
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
} from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { theme } from '../assets/theme';
import { styles } from './styles/homePageStyles';

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [userProfilePicture, setUserProfilePicture] = useState<string | null>(
    null
  );
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', // Nome do dia (ex: Monday)
    year: 'numeric', // Ano completo (ex: 2024)
    month: 'long', // Nome completo do mês (ex: December)
    day: 'numeric', // Número do dia (ex: 4)
  });
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome
            name="heartbeat"
            size={30}
            color={theme.colorDarkGreen}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Home</Text>
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

      {/* Current Date */}
      <Text style={styles.currentDate}>{currentDate}</Text>
      {/* Alerts Section */}
      <Text style={styles.sectionTitle}>ALERTS</Text>
      <View style={styles.alertContainer}>
        <Text style={styles.alertText}>YOU SHOULD DRINK WATER</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Log Data</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.alertContainer}>
        <Text style={styles.alertText}>YOU SHOULD MOVE YOUR BODY</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>See Your Move Data</Text>
        </TouchableOpacity>
      </View>

      {/* Highlights Section */}
      <View style={styles.highlightsHeader}>
        <Text style={styles.sectionTitle}>HIGHLIGHTS</Text>
        <TouchableOpacity>
          <Text style={styles.viewMore}>View more</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.highlightsContainer}>
        <TouchableOpacity
          style={styles.highlightBox}
          onPress={() => navigation.navigate('DataSteps')}
        >
          <Ionicons name="footsteps" size={30} color={theme.colorWhite} />
          <Text style={styles.highlightTitle}>STEPS</Text>
          <Text style={styles.highlightValue}>11,250</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.highlightBox}
          onPress={() => navigation.navigate('Activity')}
        >
          <FontAwesome5 name="walking" size={30} color={theme.colorWhite} />
          <Text style={styles.highlightTitle}>ACTIVITY</Text>
          <Text style={styles.highlightValue}>0 TODAY</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.highlightBox}
          onPress={() => navigation.navigate('DataWater')}
        >
          <FontAwesome6
            name="glass-water-droplet"
            size={30}
            color={theme.colorWhite}
          />
          <Text style={styles.highlightTitle}>WATER</Text>
          <Text style={styles.highlightValue}>0 of 1,900ML</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.highlightBox}
          onPress={() => navigation.navigate('WeightIn')}
        >
          <Ionicons name="scale-outline" size={30} color={theme.colorWhite} />
          <Text style={styles.highlightTitle}>WEIGHT</Text>
          <Text style={styles.highlightValue}>SET WEIGHT</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
