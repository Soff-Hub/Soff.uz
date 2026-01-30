import { useEffect, useState } from 'react';
import { useTimeManager } from './useTimeManager';

export default function useDebounce(value, delay) {
    const { startTimeout, stopTimeout } = useTimeManager();
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = startTimeout(() => {
            setDebouncedValue(value || '');
        }, delay);

        return () => {
            stopTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
