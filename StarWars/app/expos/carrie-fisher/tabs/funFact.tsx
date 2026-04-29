import ThemedText from '@/app/common/components/themedText';
import { useTranslation } from "@/app/common/hooks/languageContext";
import styles_starwars from '@/styles/expo/carrie-fisher/starwars';
import { BG_LIST } from "@/utils/expo/carrie-fisher/utils";
import { ImageBackground } from 'expo-image';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface FunfactLucasProps {
    challengeId: number;
    onScoreboard: () => void;
}

const FunFact: React.FC<FunfactLucasProps> = ({ challengeId, onScoreboard }) => {
    const {trad} = useTranslation();
    console.log(challengeId);
    const text1 = trad(`expo.carrie-fisher.challenges.${challengeId}.fun-fact-1`);
    const text2 = trad(`expo.carrie-fisher.challenges.${challengeId}.fun-fact-2`);

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
                    <ThemedText style={styles_starwars.funfactLucasScoreButtonText} weight="bold">
                        {trad('expo.funFact.scoreboard')}
                    </ThemedText>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default FunFact;