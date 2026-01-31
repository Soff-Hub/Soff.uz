import { useEffect, useState } from 'react';
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect';

const useResponsive = () => {
    const [state, setState] = useState({
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        size: typeof window !== 'undefined' ? window.innerWidth : 0,
    });

    useIsomorphicLayoutEffect(() => {
        if (typeof window === 'undefined') return;
        const handleResize = () => {
            const { innerWidth } = window;
            setState({
                size: innerWidth,
                isMobile: innerWidth < 576,
                isTablet: innerWidth >= 576 && innerWidth < 992,
                isDesktop: innerWidth >= 992,
            });
        };

        // Initial call to set the initial state based on window width
        handleResize();

        // Add event listener for resize events
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return state;
};

export default useResponsive;
