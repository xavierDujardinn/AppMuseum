import React from 'react'
import {Text, TouchableOpacity, View} from "react-native";
import styles from '../../../styles/hub/common'
import {useTranslation} from "@/app/hooks/languageContext";

interface ConnectProps {
    onNavigate: (screen: 'home' | 'connect' | 'code' | 'gallery') => void;
}

const Connect: React.FC<ConnectProps> = ({onNavigate}) =>{
    const {trad} = useTranslation();

    return(
        <View style={styles.content}>
            <Text style={styles.title}>{trad('connect.title')}</Text>

            <Text style={styles.subtitle}>{trad('connect.choose')}</Text>

            <TouchableOpacity style={styles.connectMainButton}>
                <Text style={styles.connectMainButtonText}>{trad('connect.bluetooth')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.connectThirdButton}
                onPress={() => onNavigate('code')}
            >
                <Text style={styles.connectMainButtonText}>{trad('connect.code')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.connectMainButton}
                onPress={() => onNavigate('gallery')}
            >
                <Text style={styles.connectMainButtonText}>{trad('connect.gallery')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => onNavigate('home')}
            >
                <Text style={styles.secondaryButtonText}>{trad('common.back')}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Connect;