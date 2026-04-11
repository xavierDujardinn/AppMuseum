import React, { useEffect } from 'react';
import { StatusBar} from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar'; // Import pour Android
import {useFonts, Exo2_900Black, Exo2_700Bold, Exo2_600SemiBold, Exo2_400Regular} from '@expo-google-fonts/exo-2';
import Hub from '@/app/hub/tabs/hub';
import CarrieFisher from '@/app/expos/carrie-fisher/carrieFisher';
import {LanguageProvider} from "@/app/hooks/languageContext";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Navigation types
export type RootStackParamList = {
    Hub: undefined;
    CarrieFisher: undefined;
};

// Navigation stack
const Stack = createNativeStackNavigator<RootStackParamList>();

SplashScreen.preventAutoHideAsync();

const App: React.FC = () => {
    const [loaded, error] = useFonts({'Exo2-Black': Exo2_900Black, 'Exo2-Bold': Exo2_700Bold, 'Exo2-SemiBold': Exo2_600SemiBold, 'Exo2-Regular': Exo2_400Regular, 'StarJedi': require('@/assets/fonts/starjedi/Starjedi.ttf'),});

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

            <LanguageProvider>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Hub" component={Hub} />
                    <Stack.Screen name="CarrieFisher" component={CarrieFisher} />
                </Stack.Navigator>
            </LanguageProvider>

            {/*For bottom phone things*/}
            <SafeAreaView edges={['bottom']} style={{ backgroundColor: 'black' }} />
        </SafeAreaProvider>
    );
}

export default App;