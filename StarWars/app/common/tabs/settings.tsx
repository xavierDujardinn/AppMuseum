import LanguageSelector from "@/app/common/components/languageSelector";
import ThemedText from "@/app/common/components/themedText";
import { useTranslation } from "@/app/common/hooks/languageContext";
import styles from '@/styles/hub/common';
import React from 'react';
import {ScrollView, View} from 'react-native';
import Gtu from '../components/gtu';
import {useUserSettings} from "@/app/common/hooks/userSettings";
import NameSelector from "@/app/common/components/nameSelector";
import FontSizeSelector from "@/app/common/components/fontSizeSelector";
import FontFamilySelector from "@/app/common/components/fontFamilySelector";
import ColorSettings from "@/app/common/components/colorSettings";
import DataResetButton from "@/app/common/components/dataResetButton";

const Settings: React.FC = () => {
    const {themeColors} = useUserSettings();
    const {trad} = useTranslation();

    return (
        <View style={[styles.settingsScreen, { backgroundColor: themeColors.background }]}>
            <ThemedText style={[styles.title, { color: themeColors.text }]}>{trad('settings.title')}</ThemedText>
            <ScrollView>
                <View style={styles.settingsTopBlock}>
                    <LanguageSelector />
                </View>

                <NameSelector/>
                <FontSizeSelector/>
                <FontFamilySelector/>
                <ColorSettings/>
                <DataResetButton/>

                <Gtu />
                <ThemedText style={styles.versionText}>v1.0.0 - Escape Museum</ThemedText>
            </ScrollView>
        </View>
    );
};

export default Settings;