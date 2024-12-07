import { StyleSheet } from 'react-native';
import { theme } from '@/assets/theme';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colorWhite,
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 10,
      borderBottomWidth: 3,
      borderColor: theme.colorDarkGreen,
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
    mainContent: {
      alignItems: 'center',
      marginTop: 20,
    },
    alerts: {
      paddingBottom: 10,
      borderBottomWidth: 3,
      borderColor: theme.colorDarkGreen,
    },
    alertsHeader: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 10,
    },
    alertTitle: {
      fontFamily: 'graduate',
      fontSize: 15,
    },
  });
  