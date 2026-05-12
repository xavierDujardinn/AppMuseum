import { useTranslation } from "@/app/common/hooks/languageContext";
import { useUserSettings } from '@/app/common/hooks/userSettings';
import styles_starwars from '@/styles/expo/carrie-fisher/starwars';
import { ScoreEntry } from '@/utils/common/storage';
import { BG_LIST, formatTime } from "@/utils/expo/carrie-fisher/utils";
import { ImageBackground } from 'expo-image';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface TableauLucasProps {
  challengeId?: number;
  onNext: () => void;
  elaspedTime: number;
  isFinalExpoScoreboard?: boolean;
  expoTitle?: string;
  leaderboardOverride?: ScoreEntry[];
}

const Scoreboard: React.FC<TableauLucasProps> = ({
  challengeId = 0,
  onNext,
  elaspedTime,
  isFinalExpoScoreboard = false,
  expoTitle,
  leaderboardOverride = []
}) => {
  const { settings } = useUserSettings();
  const { trad } = useTranslation();

  const currentUserName =
    settings?.userName?.trim() || trad('expo.carrie-fisher.scoreboard.unknownUser');

  const useAccessibleColors = !!(settings?.colorBlindMode && settings?.darkMode);
  const mainTextColor = '#FFFFFF';
  const highlightTextColor = useAccessibleColors ? '#FFD166' : '#00D2FF';
  const buttonTextColor = '#FFFFFF';

  const title = isFinalExpoScoreboard
    ? trad('expo.carrie-fisher.scoreboard.finalTitle', {
        expoTitle: expoTitle ?? trad('expo.carrie-fisher.scoreboard.defaultExpoTitle')
      })
    : trad('expo.carrie-fisher.scoreboard.title');

  const content = (
    <View style={styles_starwars.scoreboardLucasOverlay} pointerEvents="box-none">
      <View style={styles_starwars.scoreboardLucasScoreBlock}>
        <Text style={[styles_starwars.scoreboardLucasTitle, { color: mainTextColor }]}>
          {title}
        </Text>

        <Text style={[styles_starwars.scoreboardLucasSeparator, { color: mainTextColor }]}>
          --------------------
        </Text>

        <Text style={[styles_starwars.scoreboardLucasScoreLine, { color: highlightTextColor }]}>
          {trad('expo.carrie-fisher.scoreboard.yourTime', {
            time: formatTime(elaspedTime)
          })}
        </Text>

        {leaderboardOverride.map((entry, index) => (
          <Text
            key={`${index}-${entry.name}-${entry.time}`}
            style={[
              styles_starwars.scoreboardLucasScoreLine,
              useAccessibleColors && { color: mainTextColor },
              entry.name === currentUserName && { color: highlightTextColor }
            ]}
          >
            {index + 1}. {entry.name} : {formatTime(entry.time)}
          </Text>
        ))}

        {leaderboardOverride.length === 0 && (
          <Text style={[styles_starwars.scoreboardLucasScoreLine, { color: mainTextColor }]}>
            {trad('expo.carrie-fisher.scoreboard.empty')}
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={styles_starwars.scoreboardLucasNextButton}
        onPress={onNext}
      >
        <Text style={[styles_starwars.scoreboardLucasNextButtonText, { color: buttonTextColor }]}>
          {trad('expo.carrie-fisher.common.finish')}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const backgroundSource = isFinalExpoScoreboard
    ? require('@/assets/images/expos/carrieFisher/space_background.jpg')
    : BG_LIST[challengeId];

  return (
    <View style={styles_starwars.scoreboardLucasContainer} pointerEvents="box-none">
      <ImageBackground
        source={backgroundSource}
        style={styles_starwars.scoreboardLucasBackgroundImage}
        contentFit="cover"
        pointerEvents="none"
      />
      {content}
    </View>
  );
};

export default Scoreboard;