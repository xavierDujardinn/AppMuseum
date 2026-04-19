import styles_starwars from '@/styles/expo/carrie-fisher/starwars';
import {Image,ImageBackground} from 'expo-image';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {BG_LIST} from "@/app/expos/carrie-fisher/utils";

interface WinProps {
    challengeId: number;
    onCardPress: () => void;
    onBackToMenu: () => void;
}

const Win: React.FC<WinProps> = ({challengeId, onCardPress, onBackToMenu}) => {
    return (
        <View style={styles_starwars.winLucasContainer}>
            <ImageBackground
                source={BG_LIST[challengeId]}
                style={styles_starwars.winLucasBackgroundImage}
                contentFit="cover"
            />

            <View style={styles_starwars.winLucasOverlay}>
                <Text style={styles_starwars.winLucasTitle}>
                    Bravo vous avez retrouvé{"\n"}R2D2 !
                </Text>

                <Image
                    source={require('@/assets/images/expos/carrieFisher/lucas/R2D2.png')}
                    style={styles_starwars.winLucasR2D2}
                    contentFit="contain"
                />

                <TouchableOpacity style={styles_starwars.winLucasCardButton} onPress={onCardPress}>
                    <Image
                        source={require('@/assets/images/expos/carrieFisher/carte.png')}
                        style={styles_starwars.winLucasCard}
                        contentFit="contain"
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles_starwars.winLucasBackButton} onPress={onBackToMenu}>
                    <Text style={styles_starwars.winLucasBackButtonText}>
                        Retour au menu des challenges
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Win;