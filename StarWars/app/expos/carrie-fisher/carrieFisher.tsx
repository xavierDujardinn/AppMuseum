import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Header from "@/app/common/components/header";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Menu from "@/app/expos/carrie-fisher/menu";
import Settings from "@/app/common/tabs/settings";
import Error from "@/app/hub/tabs/error";
import Challenge from "@/app/expos/carrie-fisher/challenge";

interface NavigationState {
    name: 'home' | 'settings' | 'error' | 'challenge';
    params?: any;
}

export type OnNavigateFunc = (screen: NavigationState['name'], params?: any) => void;

const CarrieFisherScreen = () => {
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
                return <Menu onNavigate={handleNavigate} skipIntro={params?.skipIntro} />;
            case 'settings':
                return <Settings />;

            /* Change this for the new challenges */
            case 'challenge':
                return <Challenge challengeId={params.challengeId} onNavigate={handleNavigate} />;
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
})

export default CarrieFisherScreen;