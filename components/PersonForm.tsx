import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Person } from '../app/types';

interface PersonFormProps {
  person?: Person | null;
  onSubmit: (person: Omit<Person, 'id'>, newPhotoUri?: string) => void;
  onCancel: () => void;
}

export default function PersonForm({ person, onSubmit, onCancel }: PersonFormProps) {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [photoUri, setPhotoUri] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (person) {
      setName(person.name);
      setLastname(person.lastname);
      setPhotoUri(person.photoUri);
    } else {
      // Reset form for new entry
      setName('');
      setLastname('');
      setPhotoUri(undefined);
    }
  }, [person]);

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a la galería.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!name || !lastname) {
      Alert.alert('Campos requeridos', 'El nombre y el apellido son obligatorios.');
      return;
    }
    onSubmit({ name, lastname }, photoUri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{person ? 'Editar Persona' : 'Nueva Persona'}</Text>
      
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.photo} />
      ) : (
        <View style={[styles.photo, styles.placeholderPhoto]} />
      )}
      <Pressable onPress={handlePickImage} style={styles.imagePickerButton}>
        <Text style={styles.imagePickerText}>Seleccionar Foto</Text>
      </Pressable>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={lastname}
        onChangeText={setLastname}
      />
      <View style={styles.buttonContainer}>
        <Pressable onPress={handleSubmit} style={[styles.button, styles.submitButton]}>
          <Text style={styles.buttonText}>Guardar</Text>
        </Pressable>
        <Pressable onPress={onCancel} style={[styles.button, styles.cancelButton]}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  placeholderPhoto: {
    backgroundColor: '#ccc',
  },
  imagePickerButton: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  imagePickerText: {
    color: '#007BFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '45%',
  },
  submitButton: {
    backgroundColor: '#007BFF',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
