import React, { useState, useEffect } from 'react';
import ThemedText from "@/app/common/components/themedText";
import styles from "@/styles/hub/common";
import { TextInput, View } from "react-native";
import { useUserSettings } from "@/app/common/hooks/userSettings";
import { useTranslation } from "@/app/common/hooks/languageContext";

const NameSelector = () => {
    const { settings, updateSettings, getFontFamily, themeColors } = useUserSettings();
    const { trad } = useTranslation();

    const [localName, setLocalName] = useState(settings.userName || "");

    useEffect(() => {
        if (settings.userName !== localName) {
            setLocalName(settings.userName || "");
        }
    }, [localName, settings.userName]);

    const handleChangeText = (text: string) => {
        setLocalName(text);
        updateSettings({ userName: text });
    };

    return (
        <View style={styles.settingsOptionsContainer}>
            <ThemedText style={[styles.settingLabel, { color: themeColors.text }]}>
                {trad('settings.currentUserName')}
            </ThemedText>
            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: themeColors.surface,
                        borderColor: themeColors.border,
                        color: themeColors.text,
                        fontFamily: getFontFamily('regular'),
                        marginTop: 8,
                    },
                ]}
                placeholder={trad('settings.userNamePlaceholder')}
                placeholderTextColor="#777777"
                value={localName}
                onChangeText={handleChangeText}
                autoCapitalize="words"
                maxLength={40}
            />
        </View>
    );
}

export default NameSelector;