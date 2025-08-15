import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from '../style/chat.module.scss';
import { Input, Button, Avatar, Empty, Spin } from 'antd';
import { ArrowLeftOutlined, SendOutlined } from '@ant-design/icons';
import useSendMessage from '../api/useSendMessage';
import useGetChatById from '../api/useGetChatById';
import ChatMessage from './ChatMessage';
import useEditMessage from '../api/useEditMessage';
import dayjs from 'dayjs';
import { useQueryClient } from '@tanstack/react-query';
import useReadMessage from '../api/useReadMessage';
import { useSelector } from 'react-redux';

const ChatWindow = ({ chatId, goBack }) => {
    const [editingMessage, setEditingMessage] = useState(null);
    const [newMessage, setNewMessage] = useState('');

    const { mutate: sendMessage } = useSendMessage();
    const { data: chat, isLoading, isError } = useGetChatById(chatId);
    const { mutate: editMessage } = useEditMessage();
    const { mutate: readMsg } = useReadMessage();
    const { user } = useSelector(state => state.auth);

    const wsRef = useRef(null);
    const queryClient = useQueryClient();
    const messagesContainerRef = useRef(null);

    const scrollToBottom = useCallback(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, []);

    const handleSend = useCallback(() => {
        if (!newMessage.trim()) return;

        if (editingMessage) {
            editMessage({ id: editingMessage.id, content: newMessage });
            setEditingMessage(null);
        } else {
            sendMessage({ chat_id: chatId, content: newMessage });
        }
        setNewMessage('');
    }, [newMessage, editingMessage, chatId, sendMessage, editMessage]);

    const handleEdit = useCallback((message) => {
        setEditingMessage(message);
        setNewMessage(message.content);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [chat?.messages?.length, scrollToBottom]);

    useEffect(() => {
        if (!chat?.messages) return;

        const unreadMessages = chat.messages.filter(m => !m.is_mine && !m.is_read);
        if (unreadMessages.length === 0) return;

        const timer = setTimeout(() => {
            unreadMessages.forEach((m) => {
                readMsg({ id: m.id });
            });
        }, 300);

        return () => clearTimeout(timer);
    }, [chat?.messages, readMsg]);

    useEffect(() => {
        if (!chatId || !chat?.chat?.opponent?.id) return;

        const ws = new WebSocket(
            `${process.env.NEXT_PUBLIC_WS_FREELEANCE_URL}${chatId}/?token=${user?.access}`
        );
        wsRef.current = ws;

        ws.onopen = () => console.log("✅ WebSocket ulandi");

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            queryClient.setQueryData(['chat'], old => {
                if (!old) return { messages: [data] };
                return {
                    ...old,
                    messages: [...(old.messages || []), data]
                };
            });
        };

        ws.onerror = (err) => console.error("❌ WebSocket xatosi:", err);
        ws.onclose = () => console.log("🔌 WebSocket yopildi");

        return () => ws.close();
    }, [chatId, chat?.chat?.opponent?.id, user?.access, queryClient]);

    if (!chatId) {
        return (
            <div className={`${styles.chat_window} d-flex align-items-center justify-content-center`}>
                <Empty
                    description="Chatni tanlang"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
            </div>
        );
    }

    return (
        <div className={styles.chat_window}>
            <div className={styles.chat_user}>
                {goBack && (
                    <ArrowLeftOutlined style={{ cursor: "pointer" }} onClick={goBack} />
                )}
                <Avatar
                    size={50}
                    src={<img src="/static/img/ozodbek.png" alt="user img" />}
                />
                <div className={styles.user_box}>
                    <div className={styles.user_names}>
                        <h4>{chat?.chat?.opponent?.name}</h4>
                    </div>
                    <span>{chat?.chat?.opponent?.last_seen}</span>
                </div>
            </div>

            <div className={styles.chat_messages} ref={messagesContainerRef}>
                {chat?.chat?.created_at && (
                    <div className={styles.chat_created_time}>
                        {dayjs(chat.created_at).format("YYYY-MM-DD HH:mm")}
                    </div>
                )}

                {isLoading && (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <Spin size='large' tip="Qidirilmoqda..." />
                    </div>
                )}

                {chat?.messages?.length > 0 && !isLoading && (
                    chat.messages.map((msg) => (
                        <ChatMessage
                            key={msg.id}
                            msg={msg}
                            onEdit={handleEdit}
                        />
                    ))
                )}

                {!isLoading && chat?.messages?.length === 0 && (
                    <Empty
                        description="Hozircha xabarlar yo'q"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                )}
            </div>

            <div className={styles.chat_input_box}>
                {editingMessage && (
                    <div className="text-warning mb-1">
                        <Button onClick={() => { setEditingMessage(null); setNewMessage(''); }}>
                            Bekor qilish
                        </Button>
                    </div>
                )}
                <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onPressEnter={handleSend}
                    placeholder="Xabar yozing..."
                    className={styles.chat_input}
                />
                <Button
                    style={{ background: '#00A44F' }}
                    type="primary"
                    onClick={handleSend}
                >
                    <SendOutlined style={{ fontSize: "20px" }} />
                </Button>
            </div>
        </div>
    );
};

export default ChatWindow;
