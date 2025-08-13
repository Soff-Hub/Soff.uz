import React, { useState, useEffect } from 'react';
import styles from '../style/chat.module.scss';
import { Input } from 'antd';
import useGetChats from '../api/useGetChats';
import { truncateTitle } from '~/utilities/TruncateTitle';

const ChatSidebar = ({ setChatId }) => {
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // Debounce — har 300ms dan keyin qidiruv so‘rovi o‘zgaradi
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
                <Input.Search
                    placeholder="Chatlarni qidirish"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    allowClear
                />
            </div>
            <div className={styles.sidebar_chats}>
                {isLoading && <p>Qidirilmoqda...</p>}
                {!isLoading && chats?.length === 0 && <p>Chat topilmadi</p>}
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
                                {/* <span></span> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatSidebar;
