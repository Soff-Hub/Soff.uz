import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { f_base_ws_url } from '~/shared/api/base-url';

const DELAY_MS = 15000; // 15 seconds
const IMMEDIATE_THRESHOLD = 3;

const useOffers = (orderId, isOpen) => {
    const [offers, setOffers] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [bufferedCount, setBufferedCount] = useState(0);
    const [remainingSeconds, setRemainingSeconds] = useState(null);
    const wsRef = useRef(null);
    const { user } = useSelector((state) => state.auth);

    const bufferedOffersRef = useRef([]);
    const delayTimerRef = useRef(null);
    const countdownIntervalRef = useRef(null);
    const hasShownOffersRef = useRef(false);
    const startTimeRef = useRef(null);

    const hasDelayBeenApplied = (orderId) => {
        if (typeof window === 'undefined') return false;
        const key = `offer_delay_applied_${orderId}`;
        return localStorage.getItem(key) === 'true';
    };

    const markDelayAsApplied = (orderId) => {
        if (typeof window === 'undefined') return;
        const key = `offer_delay_applied_${orderId}`;
        localStorage.setItem(key, 'true');
    };

    const flushBufferedOffers = (orderId, markAsApplied = false) => {
        if (bufferedOffersRef.current.length === 0) return;

        setOffers((prev) => {
            const existingOfferIds = new Set(prev.map((o) => o.id));
            const newOffers = bufferedOffersRef.current.filter(
                (o) => !existingOfferIds.has(o.id)
            );
            return [...newOffers, ...prev];
        });

        bufferedOffersRef.current = [];
        setBufferedCount(0);
        setRemainingSeconds(null);
        hasShownOffersRef.current = true;

        // Clear countdown interval
        if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
            countdownIntervalRef.current = null;
        }

        if (markAsApplied && orderId) {
            markDelayAsApplied(orderId);
        }
    };

    useEffect(() => {
        if (!orderId || !isOpen) return;

        const delayAlreadyApplied = hasDelayBeenApplied(orderId);

        bufferedOffersRef.current = [];
        setBufferedCount(0);
        setRemainingSeconds(null);
        hasShownOffersRef.current = delayAlreadyApplied;
        startTimeRef.current = null;

        if (delayTimerRef.current) {
            clearTimeout(delayTimerRef.current);
            delayTimerRef.current = null;
        }

        if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
            countdownIntervalRef.current = null;
        }

        const wsUrl = `${f_base_ws_url}order-offers/${orderId}?token=${user?.access}`;
        const socket = new WebSocket(wsUrl);
        wsRef.current = socket;

        socket.onopen = () => {
            setIsConnected(true);
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data?.type !== 'offers_count') {
                    const existsInBuffer = bufferedOffersRef.current.some(
                        (o) => o.id === data.id
                    );

                    if (existsInBuffer) return;

                    if (delayAlreadyApplied || hasShownOffersRef.current) {
                        setOffers((prev) => {
                            if (prev.some((o) => o.id === data.id)) return prev;
                            return [data, ...prev];
                        });
                        return;
                    }

                    if (startTimeRef.current === null) {
                        startTimeRef.current = Date.now();
                    }

                    bufferedOffersRef.current.push(data);
                    setBufferedCount(bufferedOffersRef.current.length);

                    if (
                        bufferedOffersRef.current.length >= IMMEDIATE_THRESHOLD
                    ) {
                        if (delayTimerRef.current) {
                            clearTimeout(delayTimerRef.current);
                            delayTimerRef.current = null;
                        }
                        flushBufferedOffers(orderId, true); // Mark delay as applied
                        return;
                    }

                    if (
                        !delayTimerRef.current &&
                        bufferedOffersRef.current.length > 0
                    ) {
                        // Start countdown timer
                        const totalSeconds = Math.ceil(DELAY_MS / 1000);
                        setRemainingSeconds(totalSeconds);

                        // Update countdown every second
                        countdownIntervalRef.current = setInterval(() => {
                            setRemainingSeconds((prev) => {
                                if (prev === null || prev <= 1) {
                                    if (countdownIntervalRef.current) {
                                        clearInterval(
                                            countdownIntervalRef.current
                                        );
                                        countdownIntervalRef.current = null;
                                    }
                                    return null;
                                }
                                return prev - 1;
                            });
                        }, 1000);

                        // Set timeout to flush offers
                        delayTimerRef.current = setTimeout(() => {
                            flushBufferedOffers(orderId, true);
                            delayTimerRef.current = null;
                        }, DELAY_MS);
                    }
                }
            } catch (err) {
                console.error('❌ WS parse error:', err);
            }
        };

        socket.onclose = () => {
            setIsConnected(false);

            if (bufferedOffersRef.current.length > 0 && !delayAlreadyApplied) {
                flushBufferedOffers(orderId, true);
            } else if (bufferedOffersRef.current.length > 0) {
                flushBufferedOffers(orderId, false);
            }
        };

        socket.onerror = (err) => {
            console.error('⚠️ WS error:', err);
        };

        return () => {
            socket.close();
            if (delayTimerRef.current) {
                clearTimeout(delayTimerRef.current);
                delayTimerRef.current = null;
            }
            if (countdownIntervalRef.current) {
                clearInterval(countdownIntervalRef.current);
                countdownIntervalRef.current = null;
            }
            bufferedOffersRef.current = [];
            setBufferedCount(0);
            setRemainingSeconds(null);
            hasShownOffersRef.current = false;
            setOffers([]);
        };
    }, [orderId, isOpen]);

    return { offers, setOffers, isConnected, bufferedCount, remainingSeconds };
};

export const clearOfferDelayFlag = (orderId) => {
    if (typeof window === 'undefined') return;
    const key = `offer_delay_applied_${orderId}`;
    localStorage.removeItem(key);
};

export default useOffers;
