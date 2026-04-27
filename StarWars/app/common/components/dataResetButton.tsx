import React from 'react';
import ThemedText from "@/app/common/components/themedText";
import styles from "@/styles/hub/common";
import {Alert, TouchableOpacity, View} from "react-native";
import {useUserSettings} from "@/app/common/hooks/userSettings";
import {useTranslation} from "@/app/common/hooks/languageContext";
import {resetAllData} from "@/utils/common/storage";

const DataResetButton = () => {
    const {settings} = useUserSettings();
    const {trad} = useTranslation();

    return (
        <View style={styles.settingsOptionsContainer}>
            <TouchableOpacity
                style={[
                    styles.secondaryButton,
                    { borderColor: '#C62828', borderWidth: 1.5, backgroundColor: 'rgba(198, 40, 40, 0.1)' }
                ]}
                onPress={() => {
                    Alert.alert(
                        trad('common.warning'),
                        trad('common.confirm'),
                        [
                            { text: trad('common.back'), style: "cancel" },
                            {
                                text: trad('common.confirm'),
                                style: "destructive",
                                onPress: async () => await resetAllData()
                            }
                        ]
                    );
                }}
            >
                <ThemedText style={{ color: '#C62828', fontFamily: settings.fontFamily, textAlign: 'center' }}>{trad('settings.clearData')}</ThemedText>
            </TouchableOpacity>
        </View>
    );
}

export default DataResetButton;