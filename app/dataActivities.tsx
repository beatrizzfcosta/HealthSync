import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
  Ionicons,
  FontAwesome,
  FontAwesome6,
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { MultiSelect } from 'react-native-element-dropdown';
import { theme } from '../assets/theme';
import * as Progress from 'react-native-progress';
import StepsSettingsModal from '../components/stepsSettings';
import { styles } from './styles/dataActivitiesStyles';
export default function ActivitiesScreen({ navigation }: { navigation: any }) {
  const [dailyGoal, setDailyGoal] = useState('7000');
  const [userProfilePicture, setUserProfilePicture] = useState<string | null>(
    null
  );
  const [activities, setActivities] = useState<string[]>([]);
  const activitiesData = [
    { key: '1', value: 'Baking' },
    { key: '2', value: 'Board Games' },
    { key: '3', value: 'Camping' },
    { key: '4', value: 'Calligraphy' },
    { key: '5', value: 'Chess' },
    { key: '6', value: 'Cooking' },
    { key: '7', value: 'Cycling' },
    { key: '8', value: 'Dancing' },
    { key: '9', value: 'Fishing' },
    { key: '10', value: 'Gardening' },
    { key: '11', value: 'Hiking' },
    { key: '12', value: 'Jogging' },
    { key: '13', value: 'Knitting' },
    { key: '14', value: 'Learning a Language' },
    { key: '15', value: 'Meditation' },
    { key: '16', value: 'Painting' },
    { key: '17', value: 'Photography' },
    { key: '18', value: 'Playing Basketball' },
    { key: '19', value: 'Playing Guitar' },
    { key: '20', value: 'Playing Piano' },
    { key: '21', value: 'Playing Soccer' },
    { key: '22', value: 'Playing Tennis' },
    { key: '23', value: 'Reading' },
    { key: '24', value: 'Rock Climbing' },
    { key: '25', value: 'Scuba Diving' },
    { key: '26', value: 'Singing' },
    { key: '27', value: 'Sketching' },
    { key: '28', value: 'Surfing' },
    { key: '29', value: 'Swimming' },
    { key: '30', value: 'Video Editing' },
    { key: '31', value: 'Woodworking' },
    { key: '32', value: 'Writing' },
    { key: '33', value: 'Yoga' },
  ];
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
        <View style={styles.activitiesCard}>
          <View style={styles.activiCard}>
            <MultiSelect
              containerStyle={{
                backgroundColor: theme.colorLightGreen,
                borderColor: 'black',
              }}
              activeColor={theme.colorGreyGreen}
              search={false}
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={activitiesData}
              labelField="value"
              valueField="value"
              placeholder="Activities"
              searchPlaceholder="Procurar..."
              value={activities}
              onChange={(item) => {
                setActivities(item);
              }}
              selectedStyle={styles.selectedStyle}
            />
          </View>
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
