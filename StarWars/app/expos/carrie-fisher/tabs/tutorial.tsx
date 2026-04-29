import ThemedText from '@/app/common/components/themedText';
import { useTranslation } from "@/app/common/hooks/languageContext";
import styles_starwars from '@/styles/expo/carrie-fisher/starwars';
import { ImageBackground } from "expo-image";
import React from 'react';
import { TouchableOpacity, View } from "react-native";

interface TutorialProps {
    challengeId: number;
    onStart: () => void;
    onBack: () => void;
}

const Tutorial: React.FC<TutorialProps> = ({challengeId, onStart, onBack}) => {
    const {trad} = useTranslation();
    const tutorialText = trad(`expo.carrie-fisher.challenges.${challengeId}.tutorial`);

    return (
        <View style={styles_starwars.tutorialLucasContainer}>
            <ImageBackground
                source={require('@/assets/images/expos/carrieFisher/space_background.jpg')}
                style={styles_starwars.tutorialLucasBackgroundImage}
            >
                <View style={styles_starwars.tutorialLucasOverlay}>
                    <View style={styles_starwars.tutorialLucasContent}>
                        <View style={styles_starwars.tutorialLucasTextWrapper}>
                            <ThemedText style={styles_starwars.tutorialLucasText}>{tutorialText}</ThemedText>
                        </View>

                        <TouchableOpacity style={styles_starwars.tutorialLucasButton} onPress={onStart}>
                            <ThemedText style={styles_starwars.tutorialLucasButtonText} weight="bold">
                                {trad('expo.tutorial.start')}
                            </ThemedText>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles_starwars.tutorialLucasButton} onPress={onBack}>
                            <ThemedText style={styles_starwars.tutorialLucasButtonText} weight="bold">
                                {trad('expo.tutorial.backToChallengeChoice')}
                            </ThemedText>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

export default Tutorial;