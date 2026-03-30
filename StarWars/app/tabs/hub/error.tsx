import React from 'react'
import {Text, TouchableOpacity, View} from "react-native";
import Feather from '@expo/vector-icons/Feather';
import styles from '../../../styles/hub/common'

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

            <TouchableOpacity style={styles.connectMainButton}>
                <Text style={styles.connectMainButtonText}>Réessayer</Text>
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

export default Error;