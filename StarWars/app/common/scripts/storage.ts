import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@escape_museum_scores';

export interface ScoreEntry {
    name: string;
    time: number;
}

export const saveNewScore = async (expoName:string, challengeId: number, time: number, name?: string): Promise<ScoreEntry[]> => {
    try {
        const existingScoresRaw = await AsyncStorage.getItem(`${STORAGE_KEY}_${expoName}_${challengeId}`);
        let scores: ScoreEntry[] = existingScoresRaw ? JSON.parse(existingScoresRaw) : [
        ];

        const newEntry: ScoreEntry = { name: name || "Unknown", time };
        scores.push(newEntry);

        scores.sort((a, b) => a.time - b.time);

        const topScores = scores.slice(0, 10);

        await AsyncStorage.setItem(`${STORAGE_KEY}_${challengeId}`, JSON.stringify(topScores));
        return topScores;
    } catch (e) {
        console.error("Erreur lors de la sauvegarde", e);
        return [];
    }
};

export const getScores = async (challengeId: number): Promise<ScoreEntry[]> => {
    try {
        const scores = await AsyncStorage.getItem(`${STORAGE_KEY}_${challengeId}`);
        return scores ? JSON.parse(scores) : [];
    } catch (e) {
        console.error("Erreur lors de la récupération", e);
        return [];
    }
};