import { useState, useEffect } from 'react';

export function useContentViewport(...args) {
    const [containerHeight, setContainerHeight] = useState('100vh');
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        const calculateHeight = () => {
            // Find the site header element
            const siteHeader = document.querySelector('.site-header');

            if (!siteHeader) return;

            // Get the dynamic header height (includes FastDownloadSection when visible)
            const siteHeaderHeight = siteHeader.offsetHeight;

            // Set header height
            setHeaderHeight(siteHeaderHeight);

            // Pure viewport height minus header height
            const availableHeight = window.innerHeight - siteHeaderHeight;

            // Set this height directly on the chat window container
            setContainerHeight(availableHeight);
        };

        const timeoutId = setTimeout(calculateHeight, 0);

        window.addEventListener('resize', calculateHeight);

        const siteHeader = document.querySelector('.site-header');
        const resizeObserver = new ResizeObserver(() => {
            calculateHeight();
        });

        if (siteHeader) {
            resizeObserver.observe(siteHeader);
        }

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', calculateHeight);
            resizeObserver.disconnect();
        };
    }, [args]);

    return { containerHeight, headerHeight };
}
