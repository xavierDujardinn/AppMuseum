import { RootStackParamList } from "@/app";
import styles_starwars from "@/styles/expo/carrie-fisher/starwars";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ImageBackground } from "expo-image";
import React, {useEffect} from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import ThemedText from '@/app/common/components/themedText';
import {getCompletedChallengeList} from "@/app/common/scripts/storage";
import {EXPO_STORAGE_NAME} from "@/app/expos/carrie-fisher/utils";

interface MenuProps {
    onNavigate: (screen: 'home' | 'challenge', params?: any) => void;
    skipIntro?: boolean;
}

const Menu: React.FC<MenuProps> = ({ onNavigate, skipIntro }) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [isIntroPassed, setIsIntroPassed] = React.useState(skipIntro || false);

    const [completedChallengesList, setCompletedChallengesList] = React.useState([false, false, false]);

    useEffect(() => {
        // update for completed icons
        const updateChallenges = async () => {
            const completedChallenges = await getCompletedChallengeList(EXPO_STORAGE_NAME);
            if (completedChallenges) setCompletedChallengesList(completedChallenges);
        }
        updateChallenges();
    }, []);

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
                            style={styles_starwars.menuUnlockedChallengeButton}
                            onPress={() => { onNavigate('challenge', { challengeId: 0 }) }}
                        >
                            <View style={styles_starwars.menuButtonContent}>
                              <ThemedText
                                  style={styles_starwars.menuUnlockedChallengeButtonText}
                              >
                                  épreuve 1
                              </ThemedText>
                              { completedChallengesList[0] && (
                                <Image source={require('@/assets/images/expos/carrieFisher/winlogo.png')} style={styles_starwars.menuWinLogo} resizeMode="contain" />
                              )}
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles_starwars.menuUnlockedChallengeButton}
                            onPress={() => { onNavigate('challenge', { challengeId: 1 }) }}
                        >
                            <ThemedText
                                style={styles_starwars.menuUnlockedChallengeButtonText}
                            >
                                épreuve 2
                            </ThemedText>
                            { completedChallengesList[1] && (
                                <Image source={require('@/assets/images/expos/carrieFisher/winlogo.png')} style={styles_starwars.menuWinLogo} resizeMode="contain" />
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles_starwars.menuUnlockedChallengeButton}
                            onPress={() => { onNavigate('challenge', { challengeId: 2 }) }}
                        >
                            <ThemedText
                                style={styles_starwars.menuUnlockedChallengeButtonText}
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