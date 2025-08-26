import { useState, useEffect } from 'react';

const useResponsive = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);
    const [size, setSize] = useState(0)

    useEffect(() => {
        setSize(window.innerWidth)
        const handleResize = () => {
            const { innerWidth } = window;
            setIsMobile(innerWidth < 576);
            setIsTablet(innerWidth >= 576 && innerWidth < 992);
            setIsDesktop(innerWidth >= 992);
            setSize(innerWidth)
        };

        // Initial call to set the initial state based on window width
        handleResize();

        // Add event listener for resize events
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { isMobile, isTablet, isDesktop, size };
};

export default useResponsive;
