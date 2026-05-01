import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEY} from "@/config/config";

export interface ScoreEntry {
    name: string;
    time: number;
}

export const saveNewScore = async (expoName: string, challengeId: number, time: number, name?: string): Promise<ScoreEntry[]> => {
    try {
        const key = `${STORAGE_KEY}_${expoName}_scores_${challengeId}`;
        const existingScoresRaw = await AsyncStorage.getItem(key);

        let scores: ScoreEntry[] = existingScoresRaw ? JSON.parse(existingScoresRaw) : [];

        if (time >= 0) {
            const newEntry: ScoreEntry = { name: name || "Unknown", time };
            scores.push(newEntry);
            scores.sort((a, b) => a.time - b.time);

            const updatedTopScores = scores.slice(0, 10);
            await AsyncStorage.setItem(key, JSON.stringify(updatedTopScores));

            return updatedTopScores;
        }

        return scores.slice(0, 10);
    } catch (e) {
        console.error("Erreur lors de la sauvegarde", e);
        return [];
    }
};

export const getScores = async (expoName:string, challengeId: number): Promise<ScoreEntry[]> => {
    try {
        const scores = await AsyncStorage.getItem(`${STORAGE_KEY}_${expoName}_scores_${challengeId}`);
        return scores ? JSON.parse(scores) : [];
    } catch (e) {
        console.error("Erreur lors de la récupération", e);
        return [];
    }
};

export const updateCompletedChallenge = async (expoName:string, challengeId: number, unlocked:boolean =  true): Promise<void> => {
    try {
        const unlockedChallenges = await AsyncStorage.getItem(`${STORAGE_KEY}_${expoName}_challenges`);
        let challenges = unlockedChallenges ? JSON.parse(unlockedChallenges) : [];

        challenges[challengeId] = unlocked;

        await AsyncStorage.setItem(`${STORAGE_KEY}_${expoName}_challenges`, JSON.stringify(challenges));
    } catch (e) {
        console.error("Erreur lors de la sauvegarde", e);
    }
}

export const getCompletedChallengeList = async (expoName:string) => {
    try {
        const challenges = await AsyncStorage.getItem(`${STORAGE_KEY}_${expoName}_challenges`);
        return challenges ? JSON.parse(challenges) : [];
    } catch (e) {
        console.error("Erreur lors de la récupération", e);
        return [];
    }
}

export const resetAllData = async () => {
    try{
        // Delete everything in app storage
        await AsyncStorage.clear();
    } catch (e) {
        console.error("Erreur lors du reset des données", e);
    }
}