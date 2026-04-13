import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import styles from '../../../styles/hub/common';

interface HeaderProps {
  onNavigate: (screen: 'home' | 'settings') => void;
  currentScreen: string;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentScreen, onBack }) => {
  return (
    <View style={styles.headerContainer}>
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

      {onBack && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onBack}
          style={styles.backIconContainer}
        >
          <Ionicons name="arrow-back" size={28} color="#1a1a1a" />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onNavigate('settings')}
        style={styles.iconContainer}
      >
        <Ionicons
          name={currentScreen === 'settings' ? 'settings' : 'settings-outline'}
          size={28}
          color="#1a1a1a"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;