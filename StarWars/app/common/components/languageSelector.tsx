import { useTranslation } from '@/app/common/hooks/languageContext';
import ThemedText from '@/app/common/components/themedText';
import React, { useState } from 'react';
import { Modal, Pressable, TouchableOpacity, View } from 'react-native';
import styles from '../../../styles/hub/common';

const LANGUAGES = [
    { id: 'en', name: 'English', flag: '🇬🇧' },
    { id: 'fr', name: 'French', flag: '🇫🇷' },
    { id: 'nl', name: 'Dutch', flag: '🇳🇱' },
    { id: 'de', name: 'German', flag: '🇩🇪' },
];

const LanguageSelector: React.FC = () => {
    const { locale, setLocale, trad, themeColors } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const currentLang = LANGUAGES.find(l => l.id === locale) || LANGUAGES[0];

    const handleSelect = (id: string) => {
        setLocale(id as any);
        setIsOpen(false);
    };

    return (
        <View style={styles.languageSelectorContainer}>
            <ThemedText style={[styles.languageSelectorLabel, { color: themeColors.text }]} weight="bold">{trad('settings.language')}</ThemedText>

            <TouchableOpacity
                style={[styles.languageSelectorDropdownButton, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}
                onPress={() => setIsOpen(true)}
            >
                <View style={styles.languageSelectorLeftPart}>
                    <ThemedText style={styles.languageSelectorFlag}>{currentLang.flag}</ThemedText>
                    <ThemedText style={[styles.languageSelectorLanguageName, { color: themeColors.text }]} weight="semibold">{currentLang.name}</ThemedText>
                </View>
                <ThemedText style={[styles.languageSelectorArrow, { color: themeColors.text }]}>{isOpen ? '▲' : '▼'}</ThemedText>
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
                    <View style={[styles.languageSelectorModalContent, { backgroundColor: themeColors.surface }]}>
                        {LANGUAGES.map((lang) => (
                            <TouchableOpacity
                                key={lang.id}
                                style={[
                                    styles.languageSelectorOption,
                                    locale === lang.id && styles.languageSelectorOptionActive,
                                ]}
                                onPress={() => handleSelect(lang.id)}
                            >
                                <ThemedText
                                    style={[
                                        styles.languageSelectorFlagSmall,
                                        locale === lang.id && styles.languageSelectorOptionTextActive,
                                    ]}
                                >
                                    {lang.flag}
                                </ThemedText>
                                <ThemedText
                                    style={[
                                        styles.languageSelectorOptionText,
                                        { color: themeColors.text },
                                        locale === lang.id && styles.languageSelectorOptionTextActive,
                                    ]}
                                >
                                    {lang.name}
                                </ThemedText>
                                {locale === lang.id && (
                                    <ThemedText
                                        style={[
                                            styles.languageSelectorCheck,
                                            styles.languageSelectorOptionTextActive,
                                        ]}
                                    >
                                        ✓
                                    </ThemedText>
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