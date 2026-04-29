import ThemedText from '@/app/common/components/themedText';
import { useTranslation } from "@/app/common/hooks/languageContext";
import styles_starwars from '@/styles/expo/carrie-fisher/starwars';
import { BG_LIST } from "@/utils/expo/carrie-fisher/utils";
import { Image, ImageBackground } from 'expo-image';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface WinProps {
    challengeId: number;
    onCardPress: () => void;
    onBackToMenu: () => void;
}

const Win: React.FC<WinProps> = ({challengeId, onCardPress, onBackToMenu}) => {
    const { trad } = useTranslation();

    return (
        <View style={styles_starwars.winLucasContainer}>
            <ImageBackground
                source={BG_LIST[challengeId]}
                style={styles_starwars.winLucasBackgroundImage}
                contentFit="cover"
            />

            <View style={styles_starwars.winLucasOverlay}>
                <ThemedText style={styles_starwars.winLucasTitle} weight="bold">
                    {trad('expo.win.title')}
                </ThemedText>

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
                    <ThemedText style={styles_starwars.winLucasBackButtonText} weight="bold">
                        {trad('expo.common.backToChallenges')}
                    </ThemedText>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Win;