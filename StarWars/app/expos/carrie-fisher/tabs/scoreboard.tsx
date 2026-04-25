import styles_starwars from '@/styles/expo/carrie-fisher/starwars';
import { ImageBackground } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { BG_LIST, formatTime } from "@/app/expos/carrie-fisher/utils";
import { getScores, saveNewScore, ScoreEntry } from '@/app/common/scripts/storage';
import { useTranslation } from '@/app/common/hooks/languageContext';
import ThemedText from '@/app/common/components/themedText';

interface TableauLucasProps {
    challengeId: number;
    onNext: () => void;
    elaspedTime: number;
}

const Scoreboard: React.FC<TableauLucasProps> = ({ challengeId, onNext, elaspedTime }) => {
    const [leaderboard, setLeaderboard] = useState<ScoreEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { userSettings } = useTranslation();

    useEffect(() => {
        const handleScoreLogic = async () => {
            try {
                const fallbackName = "Unknown";
                const playerName = userSettings.userName.trim() || fallbackName;
                const updatedScores = await saveNewScore("carrieFisher", challengeId, elaspedTime, playerName);
                setLeaderboard(updatedScores);
            } catch (error) {
                console.error("Erreur Scoreboard:", error);
                const existing = await getScores(challengeId);
                setLeaderboard(existing);
            } finally {
                setIsLoading(false);
            }
        };

        handleScoreLogic();
    }, [challengeId, elaspedTime]);

    return (
        <View style={styles_starwars.scoreboardLucasContainer}>
            <ImageBackground
                source={BG_LIST[challengeId]}
                style={styles_starwars.scoreboardLucasBackgroundImage}
                contentFit="cover"
            />

            <View style={styles_starwars.scoreboardLucasOverlay}>
                <View style={styles_starwars.scoreboardLucasScoreBlock}>
                    <ThemedText style={styles_starwars.scoreboardLucasTitle} weight="bold">Tableau des scores :</ThemedText>
                    <ThemedText style={styles_starwars.scoreboardLucasSeparator}>--------------------</ThemedText>

                    <ThemedText style={[styles_starwars.scoreboardLucasScoreLine, styles_starwars.scoreboardLucasPlayerTime]}>
                        Ton temps : {formatTime(elaspedTime)}
                    </ThemedText>

                    {isLoading ? (
                        <ActivityIndicator size="large" color="#F0A820" style={{ marginTop: 20 }} />
                    ) : (
                        leaderboard.map((entry, index) => (
                            <ThemedText
                                key={`${index}-${entry.name}`}
                                style={[
                                    styles_starwars.scoreboardLucasScoreLine,
                                    entry.name !== "Unknown" && { color: '#00D2FF' }
                                ]}
                            >
                                {index + 1}. {entry.name} : {formatTime(entry.time)}
                            </ThemedText>
                        ))
                    )}

                    {!isLoading && leaderboard.length === 0 && (
                        <ThemedText style={styles_starwars.scoreboardLucasScoreLine}>Aucun score enregistré</ThemedText>
                    )}
                </View>

                <TouchableOpacity
                    style={styles_starwars.scoreboardLucasNextButton}
                    onPress={onNext}
                >
                    <ThemedText style={styles_starwars.scoreboardLucasNextButtonText} weight="bold">Suivant</ThemedText>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Scoreboard;