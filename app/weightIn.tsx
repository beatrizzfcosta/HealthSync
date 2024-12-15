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
  const [integerPart, setIntegerPart] = useState<number>(45);
  const [decimalPart, setDecimalPart] = useState<number>(0);
  const [unit, setUnit] = useState<string>('kg');
  const [userProfilePicture, setUserProfilePicture] = useState<string | null>(
    null
  );

  const fetchWeights = async () => {
    try {
      console.log('entrei no fetch user');
      const user = auth().currentUser;
      if (!user) throw new Error('Utilizador não autenticado');

      const userId = user.uid;
      const userRef = firestore().collection('users').doc(userId);
      const dataCollection = await userRef.collection('data').get();
      console.log(dataCollection.docs[0].data());
      if (!dataCollection.empty) {
        const userInfo = dataCollection.docs[0].data();
        // const userInfo = dataCollection.data() || { formattedWeights: [] };
        console.log('dataCollection Existe');
        if (userInfo.formattedWeights && userInfo.formattedWeights.length > 0) {
          const sortedWeights = userInfo.formattedWeights.sort(
            (
              a: { date: string | number | Date },
              b: { date: string | number | Date }
            ) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );

          const latestWeight = sortedWeights[0];
          const [intPart, decPart] = latestWeight.weight
            .toString()
            .split('.')
            .map(Number);

          setIntegerPart(intPart);
          setDecimalPart(decPart || 0);
          console.log('Peso mais recente carregado com sucesso:', {
            intPart,
            decPart,
          });
        }
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
      const dataDoc = userRef.collection('data').doc('weights');

      const currentDate = new Date().toISOString().split('T')[0];

      let userInfo = (await dataDoc.get()).data() || { formattedWeights: [] };
      const weights = userInfo.formattedWeights || [];

      // Substituir peso do dia atual ou adicionar novo peso
      const existingWeightIndex = weights.findIndex(
        (w: { date: string }) => w.date === currentDate
      );

      if (existingWeightIndex > -1) {
        weights[existingWeightIndex].weight = newWeight;
      } else {
        const previousWeight =
          weights[0]?.weight || `${integerPart}.${decimalPart}`;
        weights.unshift({
          date: currentDate,
          weight: newWeight || previousWeight,
        });
      }

      userInfo.formattedWeights = weights;
      await dataDoc.set(userInfo);

      console.log('Peso atualizado com sucesso:', newWeight);
      console.log(
        'Lista atualizada de pesos após salvar:',
        userInfo.formattedWeights
      );

      fetchWeights(); // Atualiza o estado local com os novos valores
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
            initialSelectedIndex={integerPart - 25}
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
            initialSelectedIndex={decimalPart}
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
