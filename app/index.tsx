import { Text, View, ImageBackground, StyleSheet, Image } from 'react-native';
import { theme } from '../assets/theme';
const image = {
  uri: 'https://cravenutritionalcooking.com/wp-content/uploads/2023/04/filip-mroz-XCkRGOX2VgM-unsplash-1-1024x832.jpg',
};

export default function Index() {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}></ImageBackground>
      <View style={styles.content}>
        <Text>LET'S SYNC YOUR HEALTH DATA WITH US.</Text>
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
  },
  image: {
    /* @info Make the image fill the containing view */
    flex: 1,
    /* @info Scale up the image to fill the container, preserving aspect ratio */
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000a0',
    fontFamily:'Graduate'
  },
});
