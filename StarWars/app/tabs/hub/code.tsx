import React from 'react'
import {Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {verifyCode} from '@/scripts/expoCodeVerifyer';
import styles from '../../../styles/hub/common'

interface ErrorProps {
    onNavigate: (screen: 'connect' | 'preview' | 'error') => void;
}

const Code: React.FC<ErrorProps> = ({onNavigate}) =>{
    const [code, setCode] = React.useState<string>('');

    const findExpositionByCode = () => {
        if (verifyCode(code)){
            onNavigate('preview');
        }
        else{
            onNavigate('error');
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            {/*Avoid keyboad to break everything*/}
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <Text style={styles.title}>Rejoindre une exposition</Text>
                        <Text style={styles.subtitle}>Un code d’invitation devrait se trouver à l’entrée de l’exposition.</Text>
                        <Text style={styles.subtitle}>Contactez un membre du personnel en cas de problème ou d’absence de ce code</Text>

                        {/*Text input field*/}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Entrez le code de l'exposition</Text>
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
                            <Text style={styles.codeMainButtonText}>Vérifier le code</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.codeSecondaryButton}
                            onPress={() => {onNavigate('connect')}}
                        >
                            <Text style={styles.secondaryButtonText}>Retour</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default Code;