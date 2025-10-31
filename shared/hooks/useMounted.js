import { useState, useEffect } from 'react';
import { useTimeManager } from './useTimeManager';

export const useMounted = (timer) => {
    const [isMounted, setIsMounted] = useState(false);
    const { startTimeout, stopTimeout } = useTimeManager();

    useEffect(() => {
        const timeoutId = startTimeout(() => {
            setIsMounted(true);
        }, timer || 10);
        return () => stopTimeout(timeoutId);
    }, [timer]);

    return isMounted;
};
