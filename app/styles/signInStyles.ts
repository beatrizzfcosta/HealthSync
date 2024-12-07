import { StyleSheet } from 'react-native';
import { theme } from '@/assets/theme';
 
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    icon: {
      alignSelf: 'flex-start',
      marginLeft: 45,
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      fontFamily: 'Graduate',
    },
    containerTitle: {
      marginBottom: 20,
      alignItems: 'center',
      gap: 15,
    },
    label: {
      alignSelf: 'flex-start',
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 45,
      fontFamily: 'Graduate',
    },
    input: {
      width: 300,
      height: 40,
      paddingHorizontal: 10,
      fontSize: 14,
      fontFamily: 'Graduate',
    },
    inputContainer: {
      width: 300,
      paddingLeft: 0,
      paddingRight: 0,
    },
    button: {
      marginTop: 30,
      backgroundColor: theme.colorDarkGreen,
      paddingVertical: 15,
      borderRadius: 10,
      marginBottom: 15,
      alignItems: 'center',
      width: 200,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: 'Graduate',
    },
    registerText: {
      color: '#000',
      textDecorationLine: 'underline',
    },
    errorMessage: {
      color: 'red',
      fontSize: 14,
      alignItems: 'center',
      padding: 10,
    },
  });