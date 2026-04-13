import { ImageBackground } from "expo-image";
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Funfact_lucas from './lucas-components/funfact';
import Playing_lucas from "./lucas-components/playing";
import Scoreboard_lucas from './lucas-components/scoreboard';
import Tutorial_lucas from "./lucas-components/tutorial";
import Win_lucas from "./lucas-components/win";

type ChallengeStates = 'tutorial' | 'playing' | 'win' | 'funfact' | 'scoreboard';

interface ChallengeProps {
  challengeId: number;
  challengeState: ChallengeStates;
  onChallengeStateChange: (newState: ChallengeStates) => void;
  onNavigate: (screen: 'home' | 'settings' | 'error' | 'challenge', params?: any) => void;
}

const Challenge: React.FC<ChallengeProps> = ({
  challengeId,
  challengeState,
  onChallengeStateChange,
  onNavigate
}) => {
  const handleStateChange = (newState: ChallengeStates): void => {
    onChallengeStateChange(newState);
  };

  const renderChallenge = () => {
    switch (challengeId) {
      case 0:
        return (
          <Playing_lucas
            onWin={() => handleStateChange('win')}
            onBack={() => onNavigate('home', { skipIntro: true })}
          />
        );

      case 1:
      case 2:
      default:
        return (
          <View style={styles.content}>
            <Text>
              Challenge très très dur {challengeId}
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => { handleStateChange('win'); }}
            >
              <Text style={styles.textButton}>Cliquez moi dessus !</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  const renderTutorial = () => {
    switch (challengeId) {
      case 0:
        return (
          <Tutorial_lucas
            onStart={() => handleStateChange('playing')}
            onBack={() => onNavigate('home', { skipIntro: true })}
          />
        );

      case 1:
      case 2:
      default:
        return (
          <View style={styles.content}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => { handleStateChange('playing'); }}
            >
              <Text style={styles.textButton}>Cliquez pour passer le tuto</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  const renderScoreboard = () => {
    switch (challengeId) {
      case 0:
        return (
          <Scoreboard_lucas
            onNext={() => onNavigate('home', { skipIntro: true })}
          />
        );

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
              onPress={() => { onNavigate('home', { skipIntro: true }); }}
            >
              <Text style={styles.textButton}>Retourner au menu</Text>
            </TouchableOpacity>
          </ImageBackground>
        );
    }
  };

  const renderWin = () => {
    switch (challengeId) {
      case 0:
        return (
          <Win_lucas
            onCardPress={() => handleStateChange('funfact')}
            onBackToMenu={() => onNavigate('home', { skipIntro: true })}
          />
        );

      case 1:
      case 2:
      default:
        return (
          <View style={styles.content}>
            <Text>
              Vous avez réussis le challenge {challengeId} - écran de victoire à venir!
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => { handleStateChange('funfact'); }}
            >
              <Text style={styles.textButton}>Pour aller vers la suite !</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  const renderFunfact = () => {
    switch (challengeId) {
      case 0:
        return (
          <Funfact_lucas
            onScoreboard={() => handleStateChange('scoreboard')}
          />
        );

      case 1:
      case 2:
      default:
        return (
          <View style={styles.content}>
            <Text>
              Funfact le challenge {challengeId} est finit ! (c'est pas vraiemnt un funfact, c'est encore en construction)
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => { handleStateChange('scoreboard'); }}
            >
              <Text style={styles.textButton}>Voir le tableau des scores !</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

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
          case 'win':
            return renderWin();
          case 'funfact':
            return renderFunfact();
          default:
            return null;
        }
      })()}
    </>
  );
};

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
});

export default Challenge;