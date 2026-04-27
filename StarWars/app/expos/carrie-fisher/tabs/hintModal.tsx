import styles_starwars from '@/styles/expo/carrie-fisher/starwars';
import React, {useState} from 'react';
import { Modal, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import {Image} from "expo-image";
import ThemedText from '@/app/common/components/themedText';
import {useTranslation} from "@/app/common/hooks/languageContext";

interface HintModalProps {
    challengeId: number,
    theme: ("light" | "dark")
}

const images = {
    "light" : require('@/assets/images/expos/carrieFisher/hint_light.png'),
    "dark" : require('@/assets/images/expos/carrieFisher/hint_dark.png'),
}

const HintModal: React.FC<HintModalProps> = ({challengeId, theme}) => {
    const {trad} = useTranslation();
    const [isOpened, setIsOpened] = useState(false);


    const hintText = trad(`expo.carrie-fisher.challenges.${challengeId}.hint`);

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