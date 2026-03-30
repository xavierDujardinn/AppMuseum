import React from 'react'
import {Text, TouchableOpacity, View} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import styles from '../../../styles/hub/common'
import {useTranslation} from "@/app/hooks/languageContext";

interface ConnectProps {
    onNavigate: (screen: 'home' | 'connect' | 'code') => void;
}

const Connect: React.FC<ConnectProps> = ({onNavigate}) =>{
    const {trad} = useTranslation();

    return(
        <View style={styles.content}>
            <Text style={styles.title}>{trad('connect.title')}</Text>

            <Text style={styles.subtitle}>{trad('connect.choose')}</Text>

            <Feather name="bluetooth" size={75} color="#1a1a1a" />
            <TouchableOpacity style={styles.connectMainButton}>
                <Text style={styles.connectMainButtonText}>{trad('connect.bluetooth')}</Text>
            </TouchableOpacity>

            <Feather name="fast-forward" size={75} color="#1a1a1a" />
            <TouchableOpacity
                style={styles.connectThirdButton}
                onPress={() => onNavigate('code')}
            >
                <Text style={styles.connectMainButtonText}>{trad('connect.code')}</Text>
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