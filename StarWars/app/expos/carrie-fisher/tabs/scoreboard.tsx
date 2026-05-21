import { useTranslation } from "@/app/common/hooks/languageContext";
import { useUserSettings } from '@/app/common/hooks/userSettings';
import styles_starwars from '@/styles/expo/carrie-fisher/starwars';
import { getScores, ScoreEntry } from '@/utils/common/storage';
import { EXPO_STORAGE_NAME, formatTime } from "@/utils/expo/carrie-fisher/utils";
import { ImageBackground } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

interface ScoreboardProps {
    onNavigate: (screen: 'home', params?: any) => void;
}

const Scoreboard: React.FC<ScoreboardProps> = ({onNavigate }) => {
    const [leaderboard, setLeaderboard] = useState<ScoreEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { settings } = useUserSettings();
    const { trad } = useTranslation();
    const currentUserName = settings?.userName?.trim() || trad('expo.carrie-fisher.scoreboard.unknownUser');
    const useAccessibleColors = (settings?.colorBlindMode && settings?.highContrast);
    const mainTextColor = useAccessibleColors ? '#FFFFFF' : undefined;
    const highlightTextColor = useAccessibleColors ? '#FFD166' : '#00D2FF';
    const buttonTextColor = useAccessibleColors ? '#FFFFFF' : '#FFFFFF';

    useEffect(() => {
        const handleScoreLogic = async () => {
            const existing = await getScores(EXPO_STORAGE_NAME);
            setLeaderboard(existing);
            setIsLoading(false);
        };

        handleScoreLogic();
    }, []);

    return (
        <View style={styles_starwars.scoreboardLucasContainer}>
            <ImageBackground
                source={require('@/assets/images/expos/carrieFisher/sb.jpg')}
                style={styles_starwars.scoreboardLucasBackgroundImage}
                contentFit="cover"
            />

            <View style={styles_starwars.scoreboardLucasOverlay}>
                <View style={styles_starwars.scoreboardLucasScoreBlock}>
                    <Text style={[styles_starwars.scoreboardLucasTitle, { color: mainTextColor }]}>
                        {trad('expo.carrie-fisher.scoreboard.title')}
                    </Text>
                    <Text style={[styles_starwars.scoreboardLucasSeparator, { color: mainTextColor }]}>--------------------</Text>

                    {isLoading ? (
                        <ActivityIndicator size="large" color="#F0A820" style={{ marginTop: 20 }} />
                    ) : (
                        leaderboard
                            .filter(entry => {
                                const validTimesCount = entry.times.filter(t => t !== undefined && t !== null).length;
                                return validTimesCount === 3;
                            })
                            .map((entry, index) => {
                                const totalTime = entry.times.reduce((acc, current) => {
                                    return (current !== undefined && current !== null) ? acc + current : acc;
                                }, 0);

                                return (
                                    <Text
                                        key={`${index}-${entry.username}`}
                                        style={[
                                            styles_starwars.scoreboardLucasScoreLine,
                                            useAccessibleColors && { color: mainTextColor },
                                            entry.username === currentUserName && { color: highlightTextColor }
                                        ].filter(Boolean)}
                                    >
                                        {index + 1}. {entry.username} : {formatTime(totalTime)}
                                    </Text>
                                );
                            })

                        )}

                    {!isLoading && leaderboard.length === 0 && (
                        <Text style={[styles_starwars.scoreboardLucasScoreLine, { color: mainTextColor }]}>
                            {trad('expo.carrie-fisher.scoreboard.empty')}
                        </Text>
                    )}
                </View>

                <TouchableOpacity
                    style={styles_starwars.scoreboardLucasNextButton}
                    onPress={() => onNavigate('home')}
                >
                    <Text style={[styles_starwars.scoreboardLucasNextButtonText, { color: buttonTextColor }]}>
                        {trad('expo.carrie-fisher.common.backToChallenges')}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Scoreboard;