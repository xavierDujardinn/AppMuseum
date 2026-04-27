import LanguageSelector from "@/app/common/components/languageSelector";
import ThemedText from "@/app/common/components/themedText";
import { useTranslation } from "@/app/common/hooks/languageContext";
import styles from '@/styles/hub/common';
import React from 'react';
import {ScrollView, Switch, TextInput, TouchableOpacity, View} from 'react-native';
import Gtu from '../components/gtu';

const Settings: React.FC = () => {
  const {
    trad,
    userSettings,
    setUserName,
    setFontSize,
    setFontFamily,
    setColorBlindMode,
    setHighContrast,
    getFontFamily,
    themeColors,
  } = useTranslation();

  return (
    <View style={[styles.settingsScreen, { backgroundColor: themeColors.background }]}>
      <ThemedText style={[styles.title, { color: themeColors.text }]}>{trad('settings.title')}</ThemedText>
      <ScrollView>
      <View style={styles.settingsTopBlock}>
        <LanguageSelector />
      </View>

      <View style={styles.settingsOptionsContainer}>
        <ThemedText style={[styles.settingLabel, { color: themeColors.text }]}>
          {trad('settings.currentUserName')}
        </ThemedText>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: themeColors.surface,
              borderColor: themeColors.border,
              color: themeColors.text,
              fontFamily: getFontFamily('regular'),
              marginTop: 8,
            },
          ]}
          placeholder={trad('settings.userNamePlaceholder')}
          placeholderTextColor="#777777"
          value={userSettings.userName}
          onChangeText={setUserName}
          autoCapitalize="words"
          maxLength={40}
        />
      </View>

      <View style={styles.settingsOptionsContainer}>
        <ThemedText style={[styles.settingLabel, { color: themeColors.text }]}>
          {trad('settings.fontSize')}
        </ThemedText>

        <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
          <TouchableOpacity
            style={[
              styles.termsButton,
              {
                backgroundColor: userSettings.fontSize === 'small' ? themeColors.accent : '#A9A9A9',
              },
            ]}
            onPress={() => setFontSize('small')}
          >
            <ThemedText style={[styles.termsText, { color: themeColors.textOnAccent }]}>
              {trad('settings.fontSizeSmall')}
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.termsButton,
              {
                backgroundColor: userSettings.fontSize === 'medium' ? themeColors.accent : '#A9A9A9',
              },
            ]}
            onPress={() => setFontSize('medium')}
          >
            <ThemedText style={[styles.termsText, { color: themeColors.textOnAccent }]}>
              {trad('settings.fontSizeMedium')}
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.termsButton,
              {
                backgroundColor: userSettings.fontSize === 'large' ? themeColors.accent : '#A9A9A9',
              },
            ]}
            onPress={() => setFontSize('large')}
          >
            <ThemedText style={[styles.termsText, { color: themeColors.textOnAccent }]}>
              {trad('settings.fontSizeLarge')}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.settingsOptionsContainer}>
        <ThemedText style={[styles.settingLabel, { color: themeColors.text }]}>
          {trad('settings.fontFamily')}
        </ThemedText>

        <View style={{ flexDirection: 'row', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
          <TouchableOpacity
            style={[
              styles.termsButton,
              {
                backgroundColor: userSettings.fontFamily === 'exo' ? themeColors.secondaryAccent : '#A9A9A9',
              },
            ]}
            onPress={() => setFontFamily('exo')}
          >
            <ThemedText style={[styles.termsText, { color: themeColors.textOnAccent }]}>
              {trad('settings.fontExo')}
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.termsButton,
              {
                backgroundColor: userSettings.fontFamily === 'system' ? themeColors.secondaryAccent : '#A9A9A9',
              },
            ]}
            onPress={() => setFontFamily('system')}
          >
            <ThemedText style={[styles.termsText, { color: themeColors.textOnAccent }]}>
              {trad('settings.fontSystem')}
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.termsButton,
              {
                backgroundColor: userSettings.fontFamily === 'serif' ? themeColors.secondaryAccent : '#A9A9A9',
              },
            ]}
            onPress={() => setFontFamily('serif')}
          >
            <ThemedText style={[styles.termsText, { color: themeColors.textOnAccent }]}>
              {trad('settings.fontSerif')}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.settingsOptionsContainer}>
        <View style={styles.settingRow}>
          <ThemedText style={[styles.settingLabel, { color: themeColors.text }]}>
            {trad('settings.colorBlindMode')}
          </ThemedText>
          <Switch
                value={userSettings.colorBlindMode}
                onValueChange={setColorBlindMode}
                accessibilityRole="switch"
                accessibilityLabel={trad('settings.colorBlindMode')}
                trackColor={{ false: '#8E8E93', true: themeColors.accent }}
                thumbColor="#FFFFFF"
              />
            </View>
            <View style={styles.settingRow}>
              <ThemedText style={[styles.settingLabel, { color: themeColors.text }]}>
                {trad('settings.highContrast')}
              </ThemedText>
              <Switch
                value={userSettings.highContrast}
                onValueChange={setHighContrast}
                accessibilityRole="switch"
                accessibilityLabel={trad('settings.highContrast')}
                trackColor={{ false: '#8E8E93', true: themeColors.secondaryAccent }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

      <Gtu />
      <ThemedText style={styles.versionText}>v1.0.0 - Escape Museum</ThemedText>
    </ScrollView>
    </View>
  );
};

export default Settings;