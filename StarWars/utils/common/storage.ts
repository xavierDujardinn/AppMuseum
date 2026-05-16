import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEY} from "@/config/config";

export interface ScoreEntry {
    username: string;
    times: number[];
}

export const saveNewScore = async (expoName: string, challengeId: number, time: number, name: string): Promise<ScoreEntry[]> => {

    try {
        const key = `${STORAGE_KEY}_${expoName}_scores`;
        const existingScores = await AsyncStorage.getItem(key);

        let scores: ScoreEntry[] = existingScores ? JSON.parse(existingScores) : [];

        let userEntry = scores.find(user => user.username === name);

        if (!userEntry) {
            userEntry = {
                username: name,
                times: []
            };
            scores.push(userEntry);
        }

        userEntry.times[challengeId] = time;

        await AsyncStorage.setItem(key, JSON.stringify(scores));
        return scores;
    } catch (e) {
        console.error("Erreur lors de la sauvegarde", e);
        return [];
    }
};

export const getScores = async (expoName: string): Promise<ScoreEntry[]> => {
    try {
        const rawScores = await AsyncStorage.getItem(`${STORAGE_KEY}_${expoName}_scores`);
        return rawScores ? JSON.parse(rawScores) : [];
    } catch (e) {
        console.error("Erreur lors de la récupération des scores", e);
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