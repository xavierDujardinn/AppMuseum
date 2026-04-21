import { useTranslation } from '@/app/common/hooks/languageContext';
import React, { useState } from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import styles from '../../../styles/hub/common';

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
        <View style={styles.languageSelectorContainer}>
            <Text style={styles.languageSelectorLabel}>{trad('settings.language')}</Text>

            <TouchableOpacity
                style={styles.languageSelectorDropdownButton}
                onPress={() => setIsOpen(true)}
            >
                <View style={styles.languageSelectorLeftPart}>
                    <Text style={styles.languageSelectorFlag}>{currentLang.flag}</Text>
                    <Text style={styles.languageSelectorLanguageName}>{currentLang.name}</Text>
                </View>
                <Text style={styles.languageSelectorArrow}>{isOpen ? '▲' : '▼'}</Text>
            </TouchableOpacity>

            <Modal
                visible={isOpen}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsOpen(false)}
            >
                <Pressable
                    style={styles.languageSelectorModalOverlay}
                    onPress={() => setIsOpen(false)}
                >
                    <View style={styles.languageSelectorModalContent}>
                        {LANGUAGES.map((lang) => (
                            <TouchableOpacity
                                key={lang.id}
                                style={[
                                    styles.languageSelectorOption,
                                    locale === lang.id && styles.languageSelectorOptionActive,
                                ]}
                                onPress={() => handleSelect(lang.id)}
                            >
                                <Text
                                    style={[
                                        styles.languageSelectorFlagSmall,
                                        locale === lang.id && styles.languageSelectorOptionTextActive,
                                    ]}
                                >
                                    {lang.flag}
                                </Text>
                                <Text
                                    style={[
                                        styles.languageSelectorOptionText,
                                        locale === lang.id && styles.languageSelectorOptionTextActive,
                                    ]}
                                >
                                    {lang.name}
                                </Text>
                                {locale === lang.id && (
                                    <Text
                                        style={[
                                            styles.languageSelectorCheck,
                                            styles.languageSelectorOptionTextActive,
                                        ]}
                                    >
                                        ✓
                                    </Text>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
};

export default LanguageSelector;