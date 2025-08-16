import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Person } from '../app/types';

interface PersonItemProps {
  person: Person;
  onEdit: (person: Person) => void;
  onDelete: (id: string) => void;
  onDeletePhoto: (id: string) => void;
}

export default function PersonItem({ person, onEdit, onDelete, onDeletePhoto }: PersonItemProps) {
  return (
    <View style={styles.container}>
      {person.photoUri ? (
        <Image source={{ uri: person.photoUri }} style={styles.photo} />
      ) : (
        <View style={[styles.photo, styles.placeholderPhoto]} />
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{person.name} {person.lastname}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <Pressable onPress={() => onEdit(person)} style={styles.button}>
          <Text style={styles.buttonText}>Editar</Text>
        </Pressable>
        <Pressable onPress={() => onDelete(person.id)} style={styles.button}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </Pressable>
        {person.photoUri && (
            <Pressable onPress={() => onDeletePhoto(person.id)} style={styles.button}>
                <Text style={styles.buttonText}>Quitar Foto</Text>
            </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  placeholderPhoto: {
    backgroundColor: '#ccc',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'column',
  },
  button: {
    marginLeft: 8,
    padding: 8,
  },
  buttonText: {
    color: '#007BFF',
  },
});
