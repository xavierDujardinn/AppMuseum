import React from 'react'
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View
} from "react-native";
import {verifyCode} from '@/scripts/expoCodeVerifyer';

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
                            style={styles.mainButton}
                            onPress={findExpositionByCode}
                        >
                            <Text style={styles.mainButtonText}>Vérifier le code</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.secondaryButton}
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

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontFamily: 'Exo2-Bold',
        fontSize: 36,
        color: '#000',
        marginBottom: 40,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    subtitle: {
        fontFamily: 'Exo2-Bold',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 40,
    },
    mainButton: {
        backgroundColor: '#4A4E69',
        paddingVertical: 25,
        paddingHorizontal: 30,
        borderRadius: 25,
        width: '75%',
        height: '10%',
        alignItems: 'center',
        marginBottom: 50,
    },
    mainButtonText: {
        fontFamily: 'Exo2-SemiBold',
        color: '#FFF',
        fontSize: 20,
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderColor: '#4A4E69',
        borderWidth: 2,
        paddingVertical: 25,
        paddingHorizontal: 30,
        borderRadius: 25,
        width: '50%',
        height: '10%',
        alignItems: 'center',
        marginBottom: 50,
    },
    secondaryButtonText: {
        fontFamily: 'Exo2-SemiBold',
        color: '#4A4E69',
        fontSize: 14,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 30,
    },
    label: {
        fontFamily: 'Exo2-SemiBold',
        fontSize: 16,
        color: '#1a1a1a',
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        backgroundColor: '#C9ADA7',
        borderWidth: 1,
        borderColor: '#4A4E69',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        fontFamily: 'Exo2-Regular',
        fontSize: 18,
        color: '#1a1a1a',
        width: '100%',
    },
});

export default Code;