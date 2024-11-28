import { Text, View, ImageBackground, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from '../assets/theme';
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const image = {
  uri: 'https://cravenutritionalcooking.com/wp-content/uploads/2023/04/filip-mroz-XCkRGOX2VgM-unsplash-1-1024x832.jpg',
};

export default function Index() {
  const [fontLoaded, setFontLoaded] = useState(false);

  //const handleLogin = () => {
  //  navigation.navigate('signIn');
  //};

  useEffect(() => {
    Font.loadAsync({
      Graduate: require('../assets/fonts/Graduate-Regular.ttf'),
    }).then(() => setFontLoaded(true));
  }, []);
  if (!fontLoaded) {
    return null; // Ou um indicador de carregamento
  }

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
            <FontAwesome name="angle-double-up" color="white" size={70} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    /* @info Make the containing view fill the screen */
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    height: '40%',
    backgroundColor: theme.colorDarkGreen,
    color: theme.colorWhite,
    justifyContent: 'space-between',
    padding: 20,
  },
  image: {
    /* @info Make the image fill the containing view */
    flex: 1,
    /* @info Scale up the image to fill the container, preserving aspect ratio */
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    display: 'flex',
    padding: 20,
  },
});
