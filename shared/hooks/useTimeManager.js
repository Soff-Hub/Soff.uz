import { useRef, useEffect, useCallback } from 'react';

export function useTimeManager() {
    const timeouts = useRef(new Set());
    const intervals = useRef(new Set());

    const startTimeout = useCallback((callback, delay) => {
        const id = setTimeout(() => {
            timeouts.current.delete(id);
            callback();
        }, delay);
        timeouts.current.add(id);
        return id;
    }, []);

    const stopTimeout = useCallback((id) => {
        if (id) {
            clearTimeout(id);
            timeouts.current.delete(id);
        } else {
            timeouts.current.forEach(clearTimeout);
            timeouts.current.clear();
        }
    }, []);

    const startInterval = useCallback((callback, delay) => {
        const id = setInterval(callback, delay);
        intervals.current.add(id);
        return id;
    }, []);

    const stopInterval = useCallback((id) => {
        if (id) {
            clearInterval(id);
            intervals.current.delete(id);
        } else {
            intervals.current.forEach(clearInterval);
            intervals.current.clear();
        }
    }, []);

    const clearAll = useCallback(() => {
        stopTimeout();
        stopInterval();
    }, [stopTimeout, stopInterval]);

    useEffect(() => clearAll, [clearAll]);

    return {
        startTimeout,
        stopTimeout,
        startInterval,
        stopInterval,
        clearAll,
    };
}
