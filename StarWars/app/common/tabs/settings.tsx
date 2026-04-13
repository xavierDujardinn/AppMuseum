import LanguageSelector from "@/app/common/components/languageSelector";
import { useTranslation } from "@/app/hooks/languageContext";
import React, { useState } from 'react';
import { Switch, Text, View } from 'react-native';
import styles from '../../../styles/hub/common';
import Gtu from '../components/gtu';

const Settings: React.FC = () => {
  const { trad } = useTranslation();

  const [largeText, setLargeText] = useState(false);
  const [accessibleFont, setAccessibleFont] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  return (
    <View style={styles.settingsScreen}>
      <Text style={styles.title}>{trad('settings.title')}</Text>

      <View style={styles.settingsTopBlock}>
        <LanguageSelector />
        <Gtu />
      </View>

      <View style={styles.settingsOptionsContainer}>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Augmenter la taille de la police</Text>
          <Switch
            value={largeText}
            onValueChange={setLargeText}
            accessibilityRole="switch"
            accessibilityLabel="Augmenter la taille de la police"
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Activer une police adaptée aux malvoyants</Text>
          <Switch
            value={accessibleFont}
            onValueChange={setAccessibleFont}
            accessibilityRole="switch"
            accessibilityLabel="Activer une police adaptée aux malvoyants"
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Couleurs contrastées</Text>
          <Switch
            value={highContrast}
            onValueChange={setHighContrast}
            accessibilityRole="switch"
            accessibilityLabel="Couleurs contrastées"
          />
        </View>
      </View>
    </View>
  );
};

export default Settings;