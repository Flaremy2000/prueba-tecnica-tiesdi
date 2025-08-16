import { StyleSheet } from 'react-native';
import { Colors } from '../../styles/globalStyles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightGray,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: Colors.gray,
    }
});
