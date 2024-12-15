import { StyleSheet } from 'react-native';
import { theme } from '../../assets/theme';

export  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colorLightGreen,
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      fontFamily: 'Graduate',
      textAlign: 'center',
    },
    profileImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: 30,
    },
    carouselContainer: {
      marginVertical: 20,
      width: '100%',
    },
    containerProgress: {
      paddingBottom: 25,
    },
    carouselItem: {
      width: 110, // Largura de cada item
      height: 20, // Altura de cada item
      justifyContent: 'center',
      alignItems: 'center',
    },
    carouselText: {
      fontSize: 16,
      color: '#000',
      fontFamily: 'Graduate',
    },
    selectedCarouselText: {
      fontWeight: 'bold',
      fontSize: 18,
      color: '#000',
    },
    selectedCarouselItem: {},
    mainContent: {
      alignItems: 'center',
      marginTop: 20,
    },
    image: {
      width: 150,
      height: 150,
      borderRadius: 10,
    },
    amountSelector: {
      flexDirection: 'row',
      marginVertical: 10,
    },
    amountButton: {
      marginHorizontal: 5,
      padding: 10,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 5,
    },
    amountText: {
      fontSize: 14,
    },
    buttons: {
      flexDirection: 'row',
      gap: 20,
      alignItems: 'center',
    },
    completButton: {
      backgroundColor: '#D3D3D3',
      width: 50,
      height: 50,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20,
    },
    addButton: {
      backgroundColor: '#054F77',
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20,
    },
    resetButton: {
      backgroundColor: '#D3D3D3',
      width: 50,
      height: 50,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20,
    },
    weekData: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 20,
      fontFamily: 'Graduate',
    },
    settingsButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
  });