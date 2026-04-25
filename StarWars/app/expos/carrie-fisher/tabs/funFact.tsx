import styles_starwars from '@/styles/expo/carrie-fisher/starwars';
import {ImageBackground} from 'expo-image';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import {BG_LIST} from "@/app/expos/carrie-fisher/utils";
import ThemedText from '@/app/common/components/themedText';

interface FunfactLucasProps {
    challengeId: number;
    onScoreboard: () => void;
}

const FunFact: React.FC<FunfactLucasProps> = ({ challengeId, onScoreboard }) => {
    const text1 = "Les scènes de Leia sur Tatooine dans Le Retour du Jedi ont été tournées dans le désert, avec des températures extrêmes,"  ;
    const text2 = "mais Carrie Fisher tenait absolument à faire elle-même la scène où Leia étrangle Jaba avec sa chaîne." ;

    return (
        <View style={styles_starwars.funfactLucasContainer}>
            <ImageBackground
                source={BG_LIST[challengeId]}
                style={styles_starwars.funfactLucasBackgroundImage}
                contentFit="cover"
            />

            <View style={styles_starwars.funfactLucasImageGroup}>
                <ImageBackground
                    source={require('@/assets/images/expos/carrieFisher/carte.png')}
                    style={styles_starwars.funfactLucasImage}
                    contentFit="contain"
                >
                    <ThemedText style={styles_starwars.funFactText}>
                        {text1}
                    </ThemedText>
                </ImageBackground>

                <ImageBackground
                    source={require('@/assets/images/expos/carrieFisher/carte.png')}
                    style={styles_starwars.funfactLucasImage}
                    contentFit="contain"
                >
                    <ThemedText style={styles_starwars.funFactText}>
                        {text2}
                    </ThemedText>
                </ImageBackground>

                <TouchableOpacity style={styles_starwars.funfactLucasScoreButton} onPress={onScoreboard}>
                    <ThemedText style={styles_starwars.funfactLucasScoreButtonText} weight="bold">Tableau des scores</ThemedText>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default FunFact;