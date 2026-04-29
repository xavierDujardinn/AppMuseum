import ThemedText from '@/app/common/components/themedText';
import Funfact from "@/app/expos/carrie-fisher/tabs/funFact";
import LouisChallenge from "@/app/expos/carrie-fisher/tabs/Louis/challenge";
import Playing_lucas from "@/app/expos/carrie-fisher/tabs/Lucas/playing";
import Scoreboard from "@/app/expos/carrie-fisher/tabs/scoreboard";
import Tutorial from '@/app/expos/carrie-fisher/tabs/tutorial';
import Win from "@/app/expos/carrie-fisher/tabs/win";
import Xavier from "@/app/expos/carrie-fisher/tabs/Xavier/game";
import styles_starwars from "@/styles/expo/carrie-fisher/starwars";
import { updateCompletedChallenge } from "@/utils/common/storage";
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

type ChallengeStates = 'tutorial' | 'playing' | 'win' | 'funfact' | 'scoreboard';

interface ChallengeProps {
  challengeId: number;
  onNavigate: (screen: 'home' | 'settings' | 'error' | 'challenge', params?: any) => void;
}

const Challenge: React.FC<ChallengeProps> = ({challengeId, onNavigate}) => {
    const [currentState, setCurrentState] = useState<ChallengeStates>('tutorial');
    const [savedElaspedTime, setSavedElaspedTime] = React.useState<number>(1);

  const handleStartPlaying = () => {
      setCurrentState('playing');
  };

  const handleWin = async (challengeId: number, elapsedTime: number) => {
      setSavedElaspedTime(elapsedTime);
      await updateCompletedChallenge("carrieFisher", challengeId);
      setCurrentState('win');
  };

  const handleGoToFunfact = () => {
      setCurrentState('funfact');
  };

  const handleGoToScoreboard = () => {
      setCurrentState('scoreboard');
  };

  const handleBackToMenu = () => {
      onNavigate('home', { skipIntro: true });
  };

  const renderChallenge = () => {
    switch (challengeId) {
      case 0:
        return <Playing_lucas onWin={handleWin} onBack={handleBackToMenu}/>;
      case 1:
          return <Xavier onWin={handleWin}/>
      case 2:
          return <LouisChallenge onWin={handleWin} onBack={handleBackToMenu} />;
      default:
        return (
          <View style={styles_starwars.challengeContainer}>
            <ThemedText>Challenge très très dur {challengeId}</ThemedText>

            <TouchableOpacity
              style={styles_starwars.challengeButton}
              onPress={() => { setCurrentState('win'); }}
            >
              <ThemedText style={styles_starwars.challengeButtonText}>Cliquez moi dessus !</ThemedText>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <>
      {(() => {
        switch (currentState) {
          case 'tutorial':
            return <Tutorial challengeId={challengeId} onStart={handleStartPlaying} onBack={handleBackToMenu}/>;
          case 'playing':
            return renderChallenge();
          case 'scoreboard':
            return <Scoreboard challengeId = {challengeId} onNext={handleBackToMenu} elaspedTime={savedElaspedTime}/>;
          case 'win':
            return <Win challengeId={challengeId} onCardPress={handleGoToFunfact} onBackToMenu={handleBackToMenu}/>;
          case 'funfact':
            return <Funfact challengeId={challengeId} onScoreboard={handleGoToScoreboard} />
          default:
            return null;
        }
      })()}
    </>
  );
};

export default Challenge;