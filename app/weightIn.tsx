import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import { theme } from '@/assets/theme';
import { FontAwesome } from '@expo/vector-icons';
import {styles} from './styles/weightInStyles';

const WeightInScreen: React.FC = () => {
  const [integerPart, setIntegerPart] = useState<number>(45);
  const [decimalPart, setDecimalPart] = useState<number>(0);
  const [unit, setUnit] = useState<string>('kg');
  const [userProfilePicture, setUserProfilePicture] = useState<string | null>(
    null
  );
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSavePress = () => {
    const weight = `${integerPart}.${decimalPart} ${unit}`;
    console.log('Weight saved:', weight);
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
                    fontFamily: 'graduate'
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
                    fontFamily: 'graduate'
                  },
                ]}
              >
                {props.label}
              </Text>
            )}
          />
          <WheelPickerExpo
            height={300}
            width={100}
            initialSelectedIndex={['kg', 'lb', 'st'].indexOf(unit)}
            items={[{ label: 'kg', value: 'kg' }, { label: 'lb', value: 'lb' }, { label: 'st', value: 'st' }]}
            onChange={({ item }) => setUnit(item.value)}
            
          />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
          <Text style={styles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WeightInScreen;
