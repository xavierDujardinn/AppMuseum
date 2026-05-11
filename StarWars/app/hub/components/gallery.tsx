import styles from '@/styles/hub/common';
import ThemedText from '@/app/common/components/themedText';
import React from 'react';
import {Image, ScrollView, TouchableOpacity, View} from "react-native";
import expos from '../../../config/expos.json';
import Preview from "./preview";
import {useTranslation} from "@/app/common/hooks/languageContext";
import {useUserSettings} from "@/app/common/hooks/userSettings";

interface GalleryProps {
    onNavigate: (screen: 'connect' | 'expo', params?: any) => void;
}

const Gallery: React.FC<GalleryProps> = ({onNavigate}) => {
    const { trad} = useTranslation();
    const { settings } = useUserSettings();

    return (
            <ScrollView
                style={styles.galleryScroll}
                contentContainerStyle={styles.galleryScrollContent}
            >
                <View
                    style={[styles.galleryBackground, { backgroundColor: '#4A4E69' }]}
                >
                    <ThemedText style={[styles.mainButtonText, { color: '#FFFFFF' }]} weight="semibold">{trad('gallery.title')}</ThemedText>

                    {expos.map((expo, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.galleryItem}
                            onPress={() => onNavigate('expo', expo )}
                        >
                            <Preview
                                title={expo.title}
                                imageNameKey={expo.image}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={settings.colorBlindMode && !settings.darkMode ? {
                    backgroundColor: '#4A4E69',
                    borderRadius: 16,
                    marginTop: 15,
                    padding: 8,
                } : undefined}>
                    <Image
                        source={require('../../../assets/images/escapemuseum.png')}
                        style={[styles.middleImage, settings.colorBlindMode && !settings.darkMode && { marginTop: 0 }]}
                        resizeMode="contain"
                    />
                </View>
            </ScrollView>
    );
}

export default Gallery;