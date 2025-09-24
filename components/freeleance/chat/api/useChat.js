import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useGetChatById from './useGetChatById';

const useChat = (chatId) => {
    const [messages, setMessages] = useState([]);
    const [chat, setChat] = useState();

    const { user } = useSelector(state => state.auth);
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useGetChatById(chatId);
    const wsRef = useRef();
    useEffect(() => {
        if (chatId && data) {
            setChat(data?.pages[0]?.chat);

            let allMsgs = data.pages.flatMap(p => p.messages);

            allMsgs = allMsgs.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

            const uniqueMsgs = Array.from(new Map(allMsgs.map(m => [m.id, m])).values());

            setMessages(uniqueMsgs);
        }
    }, [chatId, data]);

    const sendUnreadMessages = (ws, messages) => {
        if (!ws || ws.readyState !== WebSocket.OPEN) return;
        const unreadIds = messages?.filter(m => !m.is_read).map(m => m.id);
        if (unreadIds?.length > 0) {
            ws.send(JSON.stringify({
                event: "message_read",
                message_ids: unreadIds
            }));
        }
    };

    const sendMessage = (content) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({
                event: "message",
                content
            }));
        }
    };



    const updateMessage = (content, message_id) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({
                event: "message_update",
                content,
                message_id,
            }));
        }
    };

    useEffect(() => {
        if (!chatId || !user?.access) return;

        const ws = new WebSocket(
            `${process.env.NEXT_PUBLIC_WS_FREELEANCE_URL}${chatId}/?token=${user.access}`
        );
        wsRef.current = ws;

        ws.onopen = () => {
            sendUnreadMessages(ws, messages);
        };

        ws.onmessage = (event) => {
            if (!event.data) {
                console.warn("⚠️ WS event.data bo‘sh:", event);
                return;
            }

            let msg;
            try {
                msg = JSON.parse(event.data);
            } catch (e) {
                console.warn("⚠️ JSON emas data:", event.data);
                return;
            }

            switch (msg.event) {
                case "message":
                    setMessages(prev => {
                        const updated = [...prev, msg];
                        sendUnreadMessages(ws, updated);
                        return updated;
                    });
                    break;
                case "message_update":
                    setMessages(prev => prev.map(m =>
                        m.id === msg.id ? { ...m, ...msg } : m
                    ));
                    break;
                case "delete_message":
                    setMessages(prev => prev.filter(m => m.id !== msg.id));
                    break;
                default:
                    console.warn("Unknown event:", msg);
            }
            setTimeout(() => {
                sendUnreadMessages(ws, messages);
            }, 1000);
        };


        return () => ws.close();
    }, [chatId, user?.access]);

    return {
        messages,
        chat,
        sendMessage,
        updateMessage,
        sendUnreadMessages,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    };
};

export default useChat;