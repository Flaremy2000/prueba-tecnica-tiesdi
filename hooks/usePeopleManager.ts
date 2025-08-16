import { useState, useCallback } from 'react';
import { LayoutAnimation } from 'react-native';
import { Person } from '../app/types';
import * as storage from '../app/services/storage';
import * as file from '../app/services/file';

export const usePeopleManager = () => {
    const [people, setPeople] = useState<Person[]>([]);

    const loadPeople = useCallback(async () => {
        const data = await storage.getPeople();
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setPeople(data.sort((a, b) => a.name.localeCompare(b.name)));
    }, []);

    const addPerson = async (data: { name: string; lastname: string; photoUri?: string }) => {
        let finalPhotoUri = undefined;
        if (data.photoUri) {
            finalPhotoUri = await file.saveImage(data.photoUri);
        }

        const newPerson: Person = {
            id: new Date().getTime().toString(),
            name: data.name,
            lastname: data.lastname,
            photoUri: finalPhotoUri,
        };

        await storage.savePerson(newPerson);
        await loadPeople();
    };

    const updatePerson = async (id: string, currentPerson: Person, data: { name: string; lastname: string; photoUri?: string }) => {
        let finalPhotoUri = currentPerson.photoUri;

        if (currentPerson.photoUri && data.photoUri === undefined) {
            await file.deleteImage(currentPerson.photoUri);
            finalPhotoUri = undefined;
        }
        else if (data.photoUri && data.photoUri !== currentPerson.photoUri) {
            if (currentPerson.photoUri) {
                await file.deleteImage(currentPerson.photoUri);
            }
            finalPhotoUri = await file.saveImage(data.photoUri);
        }

        const updatedPerson: Person = {
            id,
            name: data.name,
            lastname: data.lastname,
            photoUri: finalPhotoUri,
        };

        await storage.savePerson(updatedPerson);
        await loadPeople();
    };

    const deletePerson = async (id: string) => {
        const personToDelete = people.find(p => p.id === id);
        if (personToDelete?.photoUri) {
            await file.deleteImage(personToDelete.photoUri);
        }
        await storage.deletePerson(id);
        await loadPeople();
    };

    return {
        people,
        loadPeople,
        addPerson,
        updatePerson,
        deletePerson,
    };
};
