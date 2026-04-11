import React from 'react';
import { View, Text} from 'react-native';
import Gtu from '../components/gtu'
import styles from '../../../styles/hub/common'
import LanguageSelector from "@/app/common/components/languageSelector";
import {useTranslation} from "@/app/hooks/languageContext";

const Settings: React.FC = () => {
    const { trad } = useTranslation();

    return (
        <>
            <View style={styles.settingContent}>
                <Text style={styles.title}>{trad('settings.title')}</Text>
            </View>

            <LanguageSelector/>
            <Gtu/>
        </>
);}

export default Settings;