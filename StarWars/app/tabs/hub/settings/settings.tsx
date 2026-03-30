import React from 'react';
import { View, Text} from 'react-native';
import Gtu from './gtu'
import styles from '../../../../styles/hub/common'
import LanguageSelector from "@/app/tabs/hub/settings/languageSelector";
import {useTranslation} from "@/app/hooks/languageContext";

const Settings: React.FC = () => {
    const { trad } = useTranslation();

    return (
        <>
            <View style={styles.settingContent}>
                <Text style={styles.title}>{trad('settings.title')}</Text>
            </View>

            {/*Note : Please favorise usage of components so everything's logic is well abstracted, i think there are many libraries for what we need, use them.*/}

            <LanguageSelector/>
            <Gtu/>
        </>
);}

export default Settings;