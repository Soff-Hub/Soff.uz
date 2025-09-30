import { useEffect } from 'react';

function useScrollToNotFound(ref, showResults, data) {
    useEffect(() => {
        if (!showResults && ref.current) {
            setTimeout(() => {
                ref.current.scrollIntoView({ behavior: 'smooth' });
            }, 1000);
        }
    }, [showResults, ref, data]);
}

export default useScrollToNotFound;
