import React, { FC, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { getCompletedChallengeList } from "@/utils/common/storage";
import ThemedText from "@/app/common/components/themedText";
import { useUserSettings } from "@/app/common/hooks/userSettings";
import styles from '@/styles/hub/common';

interface ProgressBarProps {
    expoStorageName: string | undefined;
    nbChallenges: number | undefined;
}

const ProgressBar: FC<ProgressBarProps> = ({ expoStorageName, nbChallenges }) => {
    const [completedLevels, setCompletedLevels] = useState<boolean[]>([]);
    const { themeColors } = useUserSettings();

    useEffect(() => {
        const getProgression = async () => {
            if (expoStorageName) setCompletedLevels(await getCompletedChallengeList(expoStorageName));
        }

        getProgression();
    }, [expoStorageName]);

    const progressData = useMemo(() => {
        const count = completedLevels.filter(val => val).length;
        const total = nbChallenges || -1;
        return {
            percent: total > 0 ? (count / total) * 100 : 0,
            count,
            total
        };
    }, [completedLevels, nbChallenges]);

    return (
        <View style={styles.progressContainer}>
            <View style={styles.progressLabelContainer}>
                <ThemedText style={{ color: themeColors.text }} weight="semibold">
                    Progression
                </ThemedText>
                <ThemedText style={{ color: themeColors.text }}>
                    {progressData.count} / {progressData.total}
                </ThemedText>
            </View>

            <View style={[styles.progressBarBackground, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
                <View
                    style={[
                        styles.progressBarFill,
                        {
                            width: `${progressData.percent}%`,
                            backgroundColor: themeColors.accent
                        }
                    ]}
                />
            </View>
        </View>
    );
}

export default ProgressBar;