import React from 'react'
import {Text, TouchableOpacity, View} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import styles from '../../../styles/hub/common'

interface ConnectProps {
    onNavigate: (screen: 'home' | 'connect' | 'code') => void;
}

const Connect: React.FC<ConnectProps> = ({onNavigate}) =>{
    return(
        <View style={styles.content}>
            <Text style={styles.title}>Connexion</Text>

            <Text style={styles.subtitle}>Choisissez une méthode de connexion</Text>

            <Feather name="bluetooth" size={75} color="#1a1a1a" />
            <TouchableOpacity style={styles.connectMainButton}>
                <Text style={styles.connectMainButtonText}>Connexion Bluetooth</Text>
            </TouchableOpacity>

            <Feather name="fast-forward" size={75} color="#1a1a1a" />
            <TouchableOpacity
                style={styles.connectThirdButton}
                onPress={() => onNavigate('code')}
            >
                <Text style={styles.connectMainButtonText}>Code d’exposition</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => onNavigate('home')}
            >
                <Text style={styles.secondaryButtonText}>Retour</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Connect;