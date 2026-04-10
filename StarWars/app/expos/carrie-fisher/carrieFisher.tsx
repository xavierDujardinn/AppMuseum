import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Header from "@/app/common/components/header";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Menu from "@/app/expos/carrie-fisher/menu";
import Settings from "@/app/common/tabs/settings";
import Error from "@/app/hub/tabs/error";
import {useNavigation} from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app';

interface NavigationState {
    name: 'home' | 'settings' | 'error' | 'connect' | 'code' | 'expo' | 'gallery';
    params?: any;
}

export type OnNavigateFunc = (screen: NavigationState['name'], params?: any) => void;

const CarrieFisherScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    // useState to handle screen navigation
    const [route, setRoute] = useState<NavigationState>({ name: 'home' });

    const handleNavigate: OnNavigateFunc = (name, params) => {
        setRoute({ name, params });
    };

    const renderScreen = () => {
        const { name, params } = route;

        switch(name) {
            case 'home':
                return <Menu onNavigate={handleNavigate}/>;
            case 'settings':
                return <Settings />;
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

            <TouchableOpacity
                onPress={() => {navigation.navigate('Hub');}}
            >
                <Text>Retour au menu principal</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2E9E4',
    },
})

export default CarrieFisherScreen;