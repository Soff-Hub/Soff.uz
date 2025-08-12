import React, { useState } from 'react';
import styles from '../style/chat.module.scss';
import { Input, Button, Avatar, Empty } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import useSendMessage from '../api/useSendMessage';

const ChatWindow = ({ chatId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { mutate: sendMessage } = useSendMessage()

    const handleSend = () => {
        if (!newMessage.trim()) return;
        sendMessage({chat_id: chatId, content: newMessage})
        setNewMessage('');
    };

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
                    {/* <span>...is typing</span> */}
                </div>
            </div>

            <div className={styles.chat_messages}>
                {messages.length > 0 ? (
                    messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`${styles.chat_message} ${
                                msg.sender === 'me' ? styles.my_message : styles.other_message
                            }`}
                        >
                            {msg.text}
                        </div>
                    ))
                ) : (
                    <div className="text-center text-muted py-3">
                        Xabarlar yo‘q
                    </div>
                )}
            </div>

            {/* Input Box */}
            <div className={styles.chat_input_box}>
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
