import { useTranslation } from "@/app/common/hooks/languageContext";
import { verifyCode } from '@/app/common/scripts/expoCodeVerifyer';
import styles from '@/styles/hub/common';
import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

interface ErrorProps {
    onNavigate: (screen: 'connect' | 'expo' | 'error', params?: any) => void;
}

const Code: React.FC<ErrorProps> = ({onNavigate}) =>{
    const [code, setCode] = useState<string>('');

    const {trad} = useTranslation();

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
                        <Text style={styles.title}>{trad('code.title')}</Text>
                        <Text style={styles.subtitle}>{trad('code.subtitle1')}</Text>
                        <Text style={styles.subtitle}>{trad('code.subtitle2')}</Text>

                        {/*Text input field*/}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>{trad('code.enterCode')}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Code"
                                placeholderTextColor="#999"
                                autoCapitalize="characters"
                                keyboardType="default"
                                onChangeText={setCode}
                                value={code}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.codeMainButton}
                            onPress={findExpositionByCode}
                        >
                            <Text style={styles.codeMainButtonText}>{trad('code.verify')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.codeSecondaryButton}
                            onPress={() => {onNavigate('connect')}}
                        >
                            <Text style={styles.secondaryButtonText}>{trad('common.back')}</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default Code;