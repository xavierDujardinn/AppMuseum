import { RootStackParamList } from "@/app";
import styles_starwars from "@/styles/expo/carrie-fisher/starwars";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ImageBackground } from "expo-image";
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import ThemedText from '@/app/common/components/themedText';

interface MenuProps {
    onNavigate: (screen: 'home' | 'challenge', params?: any) => void;
    skipIntro?: boolean;
}

const Menu: React.FC<MenuProps> = ({ onNavigate, skipIntro }) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [isIntroPassed, setIsIntroPassed] = React.useState(skipIntro || false);

    // On gèrera ça plus tard avec le système de sauvegarde
    const [unLockedChallengesList, setUnLockedChallengesList] = React.useState([true, true, true]);
    const [completedChallengesList, setCompletedChallengesList] = React.useState([true, false, false]);

    return (
        <ImageBackground
            source={require('@/assets/images/expos/carrieFisher/space_background.jpg')}
            style={styles_starwars.menuBackgroundImage}
        >
            <View style={styles_starwars.menuContent}>
                {!isIntroPassed ? (
                    <>
                        <ThemedText style={styles_starwars.menuIntroText}>
                            vous allez entrer dans un espace plein de challenge, préparez vous !
                        </ThemedText>
                        <TouchableOpacity
                            style={styles_starwars.menuMainButton}
                            onPress={() => setIsIntroPassed(true)}
                        >
                            <ThemedText style={styles_starwars.menuMainButtonText} weight="bold">Suivant</ThemedText>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <TouchableOpacity
                            style={unLockedChallengesList[0] ? styles_starwars.menuUnlockedChallengeButton : styles_starwars.menuLockedChallengeButton}
                            disabled={!unLockedChallengesList[0]}
                            onPress={() => { onNavigate('challenge', { challengeId: 0 }) }}
                        >
                            <View style={styles_starwars.menuButtonContent}>
                              <ThemedText
                                  style={unLockedChallengesList[0] ? styles_starwars.menuUnlockedChallengeButtonText : styles_starwars.menuLockedChallengeButtonText}
                              >
                                  épreuve 1
                              </ThemedText>
                              { completedChallengesList[0] && (
                                <Image source={require('@/assets/images/expos/carrieFisher/winlogo.png')} style={styles_starwars.menuWinLogo} resizeMode="contain" />
                              )}
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={unLockedChallengesList[1] ? styles_starwars.menuUnlockedChallengeButton : styles_starwars.menuLockedChallengeButton}
                            disabled={!unLockedChallengesList[1]}
                            onPress={() => { onNavigate('challenge', { challengeId: 1 }) }}
                        >
                            <ThemedText
                                style={unLockedChallengesList[1] ? styles_starwars.menuUnlockedChallengeButtonText : styles_starwars.menuLockedChallengeButtonText}
                            >
                                épreuve 2
                            </ThemedText>
                            { completedChallengesList[1] && (
                                <Image source={require('@/assets/images/expos/carrieFisher/winlogo.png')} style={styles_starwars.menuWinLogo} resizeMode="contain" />
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={unLockedChallengesList[2] ? styles_starwars.menuUnlockedChallengeButton : styles_starwars.menuLockedChallengeButton}
                            disabled={!unLockedChallengesList[2]}
                            onPress={() => { onNavigate('challenge', { challengeId: 2 }) }}
                        >
                            <ThemedText
                                style={unLockedChallengesList[2] ? styles_starwars.menuUnlockedChallengeButtonText : styles_starwars.menuLockedChallengeButtonText}
                            >
                                épreuve 3
                            </ThemedText>
                            { completedChallengesList[2] && (
                                <Image source={require('@/assets/images/expos/carrieFisher/winlogo.png')} style={styles_starwars.menuWinLogo} resizeMode="contain" />
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles_starwars.menuMainButton}
                            onPress={() => { navigation.navigate('Hub'); }}
                        >
                            <ThemedText style={styles_starwars.menuMainButtonText} weight="bold">Retour au menu principal</ThemedText>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </ImageBackground>
    );
};

export default Menu;