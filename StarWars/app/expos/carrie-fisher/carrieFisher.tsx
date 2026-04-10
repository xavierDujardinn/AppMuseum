import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/app/index';

interface NavigationState {
    name: 'home' | 'settings' | 'error' | 'connect' | 'code' | 'expo' | 'gallery';
    params?: any;
}

const CarrieFisherScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 24 }}>Écran Carrie Fisher</Text>

            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginTop: 20, padding: 10, backgroundColor: '#333' }}
            >
                <Text style={{ color: 'white' }}>Retour au Hub</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CarrieFisherScreen;