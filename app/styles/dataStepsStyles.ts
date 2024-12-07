import { StyleSheet } from 'react-native';
import { theme } from '@/assets/theme';

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
      borderRadius: 8,
      alignItems: 'center',
    },
    cardText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
      marginVertical: 4,
      fontFamily: 'graduate',
    },
    cardSubtitle: {
      fontSize: 14,
      color: '#555',
      fontFamily: 'graduate',
    },
  
    weekTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colorDarkGreen,
      marginBottom: 8,
      fontFamily: 'graduate',
    },
  
    footer: {
      position: 'absolute',
      bottom: 16,
      right: 16,
    },
    settingsButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
  });
  