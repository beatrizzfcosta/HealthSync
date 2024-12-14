import { Text, View, ImageBackground, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from '../assets/theme';
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles/inicioStyles';
const image = {
  uri: 'https://cravenutritionalcooking.com/wp-content/uploads/2023/04/filip-mroz-XCkRGOX2VgM-unsplash-1-1024x832.jpg',
};

export default function Index({ navigation }: { navigation: any }) {
  const [fontLoaded, setFontLoaded] = useState(false);

  const handleLogin = () => {
    navigation.navigate('Sign In');
  };

  useEffect(() => {
    Font.loadAsync({
      Graduate: require('../assets/fonts/Graduate-Regular.ttf'),
    }).then(() => setFontLoaded(true));
  }, []);
  

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}></ImageBackground>
      <View style={styles.content}>
        <Text
          style={{
            fontFamily: 'Graduate',
            fontSize: 30,
            color: theme.colorWhite,
          }}
        >
          LET'S SYNC YOUR HEALTH DATA WITH US.
        </Text>
        <View style={styles.button}>
          <TouchableOpacity>
            <FontAwesome
              name="angle-double-up"
              color="white"
              size={70}
              onPress={handleLogin}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
