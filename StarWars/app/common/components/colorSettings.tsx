import React from 'react';
import ThemedText from "@/app/common/components/themedText";
import styles from "@/styles/hub/common";
import {Switch, View} from "react-native";
import {useUserSettings} from "@/app/common/hooks/userSettings";
import {useTranslation} from "@/app/common/hooks/languageContext";

const ColorSettings = () => {
    const {settings, updateSettings, themeColors} = useUserSettings();
    const {trad} = useTranslation();

    const setColorBlindMode = (colorBlindMode: boolean) => updateSettings({ colorBlindMode });
    const setHighContrast = (highContrast: boolean) => updateSettings({ highContrast });

    return (
        <View style={styles.settingsOptionsContainer}>
            <View style={styles.settingRow}>
                <ThemedText style={[styles.settingLabel, { color: themeColors.text }]}>
                    {trad('settings.colorBlindMode')}
                </ThemedText>
                <Switch
                    value={settings.colorBlindMode}
                    onValueChange={setColorBlindMode}
                    accessibilityRole="switch"
                    accessibilityLabel={trad('settings.colorBlindMode')}
                    trackColor={{ false: '#8E8E93', true: themeColors.accent }}
                    thumbColor="#FFFFFF"
                />
            </View>
            <View style={styles.settingRow}>
                <ThemedText style={[styles.settingLabel, { color: themeColors.text }]}>
                    {trad('settings.highContrast')}
                </ThemedText>
                <Switch
                    value={settings.highContrast}
                    onValueChange={setHighContrast}
                    accessibilityRole="switch"
                    accessibilityLabel={trad('settings.highContrast')}
                    trackColor={{ false: '#8E8E93', true: themeColors.secondaryAccent }}
                    thumbColor="#FFFFFF"
                />
            </View>
        </View>
    );
}

export default ColorSettings;