import { StyleSheet } from 'react-native';
import { theme } from '@/assets/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colorLightGreen,
    alignItems: 'center',
    height: '100%',
    width: '100%',
    flex: 1,
  },

  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', 
  },

  imageContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'transparent',
    width: '90%',
    height: '30%',
  },

  inputsInsideContainer: {
    backgroundColor: 'transparent',
    height: '90%',
    width: '90%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column',
  },

  inputsOutsideContainer: {
    backgroundColor: 'transparent',
    height: '50%',
    width: '90%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column',
  },

  buttonsContainer: {
    backgroundColor: 'transparent',
    height: '20%',
    width: '90%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column',
  },

  button: {
    borderRadius: 10,
    height: '30%',
    width: '80%',
    alignItems: 'center',
    backgroundColor: theme.colorDarkGreen,
    justifyContent: 'center',
  },

  buttonText: {
    color: theme.colorLightGreen,
    fontSize: 14,
    fontFamily: 'Graduate',
  },

  inputContainer: {
    backgroundColor: 'white',
    height: '10%',
    width: '80%',
  },

  secText: {
    padding: 10,
    textAlign: 'center', 
    fontFamily: 'Graduate',
    fontSize: 15,
    color: theme.colorDarkGreen,
    width: '90%',
  },

  detailsContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
