import React, {useState} from 'react';
import {View} from 'react-native';
import Header from '../components/header';
import Home from './home';
import Settings from './settings';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Error from './error';
import Connect from "./connect";
import Code from "./code";
import Expo from "@/app/hub/tabs/expo";
import styles from '../../../styles/hub/common'
import Gallery from "@/app/hub/tabs/gallery";

interface NavigationState {
    name: 'home' | 'settings' | 'error' | 'connect' | 'code' | 'expo' | 'gallery';
    params?: any;
}

export type OnNavigateFunc = (screen: NavigationState['name'], params?: any) => void;

const Hub: React.FC = () => {
    const insets = useSafeAreaInsets();

    // useState to handle screen navigation
    const [route, setRoute] = useState<NavigationState>({ name: 'home' });

    const handleNavigate: OnNavigateFunc = (name, params) => {
        setRoute({ name, params });
    };

    const renderScreen = () => {
        const { name, params } = route;

        switch(name) {
            case 'home':
                return <Home onNavigate={handleNavigate}/>;
            case 'gallery':
                return <Gallery onNavigate={handleNavigate}/>;
            case 'expo':
                return <Expo onNavigate={handleNavigate} expoData={params} />;
            case 'settings':
                return <Settings />;
            case 'connect':
                return <Connect onNavigate={handleNavigate}/>;
            case 'code':
                return <Code onNavigate={handleNavigate}/>;
            case 'error':
            default:
                return <Error onNavigate={handleNavigate} errorMessage={params?.message || "Unhandled error"}/>;
        }
    }

    return (
        <View style={styles.container}>
            {/* We fill the top phone things for the header */}
            <View style={{ height: insets.top, backgroundColor: 'black' }} />

            <Header onNavigate={handleNavigate} currentScreen={route.name} />

            {renderScreen()}
        </View>
    );
};

export default Hub;