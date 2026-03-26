import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Gtu from './gtu'

const Settings: React.FC = () => {
    return (
        <>
            <View style={styles.content}>
                <Text style={styles.title}>Paramètres</Text>
            </View>

            {/*Note : Please favorise usage of components like GTU so everything's logic is well abstracted, i think there are many libraries for what we need, use them.*/}

            <Gtu/>
        </>
);}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingTop: 40,
    },
    title: {
        fontFamily: 'Exo2-Bold',
        fontSize: 36,
        color: '#000',
        marginBottom: 40,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
});

export default Settings;