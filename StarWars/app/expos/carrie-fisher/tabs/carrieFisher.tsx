import Header from "@/app/common/components/header";
import Settings from "@/app/common/tabs/settings";
import Challenge from "@/app/expos/carrie-fisher/tabs/challenge";
import Menu from "@/app/expos/carrie-fisher/tabs/menu";
import Error from "@/app/hub/tabs/error";
import styles_starwars from "@/styles/expo/carrie-fisher/starwars";
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useNavigationLogic from "@/app/common/hooks/navigationLogic";

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

const CarrieFisherScreen = () => {
    const insets = useSafeAreaInsets();

    const { route, handleNavigate, handleBack, canGoBack } = useNavigationLogic<NavigationState['name']>('challenge');

    const renderScreen = () => {
        const { name, params } = route;

        switch (name) {
            case 'home':
                return (
                    <Menu
                        onNavigate={handleNavigate}
                        skipIntro={params?.skipIntro}
                    />
                );

            case 'settings':
                return <Settings />;

            case 'challenge':
                return (
                    <Challenge
                        challengeId={params?.challengeId ?? 0}
                        onNavigate={handleNavigate}
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
            onBack={handleBack}
            canGoBack={canGoBack}
        />

        {renderScreen()}
    </View>
  );
};

export default CarrieFisherScreen;