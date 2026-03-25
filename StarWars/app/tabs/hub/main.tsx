import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Header from './header';
import Home from './home';
import Settings from './settings';
import {useSafeAreaInsets} from "react-native-safe-area-context";

const Main: React.FC = () => {
    const insets = useSafeAreaInsets();

    // UseState to handle screen navigation without routes
    const [currentScreen, setCurrentScreen] = useState<'home' | 'settings'>('home');

    return (
        <View style={styles.container}>
            {/* We fill the top phone things for the header */}
            <View style={{ height: insets.top, backgroundColor: 'black' }} />

            <Header onNavigate={setCurrentScreen} currentScreen={currentScreen} />

            {currentScreen === 'home' ? <Home /> : <Settings />}
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