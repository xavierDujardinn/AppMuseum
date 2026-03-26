import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
    onNavigate: (screen: 'home' | 'settings') => void;
    currentScreen: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentScreen }) => {
    return (
        <View style={styles.headerContainer}>
            {/* Left logo navigates to home screen */}
            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.logoContainer}
                onPress={() => onNavigate('home')}
            >
                <Image
                    source={require('../../../assets/images/logoem.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </TouchableOpacity>

            {/* Empty central space */}
            <View style={styles.centerSpace} />

            {/* Setting button to the right to navigate to settings */}
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onNavigate('settings')}
                style={styles.iconContainer}
                >
            <Ionicons
                name={currentScreen === 'settings' ? "settings" : "settings-outline"}
                size={28}
                color="#1a1a1a"
            />
        </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        height: 60,
        backgroundColor: '#A094A1', // La couleur mauve/gris de ton design
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    logoContainer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
    },
    logo: {
        width: '100%',
        height: '100%',
    },
    centerSpace: {
        flex: 1,
    },
    iconContainer: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
});

export default Header;