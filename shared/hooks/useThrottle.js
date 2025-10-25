import { useEffect, useMemo, useRef } from 'react';

export function useThrottle(callback, limit = 300) {
    const callbackRef = useRef(callback);
    const timeoutRef = useRef(null);
    const lastCallTimeRef = useRef(0);
    const lastArgsRef = useRef(null);
    const lastContextRef = useRef(null);

    // Keep the latest callback
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    const throttled = useMemo(() => {
        const invoke = () => {
            if (lastArgsRef.current) {
                callbackRef.current.apply(
                    lastContextRef.current,
                    lastArgsRef.current
                );
                lastCallTimeRef.current = Date.now();
                lastArgsRef.current = null;
                lastContextRef.current = null;
            }
        };

        const fn = function (...args) {
            const now = Date.now();
            const remaining = limit - (now - lastCallTimeRef.current);

            if (remaining <= 0) {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                }
                callbackRef.current.apply(this, args);
                lastCallTimeRef.current = now;
            } else {
                lastArgsRef.current = args;
                lastContextRef.current = this;

                if (!timeoutRef.current) {
                    timeoutRef.current = setTimeout(() => {
                        timeoutRef.current = null;
                        invoke();
                    }, remaining);
                }
            }
        };

        fn.cancel = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            lastArgsRef.current = null;
            lastContextRef.current = null;
        };

        return fn;
    }, [limit]);

    // Cleanup on unmount
    useEffect(() => {
        return () => throttled.cancel();
    }, [throttled]);

    return throttled;
}
