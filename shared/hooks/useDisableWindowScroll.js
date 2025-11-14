import { useEffect } from 'react';

export function useDisableWindowScroll(disableMode) {
    useEffect(() => {
        if (!document) return;
        if (disableMode) {
            // Store current scroll position and disable scroll
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = `-${window.scrollY}px`;
        } else {
            // Re-enable scroll and restore position
            const scrollY = document.body.style.top;
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }

        // Cleanup function to restore scroll when component unmounts
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
        };
    }, [disableMode]);
}
