import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../../styles/hub/common'

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

export default Header;