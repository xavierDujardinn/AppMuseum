import { RootStackParamList } from "@/app";
import Header from "@/app/common/components/header";
import ThemedText from "@/app/common/components/themedText";
import { useTranslation } from "@/app/common/hooks/languageContext";
import useNavigationLogic from "@/app/common/hooks/navigationLogic";
import { useUserSettings } from '@/app/common/hooks/userSettings';
import Settings from "@/app/common/tabs/settings";
import Challenge from "@/app/expos/carrie-fisher/tabs/challenge";
import Menu from "@/app/expos/carrie-fisher/tabs/menu";
import Scoreboard from "@/app/expos/carrie-fisher/tabs/scoreboard";
import Error from "@/app/hub/tabs/error";
import styles_starwars from "@/styles/expo/carrie-fisher/starwars";
import { getScores, saveNewScore, ScoreEntry } from '@/utils/common/storage';
import { EXPO_STORAGE_NAME } from "@/utils/expo/carrie-fisher/utils";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type ChallengeStates = 'tutorial' | 'playing' | 'win' | 'funfact' | 'scoreboard';

interface NavigationState {
  name: 'home' | 'settings' | 'error' | 'challenge' | 'scoreboard';
  params?: {
    challengeId?: number;
    challengeState?: ChallengeStates;
    challengeHistory?: ChallengeStates[];
    skipIntro?: boolean;
    message?: string;
  };
}

interface FeedbackProps {
  onAnswer: (liked: boolean) => void;
}

interface CarrieFisherProgressState {
  completedChallenges: number[];
  totalElapsedTime: number;
}

type CarrieFisherAction =
  | { type: 'COMPLETE_CHALLENGE'; challengeId: number; elapsedTime: number }
  | { type: 'RESET_PROGRESS' };

const initialProgressState: CarrieFisherProgressState = {
  completedChallenges: [],
  totalElapsedTime: 0,
};

const FINAL_EXPO_SCOREBOARD_KEY = `${EXPO_STORAGE_NAME}_final`;

const carrieFisherReducer = (
  state: CarrieFisherProgressState,
  action: CarrieFisherAction
): CarrieFisherProgressState => {
  switch (action.type) {
    case 'COMPLETE_CHALLENGE': {
      if (action.elapsedTime < 0) return state;
      if (state.completedChallenges.includes(action.challengeId)) return state;

      return {
        completedChallenges: [...state.completedChallenges, action.challengeId],
        totalElapsedTime: state.totalElapsedTime + action.elapsedTime,
      };
    }

    case 'RESET_PROGRESS':
      return initialProgressState;

    default:
      return state;
  }
};

const FeedbackModal: React.FC<FeedbackProps> = ({ onAnswer }) => (
  <View style={styles_starwars.feedbackOverlay}>
    <View style={styles_starwars.feedbackCard}>
      <ThemedText style={styles_starwars.feedbackTitle} weight="bold">
        As-tu aimé l’exposition ?
      </ThemedText>

      <View style={styles_starwars.feedbackButtonsRow}>
        <TouchableOpacity
          style={styles_starwars.feedbackButton}
          onPress={() => onAnswer(true)}
        >
          <ThemedText style={styles_starwars.feedbackButtonText} weight="bold">
            Oui
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles_starwars.feedbackButton}
          onPress={() => onAnswer(false)}
        >
          <ThemedText style={styles_starwars.feedbackButtonText} weight="bold">
            Non
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const CarrieFisherScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { settings } = useUserSettings();
  const { trad } = useTranslation();

  const { route, handleNavigate, handleBack, canGoBack } =
    useNavigationLogic<NavigationState['name']>('challenge');

  const [showFeedback, setShowFeedback] = useState(false);
  const [leaderboard, setLeaderboard] = useState<ScoreEntry[]>([]);

  const [progress, dispatch] = useReducer(carrieFisherReducer, initialProgressState);
  const hasNavigatedToFinalScoreboard = useRef(false);
  const hasSavedFinalScore = useRef(false);

  const finalScoreboardAccessible = progress.completedChallenges.length === 3;

  useEffect(() => {
    if (finalScoreboardAccessible && !hasNavigatedToFinalScoreboard.current) {
      hasNavigatedToFinalScoreboard.current = true;
      handleNavigate('scoreboard');
    }
  }, [finalScoreboardAccessible, handleNavigate]);

  useEffect(() => {
    const saveFinalScoreOnce = async () => {
      if (route.name !== 'scoreboard') return;
      if (!finalScoreboardAccessible) return;
      if (hasSavedFinalScore.current) return;

      try {
        hasSavedFinalScore.current = true;

        const currentUserName =
          settings?.userName?.trim() || trad('expo.carrie-fisher.scoreboard.unknownUser');

        const updatedScores = await saveNewScore(
          FINAL_EXPO_SCOREBOARD_KEY,
          999,
          progress.totalElapsedTime,
          currentUserName
        );

        setLeaderboard(updatedScores);
      } catch (error) {
        console.error("Erreur sauvegarde scoreboard final:", error);
        const existing = await getScores(FINAL_EXPO_SCOREBOARD_KEY, 999);
        setLeaderboard(existing);
      }
    };

    saveFinalScoreOnce();
  }, [
    route.name,
    finalScoreboardAccessible,
    progress.totalElapsedTime,
    settings?.userName,
    trad
  ]);

  const handleChallengeComplete = (challengeId: number, elapsedTime: number) => {
    dispatch({ type: 'COMPLETE_CHALLENGE', challengeId, elapsedTime });
  };

  const handleFinishAfterScoreboard = () => {
    setShowFeedback(true);
  };

  const handleFeedbackAnswer = (_liked: boolean) => {
    setShowFeedback(false);
    dispatch({ type: 'RESET_PROGRESS' });
    hasNavigatedToFinalScoreboard.current = false;
    hasSavedFinalScore.current = false;
    setLeaderboard([]);
    navigation.navigate('Hub');
  };

  const renderScreen = () => {
    const { name, params } = route;

    switch (name) {
      case 'home':
        return (
          <Menu
            onNavigate={handleNavigate}
            skipIntro={params?.skipIntro}
            finalScoreboardAccessible={finalScoreboardAccessible}
          />
        );

      case 'settings':
        return <Settings />;

      case 'challenge':
        return (
          <Challenge
            challengeId={params?.challengeId ?? 0}
            onNavigate={handleNavigate}
            onChallengeComplete={handleChallengeComplete}
          />
        );

      case 'scoreboard':
        return (
          <View style={{ flex: 1 }}>
            <Scoreboard
              isFinalExpoScoreboard
              expoTitle="Carrie Fisher"
              onNext={handleFinishAfterScoreboard}
              elaspedTime={progress.totalElapsedTime}
              leaderboardOverride={leaderboard}
            />
            {showFeedback ? <FeedbackModal onAnswer={handleFeedbackAnswer} /> : null}
          </View>
        );

      case 'error':
      default:
        return (
          <Error
            onNavigate={handleNavigate}
            errorMessage={params?.message || "Unhandled error"}
          />
        );
    }
  };

  return (
    <View style={styles_starwars.carrieFisherContainer}>
      <View
        style={[
          styles_starwars.carrieFisherSafeAreaTop,
          { height: insets.top }
        ]}
      />

      <Header
        onNavigate={handleNavigate}
        currentScreen={route.name}
        onBack={handleBack}
        canGoBack={canGoBack}
      />

      {renderScreen()}
    </View>
  );
};

export default CarrieFisherScreen;