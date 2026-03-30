import React, { createContext, useState, useContext } from 'react';
import fr from '../../localization/fr.json';
import en from '../../localization/en.json';
import nl from '../../localization/nl.json';
import de from '../../localization/de.json';

type Language = 'fr' | 'en' | 'nl' | 'de';
const translations = { fr, en, nl, de };

interface LanguageContextType {
    trad: (path: string) => string;
    locale: Language;
    setLocale: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [locale, setLocale] = useState<Language>('en');

    const trad = (path: string): string => {
        const keys = path.split('.');
        let result: any = translations[locale];

        for (const key of keys) {
            if (result[key]) {
                result = result[key];
            } else {
                return path;
            }
        }
        return result;
    };

    return (
        <LanguageContext.Provider value={{ trad, locale, setLocale }}>
            {children}
        </LanguageContext.Provider>
    );
};

// custom hook
export const useTranslation = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useTranslation must be used in a LanguageProvider");
    return context;
};