import styles from '@/styles/hub/common';
import ThemedText from '@/app/common/components/themedText';
import React from 'react';
import {Image, ScrollView, TouchableOpacity, View} from "react-native";
import expos from '../../../config/expos.json';
import Preview from "./preview";
import {useTranslation} from "@/app/common/hooks/languageContext";

interface GalleryProps {
    onNavigate: (screen: 'connect' | 'expo', params?: any) => void;
}

const Gallery: React.FC<GalleryProps> = ({onNavigate}) => {
    const { trad} = useTranslation();

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
                <Image
                    source={require('../../../assets/images/escapemuseum.png')}
                    style={styles.middleImage}
                    resizeMode="contain"
                />
            </ScrollView>
    );
}

export default Gallery;