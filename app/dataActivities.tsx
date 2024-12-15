import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
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
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

interface User {
  calorias: number;
  activities: string[];
  time: number;
}
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
  const [time, setTime] = useState('');
  const [calorias, setCalorias] = useState('');
  const [loading, setLoading] = useState(false);
  function handleSaveSettings(dailyGoal: string, units: string): void {
    throw new Error('Function not implemented.');
  }
  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const user = auth().currentUser;
        if (!user) {
          throw new Error('User not authenticated');
        }

        const userId = user.uid;
        const userRef = firestore().collection('users').doc(userId);

        // Fetch the 'data' collection
        const dataSnapshot = await userRef.collection('data').get();

        if (!dataSnapshot.empty) {
          const userData = dataSnapshot.docs[0].data(); // Assuming first document

          setActivities(userData.activities || []);
          setTime(userData.time);
          setCalorias(userData.calorias);
        } else {
          Alert.alert('Info', 'No activity data found.');
        }
      } catch (error) {
        console.error('Error fetching activity data:', error);
        Alert.alert('Error', 'Failed to fetch activity data.');
      }
    };

    fetchActivityData();
  }, []);

  const onSaveUser = async () => {
    if (!activities || !time || !calorias) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);
    const userData = {
      activities,
      time,
      calorias,
    };

    try {
      const userId = auth().currentUser?.uid;
      if (!userId) throw new Error('Utilizador não autenticado');

      try {
        const userRef = firestore().collection('users').doc(userId);
        const dataRef = userRef.collection('data');

        const existingDocs = await dataRef.limit(1).get();

        if (!existingDocs.empty) {
          const docId = existingDocs.docs[0].id;
          await dataRef.doc(docId).update({
            ...userData,
            updatedAt: firestore.FieldValue.serverTimestamp(),
          });
          console.log('Data updated in Firebase:', docId);
        } else {
          const newDocRef = await dataRef.add({
            ...userData,
            createdAt: firestore.FieldValue.serverTimestamp(),
          });
          console.log('New data created in Firebase:', newDocRef.id);
        }
      } catch (error) {
        console.error('Error saving data to Firebase:', error);
        throw new Error('Failed to save or update data');
      }
      Alert.alert('Sucesso', 'Informações salvas com sucesso!');
    } catch (error) {
      console.error('Error adding document: ', error);
      Alert.alert(
        'Erro',
        'Erro ao criar o utilizador. Por favor, tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchActivityData = async () => {
    try {
      const user = auth().currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }

      const userId = user.uid;
      const userRef = firestore().collection('users').doc(userId);

      // Fetch the 'data' collection
      const dataSnapshot = await userRef.collection('data').get();

      if (!dataSnapshot.empty) {
        const userData = dataSnapshot.docs[0].data(); // Assuming first document
        console.log('Fetched Activity Data:', userData.activityInfo);
        return userData.activityInfo;
      } else {
        Alert.alert('Info', 'No activity data found.');
      }
    } catch (error) {
      console.error('Error fetching activity data:', error);
      Alert.alert('Error', 'Failed to fetch activity data.');
    }
  };
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
              <TextInput
                style={[styles.cardText]}
                value={time}
                onChangeText={(text) => setTime(text)} // Updates the `calorias` state with the input value
                keyboardType="numeric"
                placeholder="0"
              />
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
              <TextInput
                style={[styles.cardText]}
                value={calorias}
                onChangeText={(text) => setCalorias(text)}
                keyboardType="numeric"
                placeholder="0"
              />

              <Text style={styles.cardTextSubtitle}>kcal</Text>
              <Text style={styles.cardSubtitle}>Calories</Text>
            </View>
          </View>
        </View>

        {/* Week Data */}

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (!time || !calorias || activities.length === 0) {
              Alert.alert('Error', 'Please fill in all fields.');
              return;
            }

            onSaveUser();
          }}
        >
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
      {/* Footer */}
      <View style={styles.footer}></View>
    </View>
  );
}
