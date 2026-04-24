import styles from '@/styles/hub/common';
import React from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from '../../common/hooks/languageContext';
import Gallery from "@/app/hub/components/gallery";

interface HomeProps {
    onNavigate: any;
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

            <Gallery onNavigate={onNavigate}/>
        </View>
    );
}

export default Home;