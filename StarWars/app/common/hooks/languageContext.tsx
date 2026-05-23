import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fr from '@/localization/fr.json';
import en from '@/localization/en.json';
import nl from '@/localization/nl.json';
import de from '@/localization/de.json';

type Language = 'fr' | 'en' | 'nl' | 'de';
const translations: Record<Language, any> = { fr, en, nl, de };
const LANG_STORAGE_KEY = '@escape_museum_locale';

const LanguageContext = createContext<any>(undefined);

const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [locale, setLocaleState] = useState<Language>('fr');

    useEffect(() => {
        AsyncStorage.getItem(LANG_STORAGE_KEY).then(l => {
            if (l) setLocaleState(l as Language);
        });
    }, []);

    const setLocale = useCallback((newLocale: Language) => {
        setLocaleState(newLocale);
        void AsyncStorage.setItem(LANG_STORAGE_KEY, newLocale);
    }, []);

    const trad = useCallback((path: string): string => {
        const keys = path.split('.');
        let result = translations[locale];
        for (const key of keys) {
            result = result?.[key];
            if (!result) return path;
        }
        return result;
    }, [locale]);

    return (
        <LanguageContext.Provider value={{ trad, locale, setLocale }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useTranslation = () => useContext(LanguageContext);

export default LanguageProvider;