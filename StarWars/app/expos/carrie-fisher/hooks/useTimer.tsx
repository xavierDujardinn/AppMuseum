import { useState, useEffect, useCallback } from 'react';

const useTimer = (initialIsActive: boolean = true) => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isActive, setIsActive] = useState(initialIsActive);

    useEffect(() => {
        let interval: number | undefined;

        if (isActive) {
            interval = setInterval(() => {
                setElapsedTime((prev) => prev + 1);
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive]);

    const stopTimer = useCallback(() => setIsActive(false), []);
    const startTimer = useCallback(() => setIsActive(true), []);
    const resetTimer = useCallback(() => {
        setElapsedTime(0);
        setIsActive(false);
    }, []);

    return { elapsedTime, isActive, stopTimer, startTimer, resetTimer };
};

export default useTimer;