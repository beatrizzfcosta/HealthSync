import { StyleSheet } from 'react-native';
import { theme } from '../../assets/theme';

const styles = StyleSheet.create({
    container: {
      /* @info Make the containing view fill the screen */
      flex: 1,
      flexDirection: 'column',
    },
    content: {
      height: '40%',
      backgroundColor: theme.colorDarkGreen,
      color: theme.colorWhite,
      justifyContent: 'space-between',
      padding: 20,
    },
    image: {
      /* @info Make the image fill the containing view */
      flex: 1,
      /* @info Scale up the image to fill the container, preserving aspect ratio */
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    button: {
      alignItems: 'center',
      display: 'flex',
      padding: 20,
    },
  });

export default styles;