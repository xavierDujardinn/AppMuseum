import ThemedText from "@/app/common/components/themedText";
import { useTranslation } from "@/app/common/hooks/languageContext";
import { useUserSettings } from "@/app/common/hooks/userSettings";
import styles from "@/styles/hub/common";
import React from 'react';
import { TouchableOpacity, View } from "react-native";

const FontSizeSelector = () => {
  const { settings, updateSettings, themeColors } = useUserSettings();
  const { trad } = useTranslation();

  const setFontSize = (fontSize: 'small' | 'medium' | 'large') => updateSettings({ fontSize });

  const activeLevel =
    settings.fontSize === 'large'
      ? 3
      : settings.fontSize === 'medium'
        ? 2
        : 1;

  const bars = [
    { key: 'small', level: 1, height: 24, label: trad('settings.fontSizeSmall') },
    { key: 'medium', level: 2, height: 44, label: trad('settings.fontSizeMedium') },
    { key: 'large', level: 3, height: 64, label: trad('settings.fontSizeLarge') },
  ] as const;

  return (
    <View style={styles.settingsOptionsContainer}>
      <ThemedText style={[styles.settingLabel, { color: themeColors.text }]}>
        {trad('settings.fontSize')}
      </ThemedText>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginTop: 16,
          gap: 1,
        }}
      >
        {bars.map((bar) => {
          const isActive = activeLevel >= bar.level;

          return (
            <TouchableOpacity
              key={bar.key}
              onPress={() => setFontSize(bar.key)}
              accessibilityRole="button"
              accessibilityLabel={bar.label}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-end',
                minHeight: 110,
              }}
            >
              <View
                style={{
                  width: 26,
                  height: bar.height,
                  borderRadius: 6,
                  borderWidth: 2,
                  borderColor: themeColors.border,
                  backgroundColor: isActive ? themeColors.accent : '#FFFFFF',
                }}
              />

              <ThemedText
                style={{
                  marginTop: 8,
                  color: themeColors.text,
                  fontSize: 12,
                  textAlign: 'center',
                }}
              >
                {bar.label}
              </ThemedText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default FontSizeSelector;