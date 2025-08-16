import AsyncStorage from '@react-native-async-storage/async-storage';
import { Person } from '../types';

const STORAGE_KEY = '@peopleList';

export const getPeople = async (): Promise<Person[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error reading people from storage', e);
    return [];
  }
};

export const getPerson = async (id: string): Promise<Person | null> => {
    try {
        const people = await getPeople();
        const person = people.find(p => p.id === id);
        return person || null;
    } catch (e) {
        console.error(`Error getting person with id ${id}`, e);
        return null;
    }
}

export const savePerson = async (person: Person): Promise<void> => {
  try {
    const people = await getPeople();
    const existingPersonIndex = people.findIndex(p => p.id === person.id);

    if (existingPersonIndex !== -1) {
      people[existingPersonIndex] = person;
    } else {
      people.push(person);
    }

    const jsonValue = JSON.stringify(people);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Error saving person to storage', e);
  }
};

export const deletePerson = async (id: string): Promise<void> => {
  try {
    const people = await getPeople();
    const newPeople = people.filter(p => p.id !== id);
    const jsonValue = JSON.stringify(newPeople);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Error deleting person from storage', e);
  }
};