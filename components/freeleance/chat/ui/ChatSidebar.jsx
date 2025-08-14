import React, { useState, useEffect, useRef } from 'react';
import styles from '../style/chat.module.scss';
import { Button, Empty, Input, Spin } from 'antd';
import useGetChats from '../api/useGetChats';
import { truncateTitle } from '~/utilities/TruncateTitle';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';

const ChatSidebar = ({ setChatId }) => {
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const { back } = useRouter()
    const { user } = useSelector(state => state.auth)
    const queryClient = useQueryClient()
    const wsRef = useRef(null);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);
        return () => clearTimeout(handler);
    }, [search]);

    useEffect(() => {
        if (!user?.access) return;

        const ws = new WebSocket(
            `${process.env.NEXT_PUBLIC_WS_FREELEANCE_URL}?token=${user?.access}`
        );
        wsRef.current = ws;

        ws.onopen = () => {
            console.log("✅chatlar WebSocket ulandi");
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("📩 chatlar Yangi xabar:", data);
            queryClient.invalidateQueries(['chats']);
        };

        ws.onerror = (err) => {
            console.error("❌ chatlar WebSocket xatosi:", err);
        };

        ws.onclose = () => {
            console.log("🔌 chatlar WebSocket yopildi");
        };

        return () => {
            ws.close();
        };
    }, [user?.access]);

    const { data: chats, isLoading } = useGetChats(debouncedSearch);

    return (
        <div className={styles.chat_sidebar}>
            <div className={styles.chat_search}>
                <Button
                    onClick={() => back()}
                    icon={<i className="fa-solid fa-arrow-left"></i>}
                >

                </Button>
                <Input.Search
                    placeholder="Chatlarni qidirish"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    allowClear
                />
            </div>
            <div className={styles.sidebar_chats}>
                {isLoading && (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <Spin size='large' tip="Qidirilmoqda..." />
                    </div>
                )}
                {!isLoading && chats?.length === 0 && (
                    <Empty
                        description="Chat topilmadi"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                )}
                {chats?.map(chat => (
                    <div
                        key={chat.chat_id}
                        onClick={() => setChatId(chat?.chat_id)}
                        className={styles.sidebar_chat}
                    >
                        <img src="/static/img/ozodbek.png" alt="user img" />
                        <div className={styles.sidebar_chat_wrapper}>
                            <div className={styles.box1}>
                                <h4>{chat?.opponent_name}</h4>
                                <span>{truncateTitle(chat?.last_message?.content, 15)}</span>
                            </div>
                            <div className={styles.box2}>
                                <p></p>
                                {chat?.unread_count > 0 &&
                                    <span>{chat?.unread_count}</span>
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatSidebar;
