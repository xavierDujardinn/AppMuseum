import styles_starwars from '@/styles/expo/carrie-fisher/starwars';
import React, {useState} from 'react';
import { Modal, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import {Image} from "expo-image";
import ThemedText from '@/app/common/components/themedText';

interface HintModalProps {
    challengeId: number,
    theme: ("light" | "dark")
}

const images = {
    "light" : require('@/assets/images/expos/carrieFisher/hint_light.png'),
    "dark" : require('@/assets/images/expos/carrieFisher/hint_dark.png'),
}

const HintModal: React.FC<HintModalProps> = ({challengeId, theme}) => {
    const [isOpened, setIsOpened] = useState(false);

    // On ira chercher ça dans les fichiers de trads aussi
    const hintTextByChallenge: Record<number, string> = {
        0: "R2D2 se trouve dans une zone où le magnétomètre semble indiquer une direction particulière.",
        1: "Observez bien le labyrinthe et gardez des mouvements précis pour atteindre la zone GOAL.",
        2: "Cachez-vous dans une zone de plus faible luminosité pour faire baisser la lumière détectée par le capteur.",
    };
    const hintText = hintTextByChallenge[challengeId] ?? hintTextByChallenge[0];

    return (
        <>
            <TouchableOpacity
                style={styles_starwars.playingLucasHintButton}
                onPress={() => setIsOpened(true)}
            >
                <Image
                    source={images[theme]}
                    style={styles_starwars.playingLucasHintIcon}
                    contentFit="contain"
                />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isOpened}
                onRequestClose={() => setIsOpened(false)}
            >
                <TouchableWithoutFeedback onPress={() => setIsOpened(false)}>
                    <View style={styles_starwars.hintModalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles_starwars.hintModalContent}>
                                <View style={styles_starwars.hintModalHeader}>
                                    <ThemedText style={styles_starwars.hintModalTitle} weight="bold">Indice</ThemedText>
                                    <TouchableOpacity onPress={() => setIsOpened(false)}>
                                        <ThemedText style={styles_starwars.hintModalCloseIcon} weight="bold">✕</ThemedText>
                                    </TouchableOpacity>
                                </View>

                                <ScrollView style={styles_starwars.hintModalScrollText}>
                                    <ThemedText style={styles_starwars.hintModalText}>
                                        {hintText}
                                    </ThemedText>
                                </ScrollView>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
};

export default HintModal;