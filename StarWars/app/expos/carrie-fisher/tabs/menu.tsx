import { RootStackParamList } from "@/app";
import ThemedText from '@/app/common/components/themedText';
import { useTranslation } from "@/app/common/hooks/languageContext";
import Map from '@/app/expos/carrie-fisher/components/map';
import styles_starwars from "@/styles/expo/carrie-fisher/starwars";
import { getCompletedChallengeList } from "@/utils/common/storage";
import {EXPO_NB_CHALLENGES, EXPO_STORAGE_NAME} from "@/utils/expo/carrie-fisher/utils";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ImageBackground } from "expo-image";
import React, {useEffect, useState} from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';

interface MenuProps {
  onNavigate: (screen: 'home' | 'challenge' | 'scoreboard', params?: any) => void;
  skipIntro?: boolean;
}

const Menu: React.FC<MenuProps> = ({onNavigate, skipIntro}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { trad } = useTranslation();

  const [isIntroPassed, setIsIntroPassed] = React.useState(skipIntro || false);
  const [completedChallengesList, setCompletedChallengesList] = React.useState([false, false, false]);
  const [finalScoreboardAccessible, setFinalScoreboardAccessible] = useState<boolean>(false);

  useEffect(() => {
    const updateChallenges = async () => {
      const completedChallenges = await getCompletedChallengeList(EXPO_STORAGE_NAME);
      if (completedChallenges) setCompletedChallengesList(completedChallenges);

      const nbChallenges = EXPO_NB_CHALLENGES;
        if (nbChallenges > 0) {
            const nbCompleted = completedChallengesList.filter(challenge => challenge).length;
            setFinalScoreboardAccessible(nbChallenges === nbCompleted);
        }
    };

    updateChallenges();
  }, [completedChallengesList]);

  return (
    <ImageBackground
      source={require('@/assets/images/expos/carrieFisher/sb.jpg')}
      style={styles_starwars.menuBackgroundImage}
      contentFit="cover"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles_starwars.menuScrollContent}
      >
        <View style={styles_starwars.menuContent}>
          {!isIntroPassed ? (
            <>
              <ThemedText style={styles_starwars.menuIntroText}>
                {trad('expo.carrie-fisher.menu.intro')}
              </ThemedText>

              <TouchableOpacity
                style={styles_starwars.menuMainButton}
                onPress={() => setIsIntroPassed(true)}
              >
                <ThemedText style={styles_starwars.menuMainButtonText} weight="bold">
                  {trad('expo.carrie-fisher.common.next')}
                </ThemedText>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Map />

              <TouchableOpacity
                style={styles_starwars.menuUnlockedChallengeButton}
                onPress={() => onNavigate('challenge', { challengeId: 0 })}
              >
                <View style={styles_starwars.menuButtonContent}>
                  <ThemedText style={styles_starwars.menuUnlockedChallengeButtonText}>
                    {trad('expo.carrie-fisher.menu.challenge1')}
                  </ThemedText>
                  {completedChallengesList[0] && (
                    <Image
                      source={require('@/assets/images/expos/carrieFisher/winlogo.png')}
                      style={styles_starwars.menuWinLogo}
                      resizeMode="contain"
                    />
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles_starwars.menuUnlockedChallengeButton}
                onPress={() => onNavigate('challenge', { challengeId: 1 })}
              >
                <View style={styles_starwars.menuButtonContent}>
                  <ThemedText style={styles_starwars.menuUnlockedChallengeButtonText}>
                    {trad('expo.carrie-fisher.menu.challenge2')}
                  </ThemedText>
                  {completedChallengesList[1] && (
                    <Image
                      source={require('@/assets/images/expos/carrieFisher/winlogo.png')}
                      style={styles_starwars.menuWinLogo}
                      resizeMode="contain"
                    />
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles_starwars.menuUnlockedChallengeButton}
                onPress={() => onNavigate('challenge', { challengeId: 2 })}
              >
                <View style={styles_starwars.menuButtonContent}>
                  <ThemedText style={styles_starwars.menuUnlockedChallengeButtonText}>
                    {trad('expo.carrie-fisher.menu.challenge3')}
                  </ThemedText>
                  {completedChallengesList[2] && (
                    <Image
                      source={require('@/assets/images/expos/carrieFisher/winlogo.png')}
                      style={styles_starwars.menuWinLogo}
                      resizeMode="contain"
                    />
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles_starwars.menuUnlockedChallengeButton,
                  !finalScoreboardAccessible && styles_starwars.menuMainButtonDisabled
                ]}
                onPress={() => {
                  if (finalScoreboardAccessible) {
                    onNavigate('scoreboard');
                  }
                }}
                disabled={!finalScoreboardAccessible}
              >
                <ThemedText style={styles_starwars.menuUnlockedChallengeButtonText}>
                  {trad('expo.carrie-fisher.menu.finalScoreboard')}
                </ThemedText>
              </TouchableOpacity>

              {!finalScoreboardAccessible && (
                <ThemedText style={styles_starwars.menuLockedText}>
                  {trad('expo.carrie-fisher.menu.finalScoreboardLocked')}
                </ThemedText>
              )}

              <TouchableOpacity
                style={styles_starwars.menuUnlockedChallengeButton}
                onPress={() => navigation.navigate('Hub')}
              >
                <ThemedText style={styles_starwars.menuUnlockedChallengeButtonText}>
                  {trad('expo.carrie-fisher.menu.backToMainMenu')}
                </ThemedText>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Menu;