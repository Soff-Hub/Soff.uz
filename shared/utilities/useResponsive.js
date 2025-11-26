import { useState } from 'react';
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect';

const useResponsive = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const [size, setSize] = useState(0);

    useIsomorphicLayoutEffect(() => {
        setSize(window.innerWidth);
        const handleResize = () => {
            const { innerWidth } = window;
            setIsMobile(innerWidth < 576);
            setIsTablet(innerWidth >= 576 && innerWidth < 992);
            setIsDesktop(innerWidth >= 992);
            setSize(innerWidth);
        };

        // Initial call to set the initial state based on window width
        handleResize();

        // Add event listener for resize events
        window.addEventListener('resize', handleResize, { passive: true });

        // Cleanup event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { isMobile, isTablet, isDesktop, size };
};

export default useResponsive;
