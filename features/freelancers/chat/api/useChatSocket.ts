import { useCallback, useRef, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { WS_READY_STATE } from '../constants/socket-state';

type useChatSocketProps = {
    chatId?: string;
    user: any;
};

export function useChatSocket({ chatId, user }: useChatSocketProps) {
    const forceReconnectKeyRef = useRef(0);
    const [reconnectKey, setReconnectKey] = useState(0);
    const wsUrl =
        chatId && user?.access
            ? `${process.env.NEXT_PUBLIC_WS_FREELEANCE_URL}chat/${chatId}/?token=${user.access}&_reconnect=${reconnectKey}`
            : null;
    const {
        sendMessage: sendWsMessage,
        lastMessage,
        readyState,
        getWebSocket,
    } = useWebSocket(wsUrl, {
        onOpen: () => {
            console.log('✅ WebSocket opened, reconnectKey:', reconnectKey);
        },
        onClose: (event) => {
            console.log(
                '🔴 WebSocket closed, reconnectKey:',
                reconnectKey,
                'code:',
                event.code
            );
        },
        onError: (error) => {
            console.error('❌ Chat WebSocket error:', error, { chatId });
        },
        shouldReconnect: (closeEvent) => {
            // Reconnect unless it's a clean close (code 1000) or no chatId/user
            return !!chatId && !!user?.access && closeEvent?.code !== 1000;
        },
        reconnectAttempts: 5,
        reconnectInterval: (attemptNumber) => {
            // Exponential backoff: 1s, 2s, 4s, 8s, 16s
            return Math.min(1000 * Math.pow(2, attemptNumber), 16000);
        },
        share: false, // Don't share connections - each chat gets its own unique connection
    });

    const isConnected = readyState === WS_READY_STATE.OPEN;

    const forceReconnect = useCallback(() => {
        const newKey = forceReconnectKeyRef.current + 1;
        forceReconnectKeyRef.current = newKey;
        setReconnectKey(newKey);
    }, [reconnectKey]);

    return {
        sendWsMessage,
        lastMessage,
        readyState,
        getWebSocket,
        isConnected,
        forceReconnect,
    };
}
