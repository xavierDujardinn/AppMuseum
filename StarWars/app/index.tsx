import React, { useEffect } from 'react';
import { StatusBar} from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar'; // Import pour Android
import {
    useFonts,
    Exo2_900Black,
    Exo2_700Bold,
    Exo2_600SemiBold,
    Exo2_400Regular
} from '@expo-google-fonts/exo-2';

import Main from './tabs/hub/main';

SplashScreen.preventAutoHideAsync();

const App = () => {
    const [loaded, error] = useFonts({
        'Exo2-Black': Exo2_900Black,
        'Exo2-Bold': Exo2_700Bold,
        'Exo2-SemiBold': Exo2_600SemiBold,
        'Exo2-Regular': Exo2_400Regular,
    });

    useEffect(() => {
        // Configure bottom navigation bar
        const prepareNavigation = async () => {
            try {
                await NavigationBar.setButtonStyleAsync("light");
            } catch (e) {
                console.warn(`Error with navigation bar: ${e}`);
            }
        };

        prepareNavigation();

        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    {/*Don't show anything if loaded things are not ready yet*/}
    if (!loaded && !error) {
        return null;
    }

    return (
        <SafeAreaProvider>
            {/* For top phone things*/}
            <StatusBar barStyle="light-content" backgroundColor="black" translucent />

            {/*Hub main tab*/}
            <Main />

            {/*For bottom phone things*/}
            <SafeAreaView edges={['bottom']} style={{ backgroundColor: 'black' }} />
        </SafeAreaProvider>
    );
}

export default App;