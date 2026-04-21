import Expo from "@/app/hub/tabs/expo";
import styles from '@/styles/hub/common';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from '../../common/components/header';
import Settings from '../../common/tabs/settings';
import Code from "./code";
import Connect from "./connect";
import Error from './error';
import Home from './home';
import {useNavigationLogic} from "@/app/common/hooks/navigationLogic";

interface NavigationState {
    name: 'home' | 'settings' | 'error' | 'connect' | 'code' | 'expo';
    params?: any;
}

const Hub: React.FC = () => {
    const insets = useSafeAreaInsets();

    const { route, handleNavigate, handleBack, canGoBack } = useNavigationLogic<NavigationState['name']>('home');

    const renderScreen = () => {
        const { name, params } = route;

        switch (name) {
            case 'home':
                return <Home onNavigate={handleNavigate} />;
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
        <View style={[styles.safeAreaTop, { height: insets.top}]} />

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

export default Hub;