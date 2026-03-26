import React, {ReactElement, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Header from './header';
import Home from './home';
import Settings from './settings/settings';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Error from './error';

const Main: React.FC = () => {
    const insets = useSafeAreaInsets();

    // useState to handle screen navigation without routes
    const [currentScreen, setCurrentScreen] = useState<'home' | 'settings' | 'error'>('home');

    const renderScreen = (errorMessage: string = "Unhandled error") : ReactElement => {
        switch(currentScreen){
            case 'home':
                return <Home onNavigate={setCurrentScreen}/>;
            case 'settings':
                return <Settings />;

            // Returns error by default
            case 'error':
            default:
                return <Error onNavigate={setCurrentScreen} errorMessage={errorMessage}/>;
        }
    }

    return (
        <View style={styles.container}>
            {/* We fill the top phone things for the header */}
            <View style={{ height: insets.top, backgroundColor: 'black' }} />

            <Header onNavigate={setCurrentScreen} currentScreen={currentScreen} />

            {renderScreen()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2E9E4',
    }
});

export default Main;