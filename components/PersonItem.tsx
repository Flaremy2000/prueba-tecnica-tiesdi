import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Person } from '../app/types';
import { FontAwesome } from '@expo/vector-icons';
import { Colors, globalStyles } from '../styles/globalStyles';
import { styles } from '../styles/components/PersonItem.styles';

interface PersonItemProps {
  person: Person;
  onEdit: (person: Person) => void;
  onDelete: (id: string) => void;
}

export default function PersonItem({ person, onEdit, onDelete }: PersonItemProps) {
  return (
    <View style={styles.card}>
        {person.photoUri ? (
            <Image source={{ uri: person.photoUri }} style={styles.photo} />
        ) : (
            <View style={[styles.photo, globalStyles.placeholderPhoto]}>
                <FontAwesome name="user" size={40} color={Colors.white} />
            </View>
        )}
      
      <Text style={styles.name}>{person.name} {person.lastname}</Text>
      
      <View style={styles.actionsContainer}>
        <Pressable onPress={() => onEdit(person)} style={styles.iconButton}>
            <FontAwesome name="pencil" size={24} color={Colors.primary} />
        </Pressable>
        <Pressable onPress={() => onDelete(person.id)} style={styles.iconButton}>
            <FontAwesome name="trash" size={24} color={Colors.danger} />
        </Pressable>
      </View>
    </View>
  );
}
