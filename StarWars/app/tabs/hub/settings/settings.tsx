import React from 'react';
import { View, Text} from 'react-native';
import Gtu from './gtu'
import styles from '../../../../styles/hub/common'
import LanguageSelector from "@/app/tabs/hub/settings/languageSelector";

const Settings: React.FC = () => {
    return (
        <>
            <View style={styles.settingContent}>
                <Text style={styles.title}>Paramètres</Text>
            </View>

            {/*Note : Please favorise usage of components like GTU so everything's logic is well abstracted, i think there are many libraries for what we need, use them.*/}

            <LanguageSelector/>
            <Gtu/>
        </>
);}

export default Settings;