import { StyleSheet } from 'react-native';

export const Colors = {
    primary: '#007BFF',
    danger: '#dc3545',
    gray: '#6c757d',
    lightGray: '#f0f0f0',
    white: '#fff',
    black: '#000',
    borderColor: '#ccc',
    placeholder: '#ccc',
    shadow: '#000',
    modalBackdrop: 'rgba(0, 0, 0, 0.5)',
}

export const globalStyles = StyleSheet.create({
    // Buttons
    button: {
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.white,
        fontWeight: 'bold',
    },
    primaryButton: {
        backgroundColor: Colors.primary,
    },
    cancelButton: {
        backgroundColor: Colors.gray,
    },
    // FAB
    fab: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: Colors.primary,
        borderRadius: 30,
        elevation: 8,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    fabText: {
        fontSize: 30,
        color: Colors.white,
        lineHeight: 32
    },
    // Modal
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.modalBackdrop,
    },
    modalView: {
        width: '90%',
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 10,
        elevation: 5,
    },
    // Photo
    photo: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignSelf: 'center',
    },
    placeholderPhoto: {
        backgroundColor: Colors.placeholder,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Input
    input: {
        borderWidth: 1,
        borderColor: Colors.borderColor,
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
});
