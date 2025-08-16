import { StyleSheet } from 'react-native';
import { Colors } from '../globalStyles';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  photoSection: {
    alignSelf: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  deletePhotoButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(220, 53, 69, 0.8)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePickerButton: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  imagePickerText: {
    color: Colors.primary,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  formButton: {
    width: '45%',
  },
});
