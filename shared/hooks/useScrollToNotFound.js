import { useEffect } from 'react';
import { useTimeManager } from './useTimeManager';

function useScrollToNotFound(ref, showResults, data) {
    const { startTimeout, stopTimeout } = useTimeManager();

    useEffect(() => {
        if (!showResults && ref?.current) {
            const timing = startTimeout(() => {
                ref.current.scrollIntoView({ behavior: 'smooth' });
            }, 1000);

            return () => stopTimeout(timing);
        }
    }, [showResults, ref, data]);
}

export default useScrollToNotFound;
