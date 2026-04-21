import { useState, useCallback } from 'react';

// we use generic type for this
export function useNavigationLogic<destination extends string>(initialScreen: destination) {
    const [route, setRoute] = useState<{ name: destination; params?: any }>({ name: initialScreen });
    const [history, setHistory] = useState<{ name: destination; params?: any }[]>([]);

    const handleBack = useCallback(() => {
        if (history.length !== 0) {

            const newHistory = [...history];
            const previousRoute = newHistory.pop();

            if (previousRoute) {
                setRoute(previousRoute);
                setHistory(newHistory);
            }
        }
    }, [history]);

    const handleNavigate = useCallback((name: destination, params?: any) => {
        setHistory(prev => [...prev, route]);
        setRoute({ name, params });
    }, [route]);

    return {
        route,
        handleNavigate,
        handleBack,
        canGoBack: history.length > 0
    };
}