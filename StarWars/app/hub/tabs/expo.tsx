import React from 'react'
import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from '../../../styles/hub/common';
import {useTranslation} from "@/app/hooks/languageContext";
import {EXPO_IMAGES} from "@/config/config";

interface ExpoData {
    title: Record<string, string>;
    image: string;
}

interface PreviewProps {
    onNavigate: (screen: 'home') => void;
    expoData?: ExpoData;
}

const Expo: React.FC<PreviewProps> = ({onNavigate, expoData}) =>{
    const {trad, locale} = useTranslation();
    const title = expoData?.title[locale];
    const imageKey = expoData?.image || 'default';

    return(
        <View style={styles.content}>
            <Text style={styles.title}>{trad('preview.title')}</Text>

            <Image
                source={EXPO_IMAGES[imageKey]}
                style={styles.expoImage}
                resizeMode="contain"
            />

            <Text style={styles.expoDesc}>{trad('preview.desc')}</Text>
            <Text style={styles.expoTitle}>{title}</Text>


            <TouchableOpacity style={styles.mainButton}>
                <Text style={styles.mainButtonText}>{trad('preview.join')}</Text>
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

export default Expo;