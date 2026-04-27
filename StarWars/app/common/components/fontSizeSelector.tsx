import React from 'react';
import ThemedText from "@/app/common/components/themedText";
import styles from "@/styles/hub/common";
import {TouchableOpacity, View} from "react-native";
import {useUserSettings} from "@/app/common/hooks/userSettings";
import {useTranslation} from "@/app/common/hooks/languageContext";

const FrontSizeSelector = () => {
    const {settings, updateSettings, themeColors} = useUserSettings();
    const {trad} = useTranslation();

    const setFontSize = (fontSize: 'small' | 'medium' | 'large') => updateSettings({ fontSize });

    return (
        <View style={styles.settingsOptionsContainer}>
            <ThemedText style={[styles.settingLabel, { color: themeColors.text }]}>
                {trad('settings.fontSize')}
            </ThemedText>

            <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
                <TouchableOpacity
                    style={[
                        styles.termsButton,
                        {
                            backgroundColor: settings.fontSize === 'small' ? themeColors.accent : '#A9A9A9',
                        },
                    ]}
                    onPress={() => setFontSize('small')}
                >
                    <ThemedText style={[styles.termsText, { color: themeColors.textOnAccent }]}>
                        {trad('settings.fontSizeSmall')}
                    </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.termsButton,
                        {
                            backgroundColor: settings.fontSize === 'medium' ? themeColors.accent : '#A9A9A9',
                        },
                    ]}
                    onPress={() => setFontSize('medium')}
                >
                    <ThemedText style={[styles.termsText, { color: themeColors.textOnAccent }]}>
                        {trad('settings.fontSizeMedium')}
                    </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.termsButton,
                        {
                            backgroundColor: settings.fontSize === 'large' ? themeColors.accent : '#A9A9A9',
                        },
                    ]}
                    onPress={() => setFontSize('large')}
                >
                    <ThemedText style={[styles.termsText, { color: themeColors.textOnAccent }]}>
                        {trad('settings.fontSizeLarge')}
                    </ThemedText>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default FrontSizeSelector;