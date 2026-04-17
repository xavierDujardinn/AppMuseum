import Header from "@/app/common/components/header";
import Settings from "@/app/common/tabs/settings";
import Challenge from "@/app/expos/carrie-fisher/challenge";
import Menu from "@/app/expos/carrie-fisher/menu";
import Error from "@/app/hub/tabs/error";
import styles_starwars from "@/styles/expo/carrie-fisher/starwars";
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type ChallengeStates = 'tutorial' | 'playing' | 'win' | 'funfact' | 'scoreboard';

interface NavigationState {
  name: 'home' | 'settings' | 'error' | 'challenge';
  params?: {
    challengeId?: number;
    challengeState?: ChallengeStates;
    challengeHistory?: ChallengeStates[];
    skipIntro?: boolean;
    message?: string;
  };
}

export type OnNavigateFunc = (screen: NavigationState['name'], params?: NavigationState['params']) => void;

const CarrieFisherScreen = () => {
  const insets = useSafeAreaInsets();

  const [history, setHistory] = useState<NavigationState[]>([
    { name: 'home' }
  ]);

  const [elapsedTime, setElapsedTime] = useState(0);
  const [isHintOpen, setIsHintOpen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [challenge1Completed, setChallenge1Completed] = useState(false);

  const route = history[history.length - 1];

  const currentChallengeState =
    route.name === 'challenge'
      ? route.params?.challengeState ?? 'tutorial'
      : null;

  const currentChallengeId =
    route.name === 'challenge'
      ? route.params?.challengeId ?? 0
      : null;

  const resetLucasChallenge = () => {
    setElapsedTime(0);
    setIsHintOpen(false);
    setHasStarted(false);
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    const shouldRun =
      currentChallengeId === 0 &&
      currentChallengeState === 'playing' &&
      !isHintOpen;

    if (!shouldRun) return;

    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentChallengeId, currentChallengeState, isHintOpen]);

  const handleNavigate: OnNavigateFunc = (name, params) => {
    setHistory(prev => {
      const current = prev[prev.length - 1];

      if (
        current.name === name &&
        JSON.stringify(current.params) === JSON.stringify(params)
      ) {
        return prev;
      }

      // Reset uniquement quand on retourne au menu des épreuves
      if (name === 'home') {
        resetLucasChallenge();
      }

      return [...prev, { name, params }];
    });
  };

  const updateCurrentChallengeState = (newState: ChallengeStates) => {
    setHistory(prev => {
      const updated = [...prev];
      const current = updated[updated.length - 1];

      if (current.name !== 'challenge') return prev;

      const previousChallengeHistory = current.params?.challengeHistory || ['tutorial'];

      updated[updated.length - 1] = {
        ...current,
        params: {
          ...current.params,
          challengeState: newState,
          challengeHistory: [...previousChallengeHistory, newState],
        },
      };

      return updated;
    });
  };

  const handleChallengeBack = () => {
    setHistory(prev => {
      const updated = [...prev];
      const current = updated[updated.length - 1];

      if (current.name !== 'challenge') return prev;

      const challengeHistory = current.params?.challengeHistory || ['tutorial'];

      if (challengeHistory.length <= 1) {
        if (updated.length > 1) {
          return updated.slice(0, -1);
        }
        return updated;
      }

      const newChallengeHistory = challengeHistory.slice(0, -1);
      const previousChallengeState = newChallengeHistory[newChallengeHistory.length - 1];

      updated[updated.length - 1] = {
        ...current,
        params: {
          ...current.params,
          challengeState: previousChallengeState,
          challengeHistory: newChallengeHistory,
        },
      };

      return updated;
    });
  };

  const handleBack = () => {
    if (route.name === 'challenge') {
      const challengeHistory = route.params?.challengeHistory || ['tutorial'];

      if (challengeHistory.length > 1) {
        handleChallengeBack();
        return;
      }
    }

    setHistory(prev => {
      if (prev.length > 1) {
        return prev.slice(0, -1);
      }
      return prev;
    });
  };

  const renderScreen = () => {
    const { name, params } = route;

    switch (name) {
      case 'home':
        return (
          <Menu
            onNavigate={handleNavigate}
            skipIntro={params?.skipIntro}
            challenge1Completed={challenge1Completed}
          />
        );

      case 'settings':
        return <Settings />;

      case 'challenge':
        return (
          <Challenge
            challengeId={params?.challengeId ?? 0}
            challengeState={params?.challengeState ?? 'tutorial'}
            onChallengeStateChange={updateCurrentChallengeState}
            onNavigate={handleNavigate}
            elapsedTime={elapsedTime}
            isHintOpen={isHintOpen}
            hasStarted={hasStarted}
            setElapsedTime={setElapsedTime}
            setIsHintOpen={setIsHintOpen}
            setHasStarted={setHasStarted}
            setChallenge1Completed={setChallenge1Completed}
            formatTime={formatTime}
          />
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
      <View style={[styles_starwars.carrieFisherSafeAreaTop, { height: insets.top }]} />

      <Header
        onNavigate={handleNavigate}
        currentScreen={route.name}
        onBack={history.length > 1 || route.name === 'challenge' ? handleBack : undefined}
      />

      {renderScreen()}
    </View>
  );
};

export default CarrieFisherScreen;