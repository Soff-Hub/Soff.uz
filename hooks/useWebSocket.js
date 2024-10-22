import { useEffect, useRef, useState } from 'react';
import useCredentials from './useCredentials';

const useWebSocket = (url, options) => {
    const { onMessage, onOpen, onClose, onError } = options;
    const socket = useRef(null);
    const [isConnected, setIsConnected] = useState(false);
    const { token } = useCredentials();

    function connect() {
        if (token) {
            socket.current = new WebSocket(url + `?token=${token}`);

            socket.current.onopen = () => {
                setIsConnected(true);
                onOpen && onOpen();
            };

            socket.current.onmessage = (event) => {
                onMessage && onMessage(event);
            };

            socket.current.onclose = () => {
                setIsConnected(false);
                onClose && onClose();
            };

            socket.current.onerror = (event) => {
                onError && onError(event);
            };
        }
    }

    useEffect(() => {
        connect();

        return () => {
            socket.current?.close();
        };
    }, [url, token]);

    const sendMessage = (message) => {
        if (socket.current && isConnected) {
            socket.current.send(message);
        }
    };

    return { sendMessage, isConnected, reConntect: connect };
};

export default useWebSocket;
