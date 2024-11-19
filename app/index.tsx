import { Text, View, ImageBackground, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from '../assets/theme';
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
const image = {
  uri: 'https://cravenutritionalcooking.com/wp-content/uploads/2023/04/filip-mroz-XCkRGOX2VgM-unsplash-1-1024x832.jpg',
};

export default function Index() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'Graduate': require('../assets/fonts/Graduate-Regular.ttf'),
    }).then(() => setFontLoaded(true));
  }, []);
  if (!fontLoaded) {
    return null; // Ou um indicador de carregamento
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}></ImageBackground>
      <View style={styles.content}>
        <Text style={{ fontFamily: 'Graduate', fontSize:30, color:theme.colorWhite }}  >LET'S SYNC YOUR HEALTH DATA WITH US.</Text>
        <TouchableOpacity >
          <FontAwesome name='angle-double-up'/>
        </TouchableOpacity>
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
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily:'Graduate'
  },
  image: {
    /* @info Make the image fill the containing view */
    flex: 1,
    /* @info Scale up the image to fill the container, preserving aspect ratio */
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
