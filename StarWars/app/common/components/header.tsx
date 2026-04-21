import styles from '@/styles/hub/common';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface HeaderProps {
  onNavigate: (screen: 'home' | 'settings') => void;
  currentScreen: string;
  onBack: () => void;
  canGoBack: boolean;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentScreen, onBack, canGoBack }) => {
    return (
     <View style={styles.headerContainer}>
         {canGoBack ? (
             <TouchableOpacity
                 activeOpacity={0.7}
                 style={styles.logoContainer}
                 onPress={onBack}
             >
                 <Ionicons name="arrow-back" size={28} color="#1a1a1a" />
             </TouchableOpacity>
         ) : (
             <View style={styles.logoContainer} />
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