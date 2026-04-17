import { ImageBackground } from "expo-image";
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles_starwars from "@/styles/expo/carrie-fisher/starwars";
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

  elapsedTime: number;
  isHintOpen: boolean;
  hasStarted: boolean;
  setElapsedTime: React.Dispatch<React.SetStateAction<number>>;
  setIsHintOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setHasStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setChallenge1Completed: React.Dispatch<React.SetStateAction<boolean>>;
  formatTime: (totalSeconds: number) => string;
}

const Challenge: React.FC<ChallengeProps> = ({
  challengeId,
  challengeState,
  onChallengeStateChange,
  onNavigate,
  elapsedTime,
  isHintOpen,
  hasStarted,
  setElapsedTime,
  setIsHintOpen,
  setHasStarted,
  setChallenge1Completed,
  formatTime,
}) => {
  const handleStateChange = (newState: ChallengeStates): void => {
    onChallengeStateChange(newState);
  };

  const handleStartPlaying = () => {
    setElapsedTime(0);
    setIsHintOpen(false);
    setHasStarted(true);
    handleStateChange('playing');
  };

  const handleResumePlaying = () => {
    setIsHintOpen(false);
    handleStateChange('playing');
  };

  const handleOpenHint = () => {
    setIsHintOpen(true);
  };

  const handleCloseHint = () => {
    setIsHintOpen(false);
  };

  const handleWin = () => {
    setChallenge1Completed(true);
    handleStateChange('win');
  };

  const handleGoToFunfact = () => {
    handleStateChange('funfact');
  };

  const handleGoToScoreboard = () => {
    handleStateChange('scoreboard');
  };

  const handleBackToMenu = () => {
    onNavigate('home', { skipIntro: true });
  };

  const renderChallenge = () => {
    switch (challengeId) {
      case 0:
        return (
          <Playing_lucas
            onWin={handleWin}
            onBack={handleBackToMenu}
            elapsedTime={elapsedTime}
            isHintOpen={isHintOpen}
            onOpenHint={handleOpenHint}
            onCloseHint={handleCloseHint}
            formatTime={formatTime}
          />
        );

      case 1:
      case 2:
      default:
        return (
          <View style={styles_starwars.challengeContainer}>
            <Text>Challenge très très dur {challengeId}</Text>

            <TouchableOpacity
              style={styles_starwars.challengeButton}
              onPress={() => { handleStateChange('win'); }}
            >
              <Text style={styles_starwars.challengeButtonText}>Cliquez moi dessus !</Text>
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
            onStart={hasStarted ? handleResumePlaying : handleStartPlaying}
            onBack={handleBackToMenu}
          />
        );

      case 1:
      case 2:
      default:
        return (
          <View style={styles_starwars.challengeContainer}>
            <TouchableOpacity
              style={styles_starwars.challengeButton}
              onPress={() => { handleStateChange('playing'); }}
            >
              <Text style={styles_starwars.challengeButtonText}>Cliquez pour passer le tuto</Text>
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
            onNext={handleBackToMenu}
            elapsedTime={elapsedTime}
            formatTime={formatTime}
          />
        );

      case 1:
      case 2:
      default:
        return (
          <ImageBackground
            source={require('@/assets/images/expos/carrieFisher/space_background.jpg')}
            style={styles_starwars.challengeBackgroundImage}
          >
            <TouchableOpacity
              style={styles_starwars.challengeButton}
              onPress={() => { onNavigate('home', { skipIntro: true }); }}
            >
              <Text style={styles_starwars.challengeButtonText}>Retourner au menu</Text>
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
            onCardPress={handleGoToFunfact}
            onBackToMenu={handleBackToMenu}
          />
        );

      case 1:
      case 2:
      default:
        return (
          <View style={styles_starwars.challengeContainer}>
            <Text>
              Vous avez réussis le challenge {challengeId} - écran de victoire à venir!
            </Text>

            <TouchableOpacity
              style={styles_starwars.challengeButton}
              onPress={() => { handleStateChange('funfact'); }}
            >
              <Text style={styles_starwars.challengeButtonText}>Pour aller vers la suite !</Text>
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
            onScoreboard={handleGoToScoreboard}
          />
        );

      case 1:
      case 2:
      default:
        return (
          <View style={styles_starwars.challengeContainer}>
            <Text>
              Funfact le challenge {challengeId} est finit ! (c'est pas vraiemnt un funfact, c'est encore en construction)
            </Text>

            <TouchableOpacity
              style={styles_starwars.challengeButton}
              onPress={() => { handleStateChange('scoreboard'); }}
            >
              <Text style={styles_starwars.challengeButtonText}>Voir le tableau des scores !</Text>
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

export default Challenge;