import React, { FC, useState } from 'react';
import { Modal, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
import { Image } from 'expo-image';
import ThemedText from "@/app/common/components/themedText";
import styles_starwars from '@/styles/expo/carrie-fisher/starwars';

const Map: FC = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <TouchableOpacity
                style={styles_starwars.mapButton}
                onPress={() => setModalVisible(true)}
            >
                <Image
                    source={ require('@/assets/images/expos/carrieFisher/map_icon.png')}
                    style={styles_starwars.playingLucasHintIcon}
                    contentFit="contain"
                />
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles_starwars.hintModalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles_starwars.hintModalContent}>
                                <View style={styles_starwars.hintModalHeader}>
                                    <ThemedText style={styles_starwars.hintModalTitle} weight="bold">
                                        Plan du Musée
                                    </ThemedText>
                                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                                        <ThemedText style={styles_starwars.hintModalCloseIcon}>✕</ThemedText>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles_starwars.funfactLucasImageGroup}>
                                    <Image
                                        source={require('@/assets/images/expos/carrieFisher/map.png')}
                                        style={styles_starwars.mapImage}
                                        contentFit="contain"
                                    />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}

export default Map;