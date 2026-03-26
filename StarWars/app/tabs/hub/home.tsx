import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

interface HomeProps {
    onNavigate: (screen: 'home' | 'settings' | 'error') => void;
}

const Home: React.FC<HomeProps> = ({onNavigate}) => {

    return (
        <View style={styles.content}>
            <Text style={styles.title}>Escape Museum</Text>
            <Text style={styles.subtitle}>
                Découvrez nos{"\n"}expositions
            </Text>

            <TouchableOpacity
                style={styles.mainButton}
                onPress={() => onNavigate('error')}
            >
                <Text style={styles.mainButtonText}>Rejoindre une exposition</Text>
            </TouchableOpacity>

            <Image
                source={require('../../../assets/images/escapemuseum.png')}
                style={styles.middleImage}
                resizeMode="contain"
            />
            <Text style={styles.versionText}>v1.0.0 - Escape Museum</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontFamily: 'Exo2-Bold',
        fontSize: 36,
        color: '#000',
        marginBottom: 40,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    subtitle: {
        fontFamily: 'Exo2-Bold',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 40,
    },
    mainButton: {
        backgroundColor: '#4A4E69',
        paddingVertical: 25,
        paddingHorizontal: 30,
        borderRadius: 25,
        width: '100%',
        alignItems: 'center',
        marginBottom: 50,
    },
    mainButtonText: {
        fontFamily: 'Exo2-SemiBold',
        color: '#FFF',
        fontSize: 24,
    },
    middleImage: {
        width: '100%',
        height: 130,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    versionText: {
        position: 'absolute',
        bottom: 20,
        fontSize: 12,
        color: '#999',
        fontFamily: 'Exo2-SemiBold',
        textAlign: 'center',
    },
});

export default Home;