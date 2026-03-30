import React from 'react'
import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from '../../../styles/hub/common'

interface PreviewProps {
    onNavigate: (screen: 'code') => void;
}

const Preview: React.FC<PreviewProps> = ({onNavigate}) =>{
    return(
        <View style={styles.content}>
            <Text style={styles.title}>Exposition</Text>

            <Image
                source={require('../../../assets/images/expos/expo_carrieFisher.jpg')}
                style={styles.expoImage}
                resizeMode="contain"
            />

            <Text style={styles.expoDesc}>Exposition temporaire</Text>
            <Text style={styles.expoTitle}>Carrie Fisher : l’étoile rebelle</Text>


            <TouchableOpacity style={styles.mainButton}>
                <Text style={styles.mainButtonText}>Rejoindre</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => {onNavigate('code')}}
            >
                <Text style={styles.secondaryButtonText}>Retour</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Preview;