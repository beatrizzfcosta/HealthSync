import { StyleSheet } from 'react-native';
import { theme } from '../../assets/theme';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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
    body: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    subtitle: {
      fontSize: 18,
      color: '#555',
      marginBottom: 20,
      textAlign: 'center',
      fontFamily: 'graduate'
    },
    pickersContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    separator: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
      marginHorizontal: 5,
    },
    saveButton: {
      marginTop: 30,
      backgroundColor: theme.colorDarkGreen,
      paddingVertical: 15,
      borderRadius: 15,
      marginBottom: 15,
      alignItems: 'center',
      width: 200,
    },
    saveButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: 'Graduate',
    },
  });
  