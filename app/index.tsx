import { Text, View, ImageBackground, StyleSheet } from "react-native";

export default function Index() {
  return (
    <ImageBackground
      source={{ uri:"../assets/images/index.jpg"}} // Coloque o link da sua imagem aqui
      style={styles.background}
    >
      <View style={styles.content}>
        <Text>Edit app/index.tsx to edit this screen.</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // Isso ajusta a imagem para cobrir o fundo inteiro
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
});
