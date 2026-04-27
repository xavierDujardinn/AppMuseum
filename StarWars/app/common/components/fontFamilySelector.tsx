import React from 'react';
import ThemedText from "@/app/common/components/themedText";
import styles from "@/styles/hub/common";
import {TouchableOpacity, View} from "react-native";
import {useUserSettings} from "@/app/common/hooks/userSettings";
import {useTranslation} from "@/app/common/hooks/languageContext";

const FrontFamilySelector = () => {
    const {settings, updateSettings, themeColors} = useUserSettings();
    const {trad} = useTranslation();

    const setFontFamily = (fontFamily: 'exo' | 'system' | 'serif') => updateSettings({ fontFamily });

    return (
        <View style={styles.settingsOptionsContainer}>
            <ThemedText style={[styles.settingLabel, { color: themeColors.text }]}>
                {trad('settings.fontFamily')}
            </ThemedText>

            <View style={{ flexDirection: 'row', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
                <TouchableOpacity
                    style={[
                        styles.termsButton,
                        {
                            backgroundColor: settings.fontFamily === 'exo' ? themeColors.secondaryAccent : '#A9A9A9',
                        },
                    ]}
                    onPress={() => setFontFamily('exo')}
                >
                    <ThemedText style={[styles.termsText, { color: themeColors.textOnAccent }]}>
                        {trad('settings.fontExo')}
                    </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.termsButton,
                        {
                            backgroundColor: settings.fontFamily === 'system' ? themeColors.secondaryAccent : '#A9A9A9',
                        },
                    ]}
                    onPress={() => setFontFamily('system')}
                >
                    <ThemedText style={[styles.termsText, { color: themeColors.textOnAccent }]}>
                        {trad('settings.fontSystem')}
                    </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.termsButton,
                        {
                            backgroundColor: settings.fontFamily === 'serif' ? themeColors.secondaryAccent : '#A9A9A9',
                        },
                    ]}
                    onPress={() => setFontFamily('serif')}
                >
                    <ThemedText style={[styles.termsText, { color: themeColors.textOnAccent }]}>
                        {trad('settings.fontSerif')}
                    </ThemedText>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default FrontFamilySelector;