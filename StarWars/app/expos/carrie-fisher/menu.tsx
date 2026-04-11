import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/app";
import {ImageBackground} from "expo-image";

interface MenuProps {
    onNavigate: (screen: 'home' | 'challenge', params?: any) => void;
    skipIntro?: boolean;
}

const Menu: React.FC<MenuProps> = ({onNavigate, skipIntro}) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [isIntroPassed, setIsIntroPassed] = React.useState(skipIntro || false);
    const [unLockedChallengesList, setUnLockedChallengesList] = React.useState([true, true, false]);

    return (
        <ImageBackground
            source={require('@/assets/images/expos/carrieFisher/space_background.jpg')}
            style={styles.backgroundImage}
        >
            <View style={styles.content}>
                {!isIntroPassed ? (
                    /*Intro text*/
                    <>
                        <Text style={styles.text}>
                            {/*No capital letter the font does not support it*/}
                            vous allez entrer dans un espace plein de challenge, préparez vous !
                        </Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setIsIntroPassed(true)}
                    >
                        <Text style={styles.textButton}>Suivant</Text>
                    </TouchableOpacity>
                    </>

                ) : (
                /*Menu */
                <>
                    <TouchableOpacity
                        style={unLockedChallengesList[0] ? styles.unlockedChallengeButton : styles.lockedChallengeButton}
                        disabled={!unLockedChallengesList[0]}
                        onPress={() => {onNavigate('challenge', {challengeId:0})}}
                    >
                        <Text
                            style={unLockedChallengesList[0] ? styles.unlockedChallengeButtonText : styles.lockedChallengeButtonText}
                        >
                            épreuve 1
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={unLockedChallengesList[1] ? styles.unlockedChallengeButton : styles.lockedChallengeButton}
                        disabled={!unLockedChallengesList[1]}
                        onPress={() => {onNavigate('challenge', {challengeId:1})}}
                    >
                        <Text
                            style={unLockedChallengesList[1] ? styles.unlockedChallengeButtonText : styles.lockedChallengeButtonText}
                        >
                            épreuve 2
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={unLockedChallengesList[2] ? styles.unlockedChallengeButton : styles.lockedChallengeButton}
                        disabled={!unLockedChallengesList[2]}
                        onPress={() => {onNavigate('challenge', {challengeId:2})}}
                    >
                        <Text
                            style={unLockedChallengesList[2] ? styles.unlockedChallengeButtonText : styles.lockedChallengeButtonText}
                        >
                            épreuve 3
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {navigation.navigate('Hub');}}
                    >
                        <Text style={styles.textButton}>Retour au menu principal</Text>
                    </TouchableOpacity>
                </>
                )}
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    text: {
        color: '#F0A820',
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'StarJedi',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        paddingVertical: 110,
    },
    button: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'red',
        borderStyle: 'solid',
        paddingVertical: 25,
        paddingHorizontal: 30,
        borderRadius: 25,
        width: '80%',
        alignItems: 'center',
        marginBottom: 50,
    },
    textButton: {
        textAlign: 'center',
        fontFamily: 'Exo2-SemiBold',
        color: '#F0A820',
        fontSize: 24,
    },
    lockedChallengeButton: {
        backgroundColor: 'rgba(50, 50, 50, 0.6)',
        borderWidth: 2,
        borderColor: '#444',
        borderStyle: 'dashed',
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 15,
        width: '60%',
        alignItems: 'center',
        marginBottom: 50,
        opacity: 0.6,
    },
    lockedChallengeButtonText: {
        fontFamily: 'StarJedi',
        color: '#888',
        fontSize: 22,
        textAlign: 'center',
        textShadowColor: '#888',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    unlockedChallengeButton: {
        backgroundColor: 'rgba(0, 210, 255, 0.15)',
        borderWidth: 2,
        borderColor: '#00D2FF',
        borderStyle: 'solid',
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 15,
        width: '60%',
        alignItems: 'center',
        marginBottom: 50,
        shadowColor: '#00D2FF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
    },
    unlockedChallengeButtonText: {
        fontFamily: 'StarJedi',
        color: '#00D2FF',
        fontSize: 22,
        textAlign: 'center',
        textShadowColor: '#00D2FF',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    }
})

export default Menu;