import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import { useTranslation } from '@/app/hooks/languageContext';

const LANGUAGES = [
    { id: 'en', name: 'English', flag: '🇬🇧' },
    { id: 'fr', name: 'French', flag: '🇫🇷' },
    { id: 'nl', name: 'Dutch', flag: '🇳🇱' },
    { id: 'de', name: 'German', flag: '🇩🇪' },
];

const LanguageSelector: React.FC = () => {
    const { locale, setLocale, trad } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const currentLang = LANGUAGES.find(l => l.id === locale) || LANGUAGES[0];

    const handleSelect = (id: string) => {
        setLocale(id as any);
        setIsOpen(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{trad('settings.language')}</Text>

            <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setIsOpen(true)}
            >
                <View style={styles.leftPart}>
                    <Text style={styles.flag}>{currentLang.flag}</Text>
                    <Text style={styles.languageName}>{currentLang.name}</Text>
                </View>
                <Text style={styles.arrow}>{isOpen ? '▲' : '▼'}</Text>
            </TouchableOpacity>

            <Modal
                visible={isOpen}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsOpen(false)}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setIsOpen(false)}
                >
                    <View style={styles.modalContent}>
                        {LANGUAGES.map((lang) => (
                            <TouchableOpacity
                                key={lang.id}
                                style={[
                                    styles.option,
                                    locale === lang.id && styles.optionActive
                                ]}
                                onPress={() => handleSelect(lang.id)}
                            >
                                <Text style={styles.flagSmall}>{lang.flag}</Text>
                                <Text style={styles.optionText}>{lang.name}</Text>
                                {locale === lang.id && <Text style={styles.check}>✓</Text>}
                            </TouchableOpacity>
                        ))}
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 10,
    },
    label: {
        fontFamily: 'Exo2-Bold',
        fontSize: 16,
        color: '#4A4E69',
        marginBottom: 8,
        marginLeft: 5,
    },
    dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#C9ADA7',
        elevation: 2,
    },
    leftPart: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flag: {
        fontSize: 20,
        marginRight: 10,
    },
    languageName: {
        fontFamily: 'Exo2-SemiBold',
        fontSize: 16,
        color: '#4A4E69',
    },
    arrow: {
        fontSize: 12,
        color: '#4A4E69',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)', // Fond sombre transparent
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 10,
        elevation: 5,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
    },
    optionActive: {
        backgroundColor: '#F2E9E4',
    },
    flagSmall: {
        fontSize: 20,
        marginRight: 15,
    },
    optionText: {
        flex: 1,
        fontFamily: 'Exo2-Regular',
        fontSize: 16,
        color: '#4A4E69',
    },
    check: {
        color: '#4A4E69',
        fontWeight: 'bold',
    }
});

export default LanguageSelector;