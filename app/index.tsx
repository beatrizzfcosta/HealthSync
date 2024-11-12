import { Text, View, ImageBackground, StyleSheet } from "react-native";

const image = {uri: '../assets/images/index.jpg'};

export default function Index() {
  return (
    <View style={styles.container}>
    <View style={styles.imageContainer}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}/>
    </View>
      <View style={styles.content}>
        <Text>LET'S SYNC YOUR HEALTH DATA WITH US.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    
  },
  image:{

  },
  imageContainer:{

  },
  content: {
    justifyContent: "flex-start",
  },
});
