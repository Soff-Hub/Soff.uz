import React, { useState, useRef, useEffect } from 'react';
import styles from '../style/chat.module.scss';
import { Input, Button, Avatar, Empty } from 'antd';
import { ArrowLeftOutlined, SendOutlined } from '@ant-design/icons';
import useSendMessage from '../api/useSendMessage';
import useGetChatById from '../api/useGetChatById';
import ChatMessage from './ChatMessage';
import useEditMessage from '../api/useEditMessage';
import dayjs from 'dayjs';
import { useQueryClient } from '@tanstack/react-query';
import useReadMessage from '../api/useReadMessage';

const ChatWindow = ({ chatId, goBack }) => {
    const [editingMessage, setEditingMessage] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const { mutate: sendMessage } = useSendMessage();
    const { data: chat } = useGetChatById(chatId);
    const { mutate: editMessage } = useEditMessage();
    const { mutate: readMsg } = useReadMessage();
    const wsRef = useRef(null);
    const queryClient = useQueryClient()

    const messagesContainerRef = useRef(null);

    const handleSend = () => {
        if (!newMessage.trim()) return;

        if (editingMessage) {
            editMessage({ id: editingMessage.id, content: newMessage });
            setEditingMessage(null);
        } else {
            sendMessage({ chat_id: chatId, content: newMessage });
        }

        setNewMessage('');
    };

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [chat]);

    useEffect(() => {
        if (!chat?.messages) return;

        const unreadMessages = chat.messages.filter(
            (m) => !m.is_mine && !m.is_read
        );

        if (unreadMessages.length === 0) return;

        unreadMessages.forEach((m) => {
            readMsg({ id: m.id });
        });
    }, [chat?.messages]);

    console.log(chat?.chat?.opponent?.id, "_________________________________________")

    useEffect(() => {
        if (!chatId || !chat?.chat?.opponent?.id) return;

        const ws = new WebSocket(
            `${process.env.NEXT_PUBLIC_WS_FREELEANCE_URL}${chatId}/${chat.chat.opponent.id}`
        );
        wsRef.current = ws;

        ws.onopen = () => {
            console.log("✅ WebSocket ulandi");
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("📩 Yangi xabar:", data);
            queryClient.invalidateQueries(['chat']);
        };

        ws.onerror = (err) => {
            console.error("❌ WebSocket xatosi:", err);
        };

        ws.onclose = () => {
            console.log("🔌 WebSocket yopildi");
        };

        return () => {
            ws.close();
        };
    }, [chatId, chat?.chat?.opponent?.id]);

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
                {goBack &&
                    <ArrowLeftOutlined style={{ cursor: "pointer" }} onClick={goBack} />
                }
                <Avatar
                    size={50}
                    src={<img src="/static/img/ozodbek.png" alt="user img" />}
                />
                <div className={styles.user_box}>
                    <div className={styles.user_names}>
                        <h4>{chat?.chat?.opponent?.name}</h4>
                        {/* <p>user full_name</p> */}
                        {/* <span>9:01</span> */}
                    </div>
                    <span>{chat?.chat?.opponent?.last_seen}</span>
                </div>
            </div>

            <div
                className={styles.chat_messages}
                ref={messagesContainerRef}
            >
                {chat?.chat?.created_at && (
                    <div className={styles.chat_created_time}>
                        {dayjs(chat.created_at).format("YYYY-MM-DD HH:mm")}
                    </div>
                )}

                {chat?.messages?.length > 0 ? (
                    chat.messages.map((msg) => (
                        <ChatMessage
                            key={msg.id}
                            msg={msg}
                            onEdit={(message) => {
                                setEditingMessage(message);
                                setNewMessage(message.content);
                            }}

                        />
                    ))
                ) : (
                    <div className="text-center text-muted py-3">
                        Xabarlar yo‘q
                    </div>
                )}
            </div>

            <div className={styles.chat_input_box}>
                {editingMessage && (
                    <div className="text-warning mb-1">
                        <Button onClick={() => {
                            setEditingMessage(null)
                            setNewMessage('')
                        }}>
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
                    // icon={}
                >
                    <SendOutlined style={{fontSize: "20px"}}/>
                </Button>
            </div>
        </div>
    );
};

export default ChatWindow;
