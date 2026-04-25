import { useTranslation } from "@/app/common/hooks/languageContext";
import ThemedText from "@/app/common/components/themedText";
import { verifyCode } from '@/app/common/scripts/expoCodeVerifyer';
import styles from '@/styles/hub/common';
import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

interface ErrorProps {
    onNavigate: (screen: 'connect' | 'expo' | 'error', params?: any) => void;
}

const Code: React.FC<ErrorProps> = ({onNavigate}) =>{
    const [code, setCode] = useState<string>('');

    const {trad, themeColors, getFontFamily} = useTranslation();

    const findExpositionByCode = () => {
        const expoData = verifyCode(code);
        if (expoData){
            onNavigate('expo', expoData);
        }
        else{
            onNavigate('error', {message: "Code invalide"});
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.screen}
        >
            {/*Avoid keyboad to break everything*/}
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <ThemedText style={styles.title} weight="bold">{trad('code.title')}</ThemedText>
                        <ThemedText style={styles.subtitle} weight="bold">{trad('code.subtitle1')}</ThemedText>
                        <ThemedText style={styles.subtitle} weight="bold">{trad('code.subtitle2')}</ThemedText>

                        {/*Text input field*/}
                        <View style={styles.inputContainer}>
                            <ThemedText style={styles.label} weight="semibold">{trad('code.enterCode')}</ThemedText>
                            <TextInput
                                style={[styles.input, { backgroundColor: themeColors.surface, borderColor: themeColors.border, color: themeColors.text, fontFamily: getFontFamily('regular') }]}
                                placeholder="Code"
                                placeholderTextColor="#999"
                                autoCapitalize="characters"
                                keyboardType="default"
                                onChangeText={setCode}
                                value={code}
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.codeMainButton, { backgroundColor: themeColors.accent }]}
                            onPress={findExpositionByCode}
                        >
                            <ThemedText style={[styles.codeMainButtonText, { color: themeColors.textOnAccent }]} weight="semibold">{trad('code.verify')}</ThemedText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.codeSecondaryButton, { borderColor: themeColors.border }]}
                            onPress={() => {onNavigate('connect')}}
                        >
                            <ThemedText style={[styles.secondaryButtonText, { color: themeColors.text }]} weight="semibold">{trad('common.back')}</ThemedText>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default Code;