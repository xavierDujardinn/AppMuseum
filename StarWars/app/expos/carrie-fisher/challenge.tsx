import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ImageBackground} from "expo-image";

interface ChallengeProps {
    challengeId: number,
    onNavigate: (screen: 'home', params?: any) => void;
}

type ChallengeStates = 'tutorial' | 'playing' | 'scoreboard';

const Challenge: React.FC<ChallengeProps> = ({challengeId, onNavigate}) => {
    const [challengeState, setChallengeState] = React.useState<ChallengeStates>('tutorial');

    // Function we should pass to challenges components to handle changes between states
    const handleStateChange = (newState: ChallengeStates): void => {
        setChallengeState(newState);
    }

    // On supprimera les trucs de boutons et autres quand on aura de vrais épreuves. Logiquement ici il ne devrait y avoir aucun style pour que ce soit les épreuves qui en soit responsable.
    // Pour les indices et les textes de fin je pense que c'est mieux si c'est geré dans le composant de l'épreuve lui-même. Vous n'aurez qu'à ajouter un bouton mais le mettez pas dans le header ça va foutre la merde
    const renderChallenge = () => {
        switch (challengeId){
            // épreuve lucas
            case 0:
            // épreuve Xavier
            case 1:
            // épreuve Louis
            case 2:
            default:
                return (
                    <View style={styles.content}>
                        <Text>
                            Challenge très très dur {challengeId}
                        </Text>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {handleStateChange('scoreboard')}}
                        >
                            <Text style={styles.textButton}>Cliquez moi dessus !</Text>
                        </TouchableOpacity>
                    </View>
                );
        }
    }

    const renderTutorial = () => {
        switch (challengeId){
            case 0:
            case 1:
            case 2:
            default:
                return (
                    <View style={styles.content}>
                          <TouchableOpacity
                          style={styles.button}
                          onPress={() => {handleStateChange('playing');}}
                          >
                              <Text style={styles.textButton}>Cliquez pour passer le tuto</Text>
                          </TouchableOpacity>
                    </View>
                );
        }
    }

    const renderScoreboard = () => {
        switch (challengeId){
            case 0:
            case 1:
            case 2:
            default:
                return (
                    <ImageBackground
                        source={require('@/assets/images/expos/carrieFisher/space_background.jpg')}
                        style={styles.backgroundImage}
                    >
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {onNavigate('home', {skipIntro: true});}}
                        >
                            <Text style={styles.textButton}>Retourner au menu</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                );
        }
    }

    return (
        <>
            {(() => {
                switch (challengeState) {
                    case 'tutorial':
                        return renderTutorial();
                    case 'playing':
                        return renderChallenge();
                    case 'scoreboard':
                        return renderScoreboard();
                    default:
                        return null;
                }
            })()}
        </>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
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
    backgroundImage: {
        flex: 1,
    },
})

export default Challenge;