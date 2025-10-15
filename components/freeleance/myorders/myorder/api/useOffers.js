import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { f_base_ws_url } from '~/shared/api/base-url';

const useOffers = (orderId, isOpen) => {
    const [offers, setOffers] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const wsRef = useRef(null);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!orderId || !isOpen) return;

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
                    setOffers((prev) => {
                        if (prev.some((o) => o.id === data.id)) return prev;
                        return [data, ...prev];
                    });
                }
            } catch (err) {
                console.error('❌ WS parse error:', err);
            }
        };

        socket.onclose = () => {
            setIsConnected(false);
        };

        socket.onerror = (err) => {
            console.error('⚠️ WS error:', err);
        };

        return () => {
            socket.close();
            setOffers([]);
        };
    }, [orderId, isOpen]);

    return { offers, setOffers, isConnected };
};

export default useOffers;
