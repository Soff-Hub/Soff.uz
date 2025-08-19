import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useGetChatById from './useGetChatById';

const useChat = (chatId) => {
    const [messages, setMessages] = useState([]);
    const [chat, setChat] = useState();
    const { user } = useSelector(state => state.auth);
    const { data } = useGetChatById(chatId);
    const wsRef = useRef();

    useEffect(() => {
        if (chatId && data) {
            setChat(data.chat);
            setMessages(data.messages);
        }
    }, [chatId, data]);

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
                        // yangi kelganida ham unreadlarni tekshirib yuboramiz
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

        ws.onclose = () => console.log("🔌 WS closed");
        ws.onerror = (err) => console.error("❌ WS error:", err);

        return () => ws.close();
    }, [chatId, user?.access]);

    // 🔥 Unread message'larni yig'ib serverga yuborish
    const sendUnreadMessages = (ws, messages) => {
        if (!ws || ws.readyState !== WebSocket.OPEN) return;
        const unreadIds = messages.filter(m => !m.is_read).map(m => m.id);
        if (unreadIds.length > 0) {
            ws.send(JSON.stringify({
                event: "message_read",
                message_ids: unreadIds
            }));
            console.log("📤 message_read yuborildi:", unreadIds);
        }
    };

    // Xabar yuborish
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

    return {
        messages,
        chat,
        sendMessage,
        updateMessage
    };
};

export default useChat;
