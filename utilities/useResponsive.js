import { useState, useEffect } from 'react';

const useResponsive = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            const { innerWidth } = window;
            setIsMobile(innerWidth < 576);
            setIsTablet(innerWidth >= 576 && innerWidth < 992);
            setIsDesktop(innerWidth >= 992);
        };

        // Initial call to set the initial state based on window width
        handleResize();

        // Add event listener for resize events
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { isMobile, isTablet, isDesktop };
};

export default useResponsive;
