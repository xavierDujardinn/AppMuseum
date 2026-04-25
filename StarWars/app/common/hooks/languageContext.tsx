import de from '@/localization/de.json';
import en from '@/localization/en.json';
import fr from '@/localization/fr.json';
import nl from '@/localization/nl.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'fr' | 'en' | 'nl' | 'de';
type FontSize = 'small' | 'medium' | 'large';
type FontFamilyOption = 'exo' | 'system' | 'serif';
const translations = { fr, en, nl, de };
const SETTINGS_STORAGE_KEY = '@escape_museum_user_settings';

interface UserSettings {
    userName: string;
    fontSize: FontSize;
    fontFamily: FontFamilyOption;
    colorBlindMode: boolean;
    highContrast: boolean;
}

const defaultSettings: UserSettings = {
    userName: '',
    fontSize: 'medium',
    fontFamily: 'exo',
    colorBlindMode: false,
    highContrast: false,
};

interface LanguageContextType {
    trad: (path: string) => string;
    locale: Language;
    setLocale: (lang: Language) => void;
    userSettings: UserSettings;
    setUserName: (name: string) => void;
    setFontSize: (fontSize: FontSize) => void;
    setFontFamily: (fontFamily: FontFamilyOption) => void;
    setColorBlindMode: (enabled: boolean) => void;
    setHighContrast: (enabled: boolean) => void;
    fontScale: number;
    getFontFamily: (weight?: 'regular' | 'semibold' | 'bold' | 'black') => string;
    themeColors: {
        background: string;
        surface: string;
        accent: string;
        secondaryAccent: string;
        text: string;
        textOnAccent: string;
        border: string;
    };
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [locale, setLocale] = useState<Language>('fr');
    const [userSettings, setUserSettings] = useState<UserSettings>(defaultSettings);

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

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const rawSettings = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
                if (!rawSettings) return;

                const parsed = JSON.parse(rawSettings) as Partial<UserSettings>;
                setUserSettings({
                    userName: parsed.userName ?? '',
                    fontSize: parsed.fontSize === 'small' || parsed.fontSize === 'large' ? parsed.fontSize : 'medium',
                    fontFamily: parsed.fontFamily === 'system' || parsed.fontFamily === 'serif' ? parsed.fontFamily : 'exo',
                    colorBlindMode: Boolean(parsed.colorBlindMode),
                    highContrast: Boolean(parsed.highContrast),
                });
            } catch (error) {
                console.warn('Unable to load user settings', error);
            }
        };

        loadSettings();
    }, []);

    const persistSettings = async (nextSettings: UserSettings) => {
        setUserSettings(nextSettings);
        try {
            await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(nextSettings));
        } catch (error) {
            console.warn('Unable to save user settings', error);
        }
    };

    const setUserName = (name: string) => {
        void persistSettings({
            ...userSettings,
            userName: name,
        });
    };

    const setFontSize = (fontSize: FontSize) => {
        void persistSettings({
            ...userSettings,
            fontSize,
        });
    };

    const setFontFamily = (fontFamily: FontFamilyOption) => {
        void persistSettings({
            ...userSettings,
            fontFamily,
        });
    };

    const setColorBlindMode = (enabled: boolean) => {
        void persistSettings({
            ...userSettings,
            colorBlindMode: enabled,
        });
    };

    const setHighContrast = (enabled: boolean) => {
        void persistSettings({
            ...userSettings,
            highContrast: enabled,
        });
    };

    const fontScale = userSettings.fontSize === 'small' ? 0.9 : userSettings.fontSize === 'large' ? 1.2 : 1;
    const getFontFamily = (weight: 'regular' | 'semibold' | 'bold' | 'black' = 'regular') => {
        if (userSettings.fontFamily === 'system') return 'System';
        if (userSettings.fontFamily === 'serif') return 'serif';
        if (weight === 'black') return 'Exo2-Black';
        if (weight === 'bold') return 'Exo2-Bold';
        if (weight === 'semibold') return 'Exo2-SemiBold';
        return 'Exo2-Regular';
    };

    const themeColors = userSettings.colorBlindMode
        ? (userSettings.highContrast
            ? {
                background: '#0F172A',
                surface: '#1E293B',
                accent: '#F59E0B',
                secondaryAccent: '#0EA5E9',
                text: '#F8FAFC',
                textOnAccent: '#111827',
                border: '#F59E0B',
            }
            : {
                background: '#F4F7FB',
                surface: '#FFFFFF',
                accent: '#005A9C',
                secondaryAccent: '#2D7D46',
                text: '#111827',
                textOnAccent: '#FFFFFF',
                border: '#2F6B9A',
            })
        : {
            background: '#F2E9E4',
            surface: '#FFFFFF',
            accent: '#4A4E69',
            secondaryAccent: '#9A8C98',
            text: '#111111',
            textOnAccent: '#FFFFFF',
            border: '#4A4E69',
        };

    return (
        <LanguageContext.Provider value={{
            trad,
            locale,
            setLocale,
            userSettings,
            setUserName,
            setFontSize,
            setFontFamily,
            setColorBlindMode,
            setHighContrast,
            fontScale,
            getFontFamily,
            themeColors,
        }}>
            {children}
        </LanguageContext.Provider>
    );
};

// custom hooks
export const useTranslation = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useTranslation must be used in a LanguageProvider");
    return context;
};

export default LanguageProvider;