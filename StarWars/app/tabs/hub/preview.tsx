import React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

interface PreviewProps {
    onNavigate: (screen: 'code') => void;
}

const Preview: React.FC<PreviewProps> = ({onNavigate}) =>{
    return(
        <View style={styles.content}>
            <Text style={styles.title}>Exposition</Text>

            <Image
                source={require('../../../assets/images/expos/expo_carrieFisher.jpg')}
                style={styles.expoImage}
                resizeMode="contain"
            />

            <Text style={styles.expoDesc}>Exposition temporaire</Text>
            <Text style={styles.expoTitle}>Carrie Fisher : l’étoile rebelle</Text>


            <TouchableOpacity style={styles.mainButton}>
                <Text style={styles.mainButtonText}>Rejoindre</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => {onNavigate('code')}}
            >
                <Text style={styles.secondaryButtonText}>Retour</Text>
            </TouchableOpacity>
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
    expoDesc: {
        fontFamily: 'Exo2-SemiBold',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
    },
    expoTitle: {
        fontFamily: 'Exo2-Black',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 40,
    },
    mainButton: {
        backgroundColor: '#4A4E69',
        paddingVertical: 25,
        paddingHorizontal: 30,
        borderRadius: 25,
        width: '75%',
        height: '10%',
        alignItems: 'center',
        marginBottom: 50,
    },
    mainButtonText: {
        fontFamily: 'Exo2-SemiBold',
        color: '#FFF',
        fontSize: 20,
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderColor: '#4A4E69',
        borderWidth: 2,
        paddingVertical: 25,
        paddingHorizontal: 30,
        borderRadius: 25,
        width: '50%',
        height: '10%',
        alignItems: 'center',
        marginBottom: 50,
    },
    secondaryButtonText: {
        fontFamily: 'Exo2-SemiBold',
        color: '#4A4E69',
        fontSize: 14,
    },
    expoImage: {
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 40,
    },
});

export default Preview;