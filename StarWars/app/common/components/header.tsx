import styles from '@/styles/hub/common';
import { useTranslation } from '@/app/common/hooks/languageContext';
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
    const { themeColors } = useTranslation();
    return (
     <View style={[styles.headerContainer, { backgroundColor: themeColors.secondaryAccent }]}>
         {canGoBack ? (
             <TouchableOpacity
                 activeOpacity={0.7}
                 style={styles.logoContainer}
                 onPress={onBack}
             >
                 <Ionicons name="arrow-back" size={28} color={themeColors.text} />
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
          color={themeColors.text}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;