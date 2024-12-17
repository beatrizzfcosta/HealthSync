import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import { theme } from '../assets/theme';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './styles/weightInStyles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function WeightInScreen({ navigation }: { navigation: any }) {
  const [integerPart, setIntegerPart] = useState('25'); // Default to 25
  const [decimalPart, setDecimalPart] = useState('0'); // Default to 0
  const [unit, setUnit] = useState<string>('kg');
  const [userProfilePicture, setUserProfilePicture] = useState<string | null>(
    null
  );

  const fetchWeights = async () => {
    try {
      console.log('Iniciando fetchWeights...');

      const user = auth().currentUser;
      if (!user) throw new Error('Utilizador não autenticado');

      const userId = user.uid;
      const userRef = firestore().collection('users').doc(userId);
      const dataCollection = await userRef.collection('data').get();

      if (dataCollection.empty) {
        console.log('Nenhum dado encontrado para o usuário.');
        return;
      }

      // Access the first document in the data collection
      const userInfo = dataCollection.docs[0].data();

      if (userInfo.formattedWeights && userInfo.formattedWeights.length > 0) {
        console.log('Pesos encontrados, iniciando ordenação...');

        // Sort the weights by date in descending order (latest first)
        const sortedWeights = userInfo.formattedWeights.sort(
          (a: { date: string }, b: { date: string }) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        // Get the latest weight entry
        const latestWeight = sortedWeights[0];

        // Safely split and parse the weight into integer and decimal parts
        const [intPart, decPart] = latestWeight.weight
          .toString()
          .split('.')
          .map(Number);

        const newNumber = intPart.toString();
        setIntegerPart(newNumber);
        setDecimalPart((decPart || 0).toString());
        console.log('Valor atual:', integerPart, 'Novo valor:', intPart);
        console.log(newNumber);

        if (integerPart !== intPart) {
          setIntegerPart(newNumber);
        }
        console.log('Peso mais recente carregado com sucesso:', {
          intPart,
          decPart,
          date: latestWeight.date,
        });
      } else {
        console.log('Nenhum peso formatado encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar os pesos do usuário:', error);
    }
  };

  const addOrUpdateWeight = async (newWeight: string) => {
    try {
      const user = auth().currentUser;
      if (!user) throw new Error('Utilizador não autenticado');

      const userId = user.uid;
      const userRef = firestore().collection('users').doc(userId);
      const dataCollectionRef = userRef.collection('data');

      const currentDate = new Date().toISOString().split('T')[0];

      // Fetch existing data document
      const dataDoc = await dataCollectionRef.limit(1).get();
      let weights: { date: string; weight: string }[] = [];

      let docRef; // Reference to update or create the document

      if (!dataDoc.empty) {
        docRef = dataCollectionRef.doc(dataDoc.docs[0].id);
        const userData = dataDoc.docs[0].data();
        weights = userData.formattedWeights || [];
      } else {
        docRef = dataCollectionRef.doc();
      }

      // Find and update or add the weight for the current date
      const existingWeightIndex = weights.findIndex(
        (w) => w.date === currentDate
      );

      if (existingWeightIndex > -1) {
        weights[existingWeightIndex].weight = newWeight;
      } else {
        const previousWeight =
          weights.length > 0 ? weights[0].weight : newWeight;
        weights.unshift({
          date: currentDate,
          weight: newWeight || previousWeight,
        });
      }

      // Update Firestore document
      await docRef.set({ formattedWeights: weights }, { merge: true });

      console.log('Peso atualizado com sucesso:', newWeight);
    } catch (error) {
      console.error('Erro ao adicionar ou atualizar o peso:', error);
    }
  };

  useEffect(() => {
    console.log('entrei no useEffect');
    fetchWeights();
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSavePress = () => {
    const weight = `${integerPart}.${decimalPart}`;
    addOrUpdateWeight(weight);
  };

  const generateRange = (start: number, end: number) => {
    const range = [];
    for (let i = start; i <= end; i++) {
      range.push({ label: `${i}`, value: i });
    }
    return range;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome
            name="arrow-left"
            size={24}
            color="black"
            onPress={() => handleBackPress()}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Weight In</Text>
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
              onPress={() => navigation.navigate('Profile')}
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text style={styles.subtitle}>How much do you weigh today?</Text>
        <View style={styles.pickersContainer}>
          <WheelPickerExpo
            height={300}
            width={80}
            initialSelectedIndex={Number(integerPart) - 25}
            items={generateRange(25, 300)}
            onChange={({ item }) => setIntegerPart(item.value)}
            renderItem={(props) => (
              <Text
                style={[
                  {
                    fontSize: props.fontSize,
                    fontFamily: 'graduate',
                  },
                ]}
              >
                {props.label}
              </Text>
            )}
          />
          <Text style={styles.separator}>.</Text>
          <WheelPickerExpo
            height={300}
            width={50}
            initialSelectedIndex={Number(decimalPart)}
            items={generateRange(0, 9)}
            onChange={({ item }) => setDecimalPart(item.value)}
            renderItem={(props) => (
              <Text
                style={[
                  {
                    fontSize: props.fontSize,
                    fontFamily: 'graduate',
                  },
                ]}
              >
                {props.label}
              </Text>
            )}
          />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
          <Text style={styles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
