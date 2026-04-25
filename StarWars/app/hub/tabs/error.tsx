import { useTranslation } from "@/app/common/hooks/languageContext";
import ThemedText from "@/app/common/components/themedText";
import styles from '@/styles/hub/common';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { TouchableOpacity, View } from "react-native";

interface ErrorProps {
    onNavigate: (screen: 'home' | 'settings') => void;
    errorMessage: string;
}

const Error: React.FC<ErrorProps> = ({onNavigate, errorMessage}) =>{
    const {trad, themeColors} = useTranslation();

    return(
        <View style={styles.content}>
            <ThemedText style={styles.title} weight="bold">{trad('error.title')}</ThemedText>

            <Feather name="alert-circle" style={styles.errorIcon} />

            <ThemedText style={styles.subtitle} weight="bold">{errorMessage}</ThemedText>

            <TouchableOpacity style={[styles.connectMainButton, { backgroundColor: themeColors.accent }]}>
                <ThemedText style={[styles.connectMainButtonText, { color: themeColors.textOnAccent }]} weight="semibold">{trad('error.retry')}</ThemedText>
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

export default Error;