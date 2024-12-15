import { StyleSheet } from 'react-native';
import { theme } from '../../assets/theme';

export const styles = StyleSheet.create({
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
    mainContent: {
      alignItems: 'center',
      marginTop: 20,
    },
    profileImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: 30,
    },
    containerProgress: {
      paddingBottom: 25,
    },
    infoCards: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
      width: '100%',
    },
    card: {
      width: '48%',
      backgroundColor: theme.colorGreyGreen,
      padding: 16,
      borderRadius: 20,
    },
    icon: {
      marginBottom: 5,
    },
    cardContent: {
      alignItems: 'center',
     
    },
    cardText: {
      
      justifyContent: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000',
      fontFamily: 'graduate',
    },
    cardTextSubtitle: {
      fontSize: 15,
      color: 'black',
      fontFamily: 'graduate',
    },
    cardSubtitle: {
      fontSize: 17,
      color: 'black',
      fontFamily: 'graduate',
      fontWeight: 'bold',
    },
  
    weekTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colorDarkGreen,
      marginBottom: 8,
      fontFamily: 'graduate',
    },
    dropdown: {
      height: 50,
      backgroundColor: 'transparent',
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
    },
    placeholderStyle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    selectedTextStyle: {
      fontSize: 14,
      color: 'white',
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    selectedStyle: {
      borderRadius: 19,
      borderColor: 'transparent',
      backgroundColor: theme.colorDarkGreen,
    },
    footer: {
      position: 'absolute',
      bottom: 16,
      right: 16,
    },
    button: {
      borderRadius: 20,
      height: '10%',
      width: '50%',
      alignItems: 'center',
      backgroundColor: theme.colorDarkGreen,
      justifyContent: 'center',
    },
  
    buttonText: {
      color: theme.colorLightGreen,
      fontSize: 14,
      fontFamily: 'Graduate',
    },
    settingsButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
    activitiesCard:{
      width: '100%',
      backgroundColor: theme.colorGreyGreen,
      padding: 16,
      borderRadius: 20,
      marginTop: '10%', margin: '5%'
    },
    activiCard:{

    }
  });
  