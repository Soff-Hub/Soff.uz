import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from '../style/chat.module.scss';
import { Input, Button, Avatar, Empty } from 'antd';
import { ArrowLeftOutlined, SendOutlined } from '@ant-design/icons';
import ChatMessage from './ChatMessage';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import useChat from '../api/useChat';

const ChatWindow = ({ chatId, goBack }) => {
    const [newMessage, setNewMessage] = useState('');
    const [edit, setEdit] = useState(null); 
    const messagesContainerRef = useRef(null);
    const { push } = useRouter();

    const { messages, chat, sendMessage, updateMessage } = useChat(chatId);

    const scrollToBottom = useCallback(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages.length, scrollToBottom]);

    useEffect(() => {
        if (edit) {
            setNewMessage(edit.content);
        }
    }, [edit]);

    const handleSend = useCallback(() => {
        if (!newMessage.trim()) return;

        if (edit) {
            // ✨ edit rejimida update
            updateMessage(newMessage, edit.id,);
            setEdit(null); // rejimdan chiqish
        } else {
            // ✨ yangi xabar
            sendMessage(newMessage);
        }

        setNewMessage('');
    }, [newMessage, edit, sendMessage, updateMessage]);

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
            {/* chat header */}
            <div className={styles.chat_user}>
                {goBack && (
                    <ArrowLeftOutlined style={{ cursor: "pointer" }} onClick={goBack} />
                )}
                <Avatar
                    size={50}
                    src={<img src={chat?.opponent?.photo_url  ||  "/static/img/ozodbek.png"} alt="user img" />}
                    onClick={() => push(`seller/${chat?.opponent?.id}`)}
                    style={{ cursor: "pointer" }}
                />
                <div className={styles.user_box}>
                    <div className={styles.user_names}>
                        <h4
                            onClick={() => push(`seller/${chat?.opponent?.id}`)}
                            style={{ cursor: "pointer" }}
                        >
                            {chat?.opponent?.name}
                        </h4>
                    </div>
                    <span>{chat?.opponent?.last_seen}</span>
                </div>
            </div>

            {/* chat messages */}
            <div className={styles.chat_messages} ref={messagesContainerRef}>
                {chat?.chat?.created_at && (
                    <div className={styles.chat_created_time}>
                        {dayjs(chat.created_at).format("YYYY-MM-DD HH:mm")}
                    </div>
                )}

                {messages?.length > 0 ? (
                    messages.map((msg) => (
                        <ChatMessage
                            pushUser={() => push(`seller/${chat?.chat?.opponent?.id}`)}
                            key={msg.id}
                            msg={msg}
                            onEdit={setEdit}
                        />
                    ))
                ) : (
                    <Empty
                        description="Hozircha xabarlar yo'q"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                )}
            </div>

            {/* input */}
            <div className={styles.chat_input_box}>
                <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onPressEnter={handleSend}
                    placeholder={edit ? "Xabarni tahrir qilyapsiz..." : "Xabar yozing..."}
                    className={styles.chat_input}
                />
                <Button
                    style={{ background: edit ? '#f59e0b' : '#00A44F' }}
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
