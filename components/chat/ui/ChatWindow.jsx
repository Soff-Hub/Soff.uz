import React, { useState, useRef, useEffect } from 'react';
import styles from '../style/chat.module.scss';
import { Input, Button, Avatar, Empty } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import useSendMessage from '../api/useSendMessage';
import useGetChatById from '../api/useGetChatById';
import ChatMessage from './ChatMessage';
import useEditMessage from '../api/useEditMessage';

const ChatWindow = ({ chatId }) => {
    const [editingMessage, setEditingMessage] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const { mutate: sendMessage } = useSendMessage();
    const { data: chat } = useGetChatById(chatId);
    const { mutate: editMessage } = useEditMessage();

    // Chat messages container ref
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

    // Xabarlar o'zgarganda faqat chat oynasining ichida scroll pastga tushsin
    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, [chat]);

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
                <Avatar
                    size={50}
                    src={<img src="/static/img/ozodbek.png" alt="user img" />}
                />
                <div className={styles.user_box}>
                    <div className={styles.user_names}>
                        <h4>Username</h4>
                        <p>user full_name</p>
                        <span>9:01</span>
                    </div>
                </div>
            </div>

            <div
                className={styles.chat_messages}
                ref={messagesContainerRef}
            >
                {chat?.messages?.length > 0 ? (
                    chat.messages.map((msg) => (
                        <ChatMessage
                            msg={msg}
                            chat={chat}
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

            {/* Input Box */}
            <div className={styles.chat_input_box}>
                {editingMessage && (
                    <div className="text-warning mb-1">
                        Tahrirlash rejimi —
                        <Button type="link" onClick={() => {
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
                >
                    Yuborish <SendOutlined />
                </Button>
            </div>
        </div>
    );
};

export default ChatWindow;
