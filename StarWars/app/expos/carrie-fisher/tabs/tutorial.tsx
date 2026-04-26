import React from 'react';
import styles_starwars from '@/styles/expo/carrie-fisher/starwars';
import {TouchableOpacity, View} from "react-native";
import {ImageBackground} from "expo-image";
import ThemedText from '@/app/common/components/themedText';

interface TutorialProps {
    challengeId: number;
    onStart: () => void;
    onBack: () => void;
}

// A déplacer dans fichier de traductions pour chaque épreuve et on appelle le texte là bas c'est plus facile
const tutorialTextByChallenge: Record<number, string> = {
    0: "Pour cette épreuve, vous allez utiliser le magnétomètre, vous aurez besoin de bouger votre téléphone et d'avoir un espace dégagé autour de vous.",
    1: "Pour cette épreuve, suivez les indications affichées et restez attentif aux repères visuels.",
    2: "Pour cette épreuve, vous allez utiliser le capteur de lumière. Cherchez un endroit plus sombre pour faire baisser la luminosité détectée par le téléphone.",
};

const Tutorial: React.FC<TutorialProps> = ({challengeId, onStart, onBack}) => {
    const tutorialText = tutorialTextByChallenge[challengeId] ?? tutorialTextByChallenge[0];

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
                            <ThemedText style={styles_starwars.tutorialLucasButtonText} weight="bold">En avant!</ThemedText>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles_starwars.tutorialLucasButton} onPress={onBack}>
                            <ThemedText style={styles_starwars.tutorialLucasButtonText} weight="bold">Retourner au choix de challenge</ThemedText>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

export default Tutorial;