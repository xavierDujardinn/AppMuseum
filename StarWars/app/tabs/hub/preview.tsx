import React from 'react'
import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from '../../../styles/hub/common';
import {useTranslation} from "@/app/hooks/languageContext";

interface PreviewProps {
    onNavigate: (screen: 'code') => void;
}

const Preview: React.FC<PreviewProps> = ({onNavigate}) =>{
    const {trad} = useTranslation();

    return(
        <View style={styles.content}>
            <Text style={styles.title}>{trad('preview.title')}</Text>

            <Image
                source={require('../../../assets/images/expos/expo_carrieFisher.jpg')}
                style={styles.expoImage}
                resizeMode="contain"
            />

            <Text style={styles.expoDesc}>{trad('preview.desc')}</Text>
            <Text style={styles.expoTitle}>{trad('preview.expoTitle')}</Text>


            <TouchableOpacity style={styles.mainButton}>
                <Text style={styles.mainButtonText}>{trad('preview.join')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => {onNavigate('code')}}
            >
                <Text style={styles.secondaryButtonText}>{trad('common.back')}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Preview;