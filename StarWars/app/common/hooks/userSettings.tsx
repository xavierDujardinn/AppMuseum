import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEY} from "@/config/config";

type FontSize = 'small' | 'medium' | 'large';
type FontFamilyOption = 'exo' | 'system' | 'serif';

interface UserSettings {
    userName: string;
    fontSize: FontSize;
    fontFamily: FontFamilyOption;
    colorBlindMode: boolean;
    darkMode: boolean;
}

const defaultSettings: UserSettings = {
    userName: '',
    fontSize: 'medium',
    fontFamily: 'exo',
    colorBlindMode: false,
    darkMode: false,
};

const SettingsContext = createContext<any>(undefined);

const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<UserSettings>(defaultSettings);

    useEffect(() => {
        const load = async () => {
            const raw = await AsyncStorage.getItem(`${STORAGE_KEY}_settings`);
            if (raw) setSettings({ ...defaultSettings, ...JSON.parse(raw) });
        };
        load();
    }, []);

    const updateSettings = useCallback((updates: Partial<UserSettings>) => {
        setSettings(prev => {
            const next = { ...prev, ...updates };
            void AsyncStorage.setItem(`${STORAGE_KEY}_settings`, JSON.stringify(next));
            return next;
        });
    }, []);

    const themeColors = useMemo(() => {
        if (settings.darkMode && settings.colorBlindMode) {
            return { background: '#0F172A', surface: '#1E293B', accent: '#F59E0B', secondaryAccent: '#0EA5E9', text: '#F8FAFC', textOnAccent: '#111827', border: '#F59E0B' };
        }
        if (settings.darkMode) {
            return { background: '#1A1A2E', surface: '#16213E', accent: '#9A8C98', secondaryAccent: '#4A4E69', text: '#E8E8E8', textOnAccent: '#FFFFFF', border: '#9A8C98' };
        }
        if (settings.colorBlindMode) {
            return { background: '#F4F7FB', surface: '#FFFFFF', accent: '#000000', secondaryAccent: '#6B7280', text: '#111827', textOnAccent: '#FFFFFF', border: '#000000' };
        }
        return { background: '#F2E9E4', surface: '#FFFFFF', accent: '#4A4E69', secondaryAccent: '#9A8C98', text: '#111111', textOnAccent: '#FFFFFF', border: '#4A4E69' };
    }, [settings.colorBlindMode, settings.darkMode]);

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

export default SettingsProvider;