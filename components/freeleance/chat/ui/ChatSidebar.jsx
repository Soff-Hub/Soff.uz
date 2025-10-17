import React, { useState, useCallback, useRef } from 'react';
import styles from '../style/chat.module.scss';
import { Button, Empty, Input, Spin } from 'antd';
import { truncateTitle } from '~/shared/utilities/TruncateTitle';
import { useRouter } from 'next/router';
import useChats from '../api/useChats';
import useDebounce from '~/shared/hooks/useDebounce';

function BackButton() {
    const router = useRouter();
    const backRef = useRef(null);

    const handleBack = () => {
        router.back();
        backRef.current?.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'auto' }), 10);
    };

    return (
        <>
            <div ref={backRef}></div>
            <Button
                onClick={handleBack}
                icon={<i className="fa-solid fa-arrow-left"></i>}
            />
        </>
    );
}

const ChatSidebar = ({ setChatId, chatId }) => {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 300);
    const router = useRouter();

    const handleChatId = useCallback(
        (id) => {
            setChatId(id);
            router.replace({
                pathname: router.pathname,
                query: { chatId: id },
            });
        },
        [router, setChatId]
    );

    const { chats, isLoading } = useChats(debouncedSearch);

    return (
        <div className={styles.chat_sidebar}>
            <div className={styles.chat_search}>
                <BackButton />
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
                        <Spin size="large" tip="Qidirilmoqda..." />
                    </div>
                )}
                {!isLoading && chats?.length === 0 && (
                    <Empty
                        description="Chat topilmadi"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                )}
                {!isLoading &&
                    chats?.map((chat) => (
                        <div
                            key={chat.chat_id}
                            onClick={() => handleChatId(chat?.chat_id)}
                            className={styles.sidebar_chat}>
                            <img
                                src={
                                    chat?.opponent_photo_url ||
                                    '/static/img/ozodbek.png'
                                }
                                alt="user img"
                            />
                            <div className={styles.sidebar_chat_wrapper}>
                                <div className={styles.box1}>
                                    <h4>{chat?.opponent_name}</h4>
                                    <span>
                                        {truncateTitle(
                                            chat?.last_message?.content,
                                            15
                                        )}
                                    </span>
                                </div>
                                <div className={styles.box2}>
                                    <p></p>
                                    {chat?.unread_count > 0 && (
                                        <span>{chat?.unread_count}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ChatSidebar;
