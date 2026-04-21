import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {useTranslation} from "@/app/common/hooks/languageContext";
import {EXPO_IMAGES} from "@/config/config";

interface PreviewProps {
    title: Record<string, string>;
    imageNameKey?: string;
}

const Preview: React.FC<PreviewProps> = ({ title, imageNameKey }) => {
    const {locale} = useTranslation();
    imageNameKey = imageNameKey || 'default';
    const expoTitle: string = title[locale];

    return (
        <View style={styles.cardContainer}>
            <View style={styles.leftSection}>
                <Image
                    source={EXPO_IMAGES[imageNameKey]}
                    style={styles.cardImage}
                    resizeMode="cover"
                />
            </View>

            <View style={styles.rightSection}>
                <Text style={styles.label}>Exposition</Text>
                <Text style={styles.cardTitle} numberOfLines={3}>
                    {expoTitle}
                </Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 120,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        marginBottom: 15,
        overflow: 'hidden',

        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,

        borderWidth: 1,
        borderColor: '#F2E9E4',
    },

    leftSection: {
        flex: 1,
        height: '100%',
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },

    rightSection: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 15,
        paddingVertical: 12,
        justifyContent: 'center',
    },

    label: {
        fontFamily: 'Exo2-Regular',
        fontSize: 10,
        color: '#9A8C98',
        textTransform: 'uppercase',
        marginBottom: 4,
        letterSpacing: 1,
    },

    cardTitle: {
        fontFamily: 'Exo2-Bold',
        fontSize: 16,
        color: '#4A4E69',
        lineHeight: 20,
    },
});

export default Preview;