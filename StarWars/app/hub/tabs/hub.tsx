import Expo from "@/app/hub/tabs/expo";
import Gallery from "@/app/hub/tabs/gallery";
import React, { useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from '../../../styles/hub/common';
import Header from '../../common/components/header';
import Settings from '../../common/tabs/settings';
import Code from "./code";
import Connect from "./connect";
import Error from './error';
import Home from './home';

interface NavigationState {
  name: 'home' | 'settings' | 'error' | 'connect' | 'code' | 'expo' | 'gallery';
  params?: any;
}

export type OnNavigateFunc = (screen: NavigationState['name'], params?: any) => void;

const Hub: React.FC = () => {
  const insets = useSafeAreaInsets();

  const [history, setHistory] = useState<NavigationState[]>([
    { name: 'home' }
  ]);

  const route = history.length > 0 ? history[history.length - 1] : { name: 'home' as const };

  const handleNavigate: OnNavigateFunc = (name, params) => {
    setHistory(prev => {
      const current = prev[prev.length - 1];

      if (
        current.name === name &&
        JSON.stringify(current.params) === JSON.stringify(params)
      ) {
        return prev;
      }

      return [...prev, { name, params }];
    });
  };

  const handleBack = () => {
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
        return <Home onNavigate={handleNavigate} />;

      case 'gallery':
        return <Gallery onNavigate={handleNavigate} />;

      case 'expo':
        return <Expo onNavigate={handleNavigate} expoData={params} />;

      case 'settings':
        return <Settings />;

      case 'connect':
        return <Connect onNavigate={handleNavigate} />;

      case 'code':
        return <Code onNavigate={handleNavigate} />;

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
    <View style={styles.container}>
      <View style={{ height: insets.top, backgroundColor: 'black' }} />

      <Header
        onNavigate={handleNavigate}
        currentScreen={route.name}
        onBack={history.length > 1 ? handleBack : undefined}
      />

      {renderScreen()}
    </View>
  );
};

export default Hub;