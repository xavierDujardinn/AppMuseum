import React from 'react'
import {Text, TouchableOpacity, View} from "react-native";
import Feather from '@expo/vector-icons/Feather';
import styles from '../../../styles/hub/common';
import {useTranslation} from "@/app/hooks/languageContext";

interface ErrorProps {
    onNavigate: (screen: 'home' | 'settings') => void;
    errorMessage: string;
}

const Error: React.FC<ErrorProps> = ({onNavigate, errorMessage}) =>{
    const {trad} = useTranslation();

    return(
        <View style={styles.content}>
            <Text style={styles.title}>{trad('error.title')}</Text>

            <Feather name="alert-circle" size={200} color="#1a1a1a" />

            <Text style={styles.subtitle}>{errorMessage}</Text>

            <TouchableOpacity style={styles.connectMainButton}>
                <Text style={styles.connectMainButtonText}>{trad('error.retry')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => {onNavigate('home')}}
            >
                <Text style={styles.secondaryButtonText}>{trad('common.back')}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Error;