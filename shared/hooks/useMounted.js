import { useState, useEffect } from 'react';
import { useTimeManager } from './useTimeManager';

export const useMounted = (timer) => {
    const [isMounted, setIsMounted] = useState(false);
    const { startTimout, stopTimeout } = useTimeManager();

    useEffect(() => {
        const timeoutId = startTimout(() => {
            setIsMounted(true);
        }, timer || 10);
        return () => stopTimeout(timeoutId);
    }, [setTimeout, timer]);

    return isMounted;
};
