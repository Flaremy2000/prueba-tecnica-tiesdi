import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    FlatList,
    Pressable,
    Text,
    Modal,
    View,
    Alert,
    UIManager,
    Platform
} from 'react-native';
import { Person } from '../types';
import PersonItem from '../../components/PersonItem';
import PersonForm from '../../components/PersonForm';
import { usePeopleManager } from '../../hooks/usePeopleManager';
import { globalStyles } from '../../styles/globalStyles';
import { styles } from '../../styles/screens/personList.styles';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function PersonList() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
    const { people, loadPeople, addPerson, updatePerson, deletePerson } = usePeopleManager();

    useEffect(() => {
        loadPeople();
    }, []);

    const handleOpenForm = (person: Person | null = null) => {
        setSelectedPerson(person);
        setModalVisible(true);
    };

    const handleCloseForm = () => {
        setModalVisible(false);
        setSelectedPerson(null);
    }

    const handleFormSubmit = async (data: { name: string; lastname: string; photoUri?: string }) => {
        try {
            if (selectedPerson) {
                // Update existing person
                await updatePerson(selectedPerson.id, selectedPerson, data);
            } else {
                // Add new person
                await addPerson(data);
            }
            handleCloseForm();
        } catch (error) {
            console.error("Error saving person:", error);
            Alert.alert("Error", "No se pudo guardar la persona.");
        }
    };

    const handleDelete = (id: string) => {
        Alert.alert(
            "Eliminar Persona",
            "¿Estás seguro de que quieres eliminar a esta persona?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: () => deletePerson(id)
                }
            ]
        );
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
                    />
                )}
                contentContainerStyle={{ paddingTop: 8, paddingBottom: 80 }}
                ListEmptyComponent={<Text style={styles.emptyText}>No hay personas registradas.</Text>}
            />

            <Pressable style={globalStyles.fab} onPress={() => handleOpenForm()}>
                <Text style={globalStyles.fabText}>+</Text>
            </Pressable>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseForm}>
                <View style={globalStyles.modalContainer}>
                    <View style={globalStyles.modalView}>
                        <PersonForm
                            initialData={selectedPerson}
                            onSubmit={handleFormSubmit}
                            onCancel={handleCloseForm}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
