import { useTranslation } from "@/app/common/hooks/languageContext";
import ThemedText from "@/app/common/components/themedText";
import { RootStackParamList } from '@/app';
import { EXPO_IMAGES } from "@/config/config";
import styles from '@/styles/hub/common';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, TouchableOpacity, View } from "react-native";
import {useUserSettings} from "@/app/common/hooks/userSettings";
import ProgressBar from "@/app/hub/components/progressBar";

interface ExpoData {
    title: Record<string, string>;
    image: string;
    main_screen_name: string;
    storage_name: string;
    nb_challenges: number;
}

interface PreviewProps {
    onNavigate: (screen: 'home') => void;
    expoData?: ExpoData;
}

const Expo: React.FC<PreviewProps> = ({onNavigate, expoData}) =>{
    const {trad, locale} = useTranslation();
    const {themeColors} = useUserSettings();
    const title = expoData?.title[locale];
    const imageKey = expoData?.image || 'default';
    const main_screen_name = expoData?.main_screen_name || 'Hub';

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return(
        <View style={styles.content}>
            <ThemedText style={styles.title} weight="bold">{trad('preview.title')}</ThemedText>

            <Image
                source={EXPO_IMAGES[imageKey]}
                style={styles.expoImage}
                resizeMode="contain"
            />

            <ThemedText style={styles.expoDesc} weight="semibold">{trad('preview.desc')}</ThemedText>
            <ThemedText style={styles.expoTitle} weight="black">{title}</ThemedText>

            <ProgressBar expoStorageName={expoData?.storage_name} nbChallenges={expoData?.nb_challenges}/>

            <TouchableOpacity
                style={[styles.mainButton, { backgroundColor: themeColors.accent }]}
                onPress={() => { navigation.navigate(main_screen_name as keyof RootStackParamList);}}
            >
                <ThemedText style={[styles.mainButtonText, { color: themeColors.textOnAccent }]} weight="semibold">{trad('preview.join')}</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.secondaryButton, { borderColor: themeColors.border }]}
                onPress={() => {onNavigate('home')}}
            >
                <ThemedText style={[styles.secondaryButtonText, { color: themeColors.text }]} weight="semibold">{trad('common.back')}</ThemedText>
            </TouchableOpacity>
        </View>
    );
}

export default Expo;