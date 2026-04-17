import styles from '@/styles/hub/common';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from '../../hooks/languageContext';

interface HomeProps {
    onNavigate: (screen: 'connect') => void;
}

const Home: React.FC<HomeProps> = ({onNavigate}) => {
    const { trad } = useTranslation();

    return (
        <View style={styles.content}>
            <Text style={styles.title}>Escape Museum</Text>
            <Text style={styles.subtitle}>{trad('home.subtitle')}</Text>

            <TouchableOpacity
                style={styles.mainButton}
                onPress={() => onNavigate('connect')}
            >
                <Text style={styles.mainButtonText}>{trad('home.join')}</Text>
            </TouchableOpacity>

            <Image
                source={require('../../../assets/images/escapemuseum.png')}
                style={styles.middleImage}
                resizeMode="contain"
            />
            <Text style={styles.versionText}>v1.0.0 - Escape Museum</Text>
        </View>
    );
}

export default Home;