import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Person } from '../app/types';
import { FontAwesome } from '@expo/vector-icons';
import { Colors, globalStyles } from '../styles/globalStyles';
import { styles } from '../styles/components/PersonForm.styles';

interface PersonFormData {
    name: string;
    lastname: string;
    photoUri?: string;
}

interface PersonFormProps {
  initialData?: Person | null;
  onSubmit: (data: PersonFormData) => void;
  onCancel: () => void;
}

export default function PersonForm({ initialData, onSubmit, onCancel }: PersonFormProps) {
  const [formData, setFormData] = useState<PersonFormData>({ name: '', lastname: '', photoUri: undefined });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        lastname: initialData.lastname,
        photoUri: initialData.photoUri,
      });
    } else {
      setFormData({ name: '', lastname: '', photoUri: undefined });
    }
  }, [initialData]);

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
      setFormData(prev => ({ ...prev, photoUri: result.assets[0].uri }));
    }
  };

  const handleRemovePhoto = () => {
    setFormData(prev => ({ ...prev, photoUri: undefined }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.lastname) {
      Alert.alert('Campos requeridos', 'El nombre y el apellido son obligatorios.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{initialData ? 'Editar Persona' : 'Nueva Persona'}</Text>
      
      <View style={styles.photoSection}>
        {formData.photoUri ? (
          <Image source={{ uri: formData.photoUri }} style={globalStyles.photo} />
        ) : (
          <View style={[globalStyles.photo, globalStyles.placeholderPhoto]}>
            <FontAwesome name="user" size={50} color={Colors.white} />
          </View>
        )}
        {formData.photoUri && (
          <Pressable onPress={handleRemovePhoto} style={styles.deletePhotoButton}>
            <FontAwesome name="trash" size={20} color={Colors.white} />
          </Pressable>
        )}
      </View>

      <Pressable onPress={handlePickImage} style={styles.imagePickerButton}>
        <Text style={styles.imagePickerText}>Seleccionar Foto</Text>
      </Pressable>

      <TextInput
        style={globalStyles.input}
        placeholder="Nombre"
        value={formData.name}
        onChangeText={(text) => {
            const sanitizedText = text.replace(/[^a-zA-Z\s]/g, '');
            setFormData(prev => ({ ...prev, name: sanitizedText }));
        }}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Apellido"
        value={formData.lastname}
        onChangeText={(text) => {
            const sanitizedText = text.replace(/[^a-zA-Z\s]/g, '');
            setFormData(prev => ({ ...prev, lastname: sanitizedText }));
        }}
      />
      <View style={styles.buttonContainer}>
        <Pressable onPress={handleSubmit} style={[globalStyles.button, globalStyles.primaryButton, styles.formButton]}>
          <Text style={globalStyles.buttonText}>Guardar</Text>
        </Pressable>
        <Pressable onPress={onCancel} style={[globalStyles.button, globalStyles.cancelButton, styles.formButton]}>
          <Text style={globalStyles.buttonText}>Cancelar</Text>
        </Pressable>
      </View>
    </View>
  );
}
