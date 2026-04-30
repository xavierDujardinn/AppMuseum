import styles_starwars from '@/styles/expo/carrie-fisher/starwars';
import React, {useEffect, useState} from 'react';
import {Modal, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {Image} from "expo-image";
import ThemedText from '@/app/common/components/themedText';
import {useTranslation} from "@/app/common/hooks/languageContext";
import useTimer from "@/app/expos/carrie-fisher/hooks/useTimer";

interface HintModalProps {
    challengeId: number,
    theme: ("light" | "dark"),
    onSkip: (id:number ,time: number) => void;
}

const images = {
    "hint_light" : require('@/assets/images/expos/carrieFisher/hint_light.png'),
    "hint_dark" : require('@/assets/images/expos/carrieFisher/hint_dark.png'),

    "skip_light" : require('@/assets/images/expos/carrieFisher/skip_light.png'),
    "skip_dark" : require('@/assets/images/expos/carrieFisher/skip_dark.png'),
}

const Help: React.FC<HintModalProps> = ({challengeId, theme, onSkip}) => {
    const {trad} = useTranslation();
    const {elapsedTime} = useTimer();
    const [isOpened, setIsOpened] = useState(false);
    const [hintOpenTime, setHintOpenTime] = useState(-1);
    const [isHintAvailable, setIsHintAvailable] = useState(false);
    const [isSkipAvailable, setIsSkipAvailable] = useState(false);

    const hintText = trad(`expo.carrie-fisher.challenges.${challengeId}.hint`);

    useEffect(() => {
        if (elapsedTime > 5 && !isHintAvailable) {
            setIsHintAvailable(true);
        } else if (elapsedTime - hintOpenTime > 15 && hintOpenTime > -1){
            setIsSkipAvailable(true);
        }
    }, [elapsedTime, hintOpenTime, isHintAvailable]);

    const openHintModal = () => {
        setIsOpened(isHintAvailable);
        setHintOpenTime(elapsedTime);
    }

    const closeHintModal = () => {
        setIsOpened(false);
        setIsHintAvailable(false);
    }

    const skip = () => {
        onSkip(challengeId, -1);
    }

    return (
        <>
        {( isHintAvailable && <TouchableOpacity
                style={styles_starwars.playingLucasHintButton}
                disabled={!isHintAvailable}
                onPress={openHintModal}

            >
                <Image
                    source={images[`hint_${theme}`]}
                    style={styles_starwars.playingLucasHintIcon}
                    contentFit="contain"
                />
            </TouchableOpacity>
        )}

        {(isSkipAvailable && <TouchableOpacity
                    style={styles_starwars.playingLucasHintButton}
                    disabled={!isSkipAvailable}
                    onPress={skip}

                >
                    <Image
                        source={images[`skip_${theme}`]}
                        style={styles_starwars.playingLucasHintIcon}
                        contentFit="contain"
                    />
                </TouchableOpacity>
        )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isOpened}
                onRequestClose={closeHintModal}
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

export default Help;