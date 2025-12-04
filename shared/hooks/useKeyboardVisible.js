import { useState, useEffect } from 'react';

/**
 * Hook to detect if mobile keyboard is visible/open and get its height
 * Uses Visual Viewport API for accurate detection on mobile devices
 * @returns {{isVisible: boolean, height: number}} Object with visibility state and keyboard height in pixels
 */
export function useKeyboardVisible() {
    const [keyboardState, setKeyboardState] = useState({
        isVisible: false,
        height: 0,
    });

    useEffect(() => {
        // Check if Visual Viewport API is supported (modern browsers)
        if (typeof window !== 'undefined' && window.visualViewport) {
            const viewport = window.visualViewport;
            const windowHeight = window.innerHeight;

            const handleResize = () => {
                const currentHeight = viewport.height;
                // Calculate keyboard height as the difference between window and viewport height
                const keyboardHeight = Math.max(0, windowHeight - currentHeight);
                
                // Keyboard is visible if height difference is significant (more than 150px)
                // This threshold accounts for browser UI and avoids false positives
                const threshold = 150;
                const isVisible = keyboardHeight > threshold;
                
                setKeyboardState({
                    isVisible,
                    height: isVisible ? keyboardHeight : 0,
                });
            };

            // Initial check
            handleResize();

            // Listen to viewport resize events
            viewport.addEventListener('resize', handleResize);
            viewport.addEventListener('scroll', handleResize);

            return () => {
                viewport.removeEventListener('resize', handleResize);
                viewport.removeEventListener('scroll', handleResize);
            };
        } else {
            // Fallback for browsers without Visual Viewport API
            // Uses window resize event and compares innerHeight changes
            let initialHeight = window.innerHeight;

            const handleResize = () => {
                const currentHeight = window.innerHeight;
                // Calculate keyboard height as the difference
                const keyboardHeight = Math.max(0, initialHeight - currentHeight);
                
                // Keyboard is visible if height decreased significantly (more than 150px)
                const threshold = 150;
                const isVisible = keyboardHeight > threshold;
                
                setKeyboardState({
                    isVisible,
                    height: isVisible ? keyboardHeight : 0,
                });
                
                // Update initial height if it increased (keyboard closed)
                if (currentHeight > initialHeight) {
                    initialHeight = currentHeight;
                    setKeyboardState({
                        isVisible: false,
                        height: 0,
                    });
                }
            };

            // Initial check
            handleResize();

            window.addEventListener('resize', handleResize);
            window.addEventListener('orientationchange', () => {
                // Reset initial height on orientation change
                setTimeout(() => {
                    initialHeight = window.innerHeight;
                    handleResize();
                }, 100);
            });

            return () => {
                window.removeEventListener('resize', handleResize);
                window.removeEventListener('orientationchange', handleResize);
            };
        }
    }, []);

    return keyboardState;
}

