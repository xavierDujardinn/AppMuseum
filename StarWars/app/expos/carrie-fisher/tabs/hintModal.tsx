import styles_starwars from '@/styles/expo/carrie-fisher/starwars';
import React, {useState} from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import {Image} from "expo-image";

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
                                    <Text style={styles_starwars.hintModalTitle}>Indice</Text>
                                    <TouchableOpacity onPress={() => setIsOpened(false)}>
                                        <Text style={styles_starwars.hintModalCloseIcon}>✕</Text>
                                    </TouchableOpacity>
                                </View>

                                <ScrollView style={styles_starwars.hintModalScrollText}>
                                    <Text style={styles_starwars.hintModalText}>
                                        R2D2 se trouve dans une zone où le magnétomètre semble indiquer une direction particulière.
                                    </Text>
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