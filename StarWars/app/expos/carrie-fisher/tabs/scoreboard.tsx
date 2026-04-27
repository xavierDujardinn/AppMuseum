import styles_starwars from '@/styles/expo/carrie-fisher/starwars';
import { ImageBackground } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { BG_LIST, formatTime, EXPO_STORAGE_NAME } from "@/app/expos/carrie-fisher/utils";
import { getScores, saveNewScore, ScoreEntry } from '@/app/common/scripts/storage';
import { useTranslation } from '@/app/common/hooks/languageContext';

interface TableauLucasProps {
    challengeId: number;
    onNext: () => void;
    elaspedTime: number;
}

const Scoreboard: React.FC<TableauLucasProps> = ({ challengeId, onNext, elaspedTime }) => {
    const [leaderboard, setLeaderboard] = useState<ScoreEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { userSettings } = useTranslation();
    const currentUserName = userSettings.userName.trim() || "Unknown";
    const useAccessibleColors = userSettings.colorBlindMode && userSettings.highContrast;
    const mainTextColor = useAccessibleColors ? '#FFFFFF' : undefined;
    const highlightTextColor = useAccessibleColors ? '#FFD166' : '#00D2FF';
    const buttonTextColor = useAccessibleColors ? '#111111' : undefined;

    useEffect(() => {
        const handleScoreLogic = async () => {
            try {
                const updatedScores = await saveNewScore(EXPO_STORAGE_NAME,challengeId, elaspedTime, currentUserName);
                setLeaderboard(updatedScores);
            } catch (error) {
                console.error("Erreur Scoreboard:", error);
                const existing = await getScores(EXPO_STORAGE_NAME, challengeId);
                setLeaderboard(existing);
            } finally {
                setIsLoading(false);
            }
        };

        handleScoreLogic();
    }, [challengeId, currentUserName, elaspedTime]);

    return (
        <View style={styles_starwars.scoreboardLucasContainer}>
            <ImageBackground
                source={BG_LIST[challengeId]}
                style={styles_starwars.scoreboardLucasBackgroundImage}
                contentFit="cover"
            />

            <View style={styles_starwars.scoreboardLucasOverlay}>
                <View style={styles_starwars.scoreboardLucasScoreBlock}>
                    <Text style={[styles_starwars.scoreboardLucasTitle, { color: mainTextColor }]}>Tableau des scores :</Text>
                    <Text style={[styles_starwars.scoreboardLucasSeparator, { color: mainTextColor }]}>--------------------</Text>

                    {isLoading ? (
                        <ActivityIndicator size="large" color="#F0A820" style={{ marginTop: 20 }} />
                    ) : (
                        leaderboard.map((entry, index) => (
                            <Text
                                key={`${index}-${entry.name}`}
                                style={[
                                    styles_starwars.scoreboardLucasScoreLine,
                                    useAccessibleColors && { color: mainTextColor },
                                    entry.name === currentUserName && { color: highlightTextColor }
                                ]}
                            >
                                {index + 1}. {entry.name} : {formatTime(entry.time)}
                            </Text>
                        ))
                    )}

                    {!isLoading && leaderboard.length === 0 && (
                        <Text style={[styles_starwars.scoreboardLucasScoreLine, { color: mainTextColor }]}>Aucun score enregistré</Text>
                    )}
                </View>

                <TouchableOpacity
                    style={styles_starwars.scoreboardLucasNextButton}
                    onPress={onNext}
                >
                    <Text style={[styles_starwars.scoreboardLucasNextButtonText, { color: buttonTextColor }]}>Suivant</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Scoreboard;