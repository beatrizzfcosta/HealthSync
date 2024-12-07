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
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 30,
  },
  currentDate: {
    fontSize: 16,
    marginBottom: 20,
    marginTop: 20,
    fontFamily: 'graduate',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'graduate',
  },
  alertContainer: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },
  alertText: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'graduate',
  },
  button: {
    backgroundColor: '#344E41',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'graduate',
  },
  highlightsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  viewMore: {
    fontSize: 12,
    color: '#344E41',
    fontWeight: 'bold',
    fontFamily: 'graduate',
  },
  highlightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  highlightBox: {
    backgroundColor: '#344E41',
    width: '48%',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  highlightTitle: {
    marginTop: 10,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'graduate',
  },
  highlightValue: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});
