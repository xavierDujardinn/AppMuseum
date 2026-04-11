import React from 'react'
import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from '../../../styles/hub/common';
import {useTranslation} from "@/app/hooks/languageContext";
import {EXPO_IMAGES} from "@/config/config";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/index';

interface ExpoData {
    title: Record<string, string>;
    image: string;
    main_screen_name: string;
}

interface PreviewProps {
    onNavigate: (screen: 'home') => void;
    expoData?: ExpoData;
}

const Expo: React.FC<PreviewProps> = ({onNavigate, expoData}) =>{
    const {trad, locale} = useTranslation();
    const title = expoData?.title[locale];
    const imageKey = expoData?.image || 'default';
    const main_screen_name = expoData?.main_screen_name || 'Hub';

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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


            <TouchableOpacity
                style={styles.mainButton}
                onPress={() => { navigation.navigate(main_screen_name as keyof RootStackParamList);}}
            >
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