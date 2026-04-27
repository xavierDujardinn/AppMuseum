import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FontSize = 'small' | 'medium' | 'large';
type FontFamilyOption = 'exo' | 'system' | 'serif';
const STORAGE_KEY = '@escape_museum_user_settings';

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

const SettingsContext = createContext<any>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<UserSettings>(defaultSettings);

    useEffect(() => {
        const load = async () => {
            const raw = await AsyncStorage.getItem(STORAGE_KEY);
            if (raw) setSettings({ ...defaultSettings, ...JSON.parse(raw) });
        };
        load();
    }, []);

    const updateSettings = useCallback((updates: Partial<UserSettings>) => {
        setSettings(prev => {
            const next = { ...prev, ...updates };
            void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            return next;
        });
    }, []);

    const themeColors = useMemo(() => {
        if (settings.colorBlindMode) {
            return settings.highContrast
                ? { background: '#0F172A', surface: '#1E293B', accent: '#F59E0B', secondaryAccent: '#0EA5E9', text: '#F8FAFC', textOnAccent: '#111827', border: '#F59E0B' }
                : { background: '#F4F7FB', surface: '#FFFFFF', accent: '#005A9C', secondaryAccent: '#2D7D46', text: '#111827', textOnAccent: '#FFFFFF', border: '#2F6B9A' };
        }
        return { background: '#F2E9E4', surface: '#FFFFFF', accent: '#4A4E69', secondaryAccent: '#9A8C98', text: '#111111', textOnAccent: '#FFFFFF', border: '#4A4E69' };
    }, [settings.colorBlindMode, settings.highContrast]);

    const getFontFamily = (weight: string = 'regular') => {
        if (settings.fontFamily === 'system') return 'System';
        if (settings.fontFamily === 'serif') return 'serif';
        const weights: any = { black: 'Black', bold: 'Bold', semibold: 'SemiBold' };
        return `Exo2-${weights[weight] || 'Regular'}`;
    };

    return (
        <SettingsContext.Provider value={{
            settings,
            updateSettings,
            themeColors,
            getFontFamily,
            fontScale: settings.fontSize === 'small' ? 0.9 : settings.fontSize === 'large' ? 1.2 : 1
        }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useUserSettings = () => useContext(SettingsContext);