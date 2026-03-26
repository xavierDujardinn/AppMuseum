import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Feather from '@expo/vector-icons/Feather';

interface ErrorProps {
    onNavigate: (screen: 'home' | 'settings') => void;
    errorMessage: string;
}

const Error: React.FC<ErrorProps> = ({onNavigate, errorMessage}) =>{
    return(
        <View style={styles.content}>
            <Text style={styles.title}>Erreur</Text>

            <Feather name="alert-circle" size={200} color="#1a1a1a" />

            <Text style={styles.subtitle}>{errorMessage}</Text>

            <TouchableOpacity style={styles.mainButton}>
                <Text style={styles.mainButtonText}>Réessayer</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => {onNavigate('home')}}
            >
                <Text style={styles.secondaryButtonText}>Retour</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontFamily: 'Exo2-Bold',
        fontSize: 36,
        color: '#000',
        marginBottom: 40,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    subtitle: {
        fontFamily: 'Exo2-regular',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 40,
    },
    mainButton: {
        backgroundColor: '#4A4E69',
        paddingVertical: 25,
        paddingHorizontal: 30,
        borderRadius: 25,
        width: '75%',
        height: '10%',
        alignItems: 'center',
        marginBottom: 50,
    },
    mainButtonText: {
        fontFamily: 'Exo2-SemiBold',
        color: '#FFF',
        fontSize: 20,
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderColor: '#4A4E69',
        borderWidth: 2,
        paddingVertical: 25,
        paddingHorizontal: 30,
        borderRadius: 25,
        width: '50%',
        height: '10%',
        alignItems: 'center',
        marginBottom: 50,
    },
    secondaryButtonText: {
        fontFamily: 'Exo2-SemiBold',
        color: '#4A4E69',
        fontSize: 14,
    },
});

export default Error;