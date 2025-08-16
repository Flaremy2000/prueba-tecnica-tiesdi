import React, { useEffect, useState, useCallback } from 'react';
import {
    SafeAreaView,
    FlatList,
    StyleSheet,
    Pressable,
    Text,
    Modal,
    View,
    Alert
} from 'react-native';
import { Person } from '../types';
import * as storage from '../services/storage';
import * as file from '../services/file';
import PersonItem from '../../components/PersonItem';
import PersonForm from '../../components/PersonForm';

export default function PersonList() {
    const [people, setPeople] = useState<Person[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

    const loadPeople = useCallback(async () => {
        const data = await storage.getPeople();
        setPeople(data.sort((a, b) => a.name.localeCompare(b.name)));
    }, []);

    useEffect(() => {
        loadPeople();
    }, [loadPeople]);

    const handleOpenForm = (person: Person | null = null) => {
        setSelectedPerson(person);
        setModalVisible(true);
    };

    const handleFormSubmit = async (personData: Omit<Person, 'id'>, newPhotoUri?: string) => {
        try {
            let finalPhotoUri = selectedPerson?.photoUri;

            // If there is a new photo
            if (newPhotoUri && newPhotoUri !== selectedPerson?.photoUri) {
                // If there was an old photo, delete it
                if (selectedPerson?.photoUri) {
                    await file.deleteImage(selectedPerson.photoUri);
                }
                // Save the new photo
                finalPhotoUri = await file.saveImage(newPhotoUri);
            }

            const personToSave: Person = {
                id: selectedPerson?.id || new Date().getTime().toString(),
                ...personData,
                photoUri: finalPhotoUri,
            };

            await storage.savePerson(personToSave);
            setModalVisible(false);
            setSelectedPerson(null);
            loadPeople(); // Reload list
        } catch (error) {
            console.error("Error saving person:", error);
            Alert.alert("Error", "No se pudo guardar la persona.");
        }
    };

    const handleDelete = async (id: string) => {
        const personToDelete = people.find(p => p.id === id);
        if (personToDelete?.photoUri) {
            await file.deleteImage(personToDelete.photoUri);
        }
        await storage.deletePerson(id);
        loadPeople(); // Reload list
    };

    const handleDeletePhoto = async (id: string) => {
        const person = await storage.getPerson(id);
        if (person && person.photoUri) {
            await file.deleteImage(person.photoUri);
            person.photoUri = undefined;
            await storage.savePerson(person);
            loadPeople(); // Reload list
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={people}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <PersonItem
                        person={item}
                        onEdit={() => handleOpenForm(item)}
                        onDelete={handleDelete}
                        onDeletePhoto={handleDeletePhoto}
                    />
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>No hay personas registradas.</Text>}
            />

            <Pressable style={styles.fab} onPress={() => handleOpenForm()}>
                <Text style={styles.fabText}>+</Text>
            </Pressable>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    setSelectedPerson(null);
                }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <PersonForm
                            person={selectedPerson}
                            onSubmit={handleFormSubmit}
                            onCancel={() => {
                                setModalVisible(false);
                                setSelectedPerson(null);
                            }}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#007BFF',
        borderRadius: 28,
        elevation: 8,
    },
    fabText: {
        fontSize: 24,
        color: 'white',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        elevation: 5,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#666',
    }
});
