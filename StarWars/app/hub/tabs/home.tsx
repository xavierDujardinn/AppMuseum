import styles from '@/styles/hub/common';
import ThemedText from '@/app/common/components/themedText';
import React from 'react';
import { TouchableOpacity, View } from "react-native";
import { useTranslation } from '../../common/hooks/languageContext';
import Gallery from "@/app/hub/components/gallery";

interface HomeProps {
    onNavigate: any;
}

const Home: React.FC<HomeProps> = ({onNavigate}) => {
    const { trad } = useTranslation();

    return (
        <View style={styles.content}>
            <ThemedText style={styles.title} weight="bold">Escape Museum</ThemedText>
            <ThemedText style={styles.subtitle} weight="bold">{trad('home.subtitle')}</ThemedText>

            <TouchableOpacity
                style={styles.mainButton}
                onPress={() => onNavigate('connect')}
            >
                <ThemedText style={styles.mainButtonText} weight="semibold">{trad('home.join')}</ThemedText>
            </TouchableOpacity>

            <Gallery onNavigate={onNavigate}/>
        </View>
    );
}

export default Home;