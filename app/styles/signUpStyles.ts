import { StyleSheet } from 'react-native';
import { theme } from '@/assets/theme';
 
export const styles = StyleSheet.create({
    scrollContainer: {
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    contentContainer: {
      alignItems: 'center',
    },
  
    icon: {
      marginTop: 60,
      alignSelf: 'flex-start',
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      marginBottom: 20,
      fontFamily: 'Graduate',
    },
    label: {
      alignSelf: 'flex-start',
      fontSize: 14,
      fontWeight: 'bold',
      fontFamily: 'Graduate',
    },
    dropdown: {
      padding: 10,
      borderWidth: 0,
      borderBottomWidth: 1,
      borderBottomColor: '#86939e',
      backgroundColor: 'white',
      flex: 1,
    },
    dropdownWrapper: {
      width: 300,
      marginBottom: 15,
      zIndex: 5000,
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 300,
    },
    columnContainer: {
      flex: 1,
    },
    button: {
      backgroundColor: theme.colorDarkGreen,
      paddingVertical: 10,
      borderRadius: 10,
      marginBottom: 20,
      alignItems: 'center',
      width: 200,
      marginTop: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'Graduate',
    },
    inputContainer: {
      width: 300,
      paddingLeft: 0,
      paddingRight: 0,
    },
    input: {
      fontSize: 14,
      fontFamily: 'Graduate',
    },
    placeholder: {
      color: '#a3a19e',
      fontSize: 14,
      fontFamily: 'Graduate',
    },
    item: {
      paddingVertical: 17,
      paddingHorizontal: 4,
      flexDirection: 'row',
      alignItems: 'center',
    },
    textItem: {
      flex: 1,
      fontSize: 14,
    },
    dateInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: '#86939e',
      padding: 10,
      borderRadius: 5,
      marginBottom: 12,
      marginTop: 5,
    },
    dateText: {
      fontSize: 14,
      color: '#a3a19e',
      fontFamily: 'Graduate',
    },
  
    modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    pickerContainer: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    confirmButton: {
      marginTop: 10,
      backgroundColor: theme.colorDarkGreen,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    confirmButtonText: {
      color: theme.colorDarkGreen,
      fontWeight: 'bold',
    },
  });