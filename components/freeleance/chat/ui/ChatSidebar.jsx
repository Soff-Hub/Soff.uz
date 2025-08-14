import React, { useState, useEffect } from 'react';
import styles from '../style/chat.module.scss';
import { Button, Empty, Input } from 'antd';
import useGetChats from '../api/useGetChats';
import { truncateTitle } from '~/utilities/TruncateTitle';
import { useRouter } from 'next/router';

const ChatSidebar = ({ setChatId }) => {
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const { back } = useRouter()

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);
        return () => clearTimeout(handler);
    }, [search]);

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
                {isLoading && <p>Qidirilmoqda...</p>}
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
