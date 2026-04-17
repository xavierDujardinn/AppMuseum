import { useTranslation } from "@/app/hooks/languageContext";
import styles from '@/styles/hub/common';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import expos from '../../../config/expos.json';
import Preview from "../components/preview";

interface GalleryProps {
    onNavigate: (screen: 'connect' | 'expo', params?: any) => void;
}

const Gallery: React.FC<GalleryProps> = ({onNavigate}) => {
    const {trad} = useTranslation();

    return (
        <View style={styles.content}>
            <Text style={styles.title}>{trad('preview.title')}</Text>

            <ScrollView
                style={styles.galleryScroll}
                contentContainerStyle={styles.galleryScrollContent}
            >
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
            </ScrollView>

            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => {onNavigate('connect')}}
            >
                <Text style={styles.secondaryButtonText}>{trad('common.back')}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Gallery;