import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const useOffers = (orderId) => {
    const [offers, setOffers] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const wsRef = useRef(null);
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        if (!orderId) return;

        // ✅ WebSocket URL
        const wsUrl = `${process.env.NEXT_PUBLIC_WS_FREELEANCE_URL}order-offers/${orderId}?token=${user?.access}`;
        const socket = new WebSocket(wsUrl);
        wsRef.current = socket;

        socket.onopen = () => {
            setIsConnected(true);
            console.log("🔌 Connected to offers WS:", wsUrl);
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log("📩 New offer message:", data);
                setOffers((prev) => [...prev, data]);
            } catch (error) {
                console.error("❌ WS parse error:", error);
            }
        };

        socket.onclose = () => {
            setIsConnected(false);
            console.log("❌ Offers WS closed");
        };

        socket.onerror = (err) => {
            console.error("⚠️ WS error:", err);
        };

        return () => {
            socket.close();
        };
    }, [orderId]);

    return { offers, isConnected };
};

export default useOffers;
