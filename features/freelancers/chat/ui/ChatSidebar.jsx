import React, {
    useState,
    useCallback,
    useMemo,
    useRef,
    memo,
    useEffect,
} from 'react';
import styles from '../style/chat.module.scss';
import { Button, Empty, Input, Spin } from 'antd';
import { truncateTitle } from '~/shared/utilities/TruncateTitle';
import { useRouter } from 'next/router';
import useChats from '../api/useChats';
import useDebounce from '~/shared/hooks/useDebounce';
import { useTimeManager } from '~/shared/hooks/useTimeManager';
import useCreateChat from '../api/useCreateChat';
import { MODERATOR_ID } from '~/shared/constants';
import { FaHeadset } from 'react-icons/fa';
import { FaThumbtack } from 'react-icons/fa';
import { FaCrown } from 'react-icons/fa';

const STATIC_OPPONENT_ID = 30;

function BackButton() {
    const router = useRouter();
    const backRef = useRef(null);
    const { startTimeout } = useTimeManager();

    const handleBack = () => {
        router.back();
        backRef.current?.scrollIntoView({ behavior: 'smooth' });
        startTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'auto' });
        }, 10);
    };

    return (
        <>
            <div ref={backRef}>
                <Button
                    onClick={handleBack}
                    icon={<i className="fa-solid fa-arrow-left"></i>}
                />
            </div>
        </>
    );
}

const ChatSidebar = ({ setChat, containerHeight }) => {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 300);
    const { mutateAsync: createChat, isPending: isCreatingChat } =
        useCreateChat();
    const loadMoreRef = useRef(null);

    const { chats, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
        useChats(debouncedSearch);

    const getOpponentId = useCallback((chat) => {
        if (!chat) return null;
        return +chat?.opponent_id;
    }, []);

    const staticDirectorChat = useMemo(() => {
        const existingStaticChat = chats?.find(
            (chat) => getOpponentId(chat) === STATIC_OPPONENT_ID
        );
        if (existingStaticChat)
            return {
                ...existingStaticChat,
                opponent_name: 'Zufarbek Abdurakhmonov',
                opponent_photo_url: '/static/img/zufarbek.webp',
                isDirector: true,
            };
        // Otherwise, create placeholder static chat
        return {
            chat_id: 0,
            opponent_id: STATIC_OPPONENT_ID,
            opponent_name: 'Zufarbek Abdurakhmonov',
            opponent_photo_url: '/static/img/zufarbek.webp',
            last_message: {
                content: 'Assalomu alaykum',
                created_at: new Date().toISOString(),
            },
            unread_count: 1,
            isDirector: true,
        };
    }, [chats, getOpponentId]);

    const orderedChats = useMemo(() => {
        const dynamicChats =
            chats?.filter(
                (chat) => getOpponentId(chat) !== STATIC_OPPONENT_ID
            ) ?? [];

        return [staticDirectorChat, ...dynamicChats];
    }, [chats, staticDirectorChat, getOpponentId]);

    const isValidChats = Array.isArray(orderedChats) && orderedChats.length > 0;

    useEffect(() => {
        if (!loadMoreRef.current && !isValidChats) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting &&
                    hasNextPage &&
                    !isFetchingNextPage
                ) {
                    fetchNextPage();
                }
            },
            { threshold: 1 }
        );
        observer.observe(loadMoreRef.current);
        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage, isValidChats]);

    const handleStaticChatClick = async (id) => {
        // Check if it's director chat
        if (id === STATIC_OPPONENT_ID) {
            if (staticDirectorChat.chat_id) {
                setChat(staticDirectorChat);
                return;
            }
        }

        // Check if it's moderator chat
        if (id === MODERATOR_ID) {
            const moderatorChat = chats?.find(
                (chat) => getOpponentId(chat) === MODERATOR_ID
            );
            if (moderatorChat) {
                setChat({
                    ...moderatorChat,
                    isModerator: true,
                });
                return;
            }
        }

        // If chat doesn't exist, create it
        try {
            const data = await createChat(id);
            setChat({ chat_id: data.chat_id, opponent_id: id });
        } catch (error) {
            console.error('⚠️ Xatolik yuz berdi:', error);
        }
    };

    const handleChat = (chat) => {
        console.log({ chat });
        const isModerator = chat?.opponent_id === MODERATOR_ID;
        const isDirector = chat?.isDirector;
        if (isDirector) {
            handleStaticChatClick(STATIC_OPPONENT_ID);
            return;
        }
        if (isModerator) {
            handleStaticChatClick(MODERATOR_ID);
            return;
        }
        setChat(chat);
        console.log('Chat tanlandi:', chat);
    };

    let sidebarContent;
    if (isLoading && !isValidChats) {
        sidebarContent = (
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <Spin size="large" tip="Qidirilmoqda..." />
            </div>
        );
    } else if (isValidChats) {
        sidebarContent = (
            <>
                {orderedChats.map((chat) => (
                    <ChatListItem
                        key={chat.chat_id || chat.opponent_id}
                        isCreatingChat={isCreatingChat}
                        chat={chat}
                        handleChat={handleChat}
                    />
                ))}
                <div ref={loadMoreRef} style={{ height: 1 }} />
                {hasNextPage && (
                    <div
                        style={{
                            textAlign: 'center',
                            padding: '10px',
                        }}>
                        <Spin tip="Yuklanmoqda..." />
                    </div>
                )}
            </>
        );
    } else {
        sidebarContent = (
            <div
                style={{
                    textAlign: 'center',
                    padding: '20px',
                }}>
                <Empty description="Chatlar topilmadi" />
            </div>
        );
    }

    return (
        <div
            className={styles.chat_sidebar}
            style={{ height: containerHeight }}>
            <div className={styles.chat_search}>
                <BackButton />
                <Input.Search
                    placeholder="Chatlarni qidirish"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    allowClear
                />
            </div>
            <div className={styles.sidebar_chats}>{sidebarContent}</div>
        </div>
    );
};

const ChatListItem = ({ chat, handleChat, isCreatingChat }) => {
    const router = useRouter();
    const isModerator = chat?.opponent_id === MODERATOR_ID;
    const isDirector = chat?.isDirector;
    const isSelected = router.query?.opponent_id == chat?.opponent_id;

    if (isModerator) {
        return (
            <div
                key={'static-' + MODERATOR_ID}
                onClick={() => handleChat(chat)}
                className={`${styles.sidebar_chat} ${styles.moderatorCard} ${
                    isSelected ? styles.selectedModerator : ''
                }`}
                aria-disabled={isCreatingChat}>
                <div className={styles.moderatorAvatar}>
                    <FaHeadset />
                </div>
                <div className={styles.moderatorInfo}>
                    <div className={styles.moderatorHeaderRow}>
                        <h4>{chat?.opponent_name}</h4>
                        <span className={styles.moderatorBadge}>Support</span>
                    </div>
                    <p className={styles.moderatorSubtext}>
                        {truncateTitle(
                            chat?.last_message?.content ||
                                'Texnik yordam xizmati',
                            40
                        )}
                    </p>
                </div>
                {isCreatingChat && <Spin size="small" />}
            </div>
        );
    }

    return (
        <div
            key={chat?.chat_id}
            onClick={() => handleChat(chat)}
            className={`${styles.sidebar_chat} ${
                isDirector ? styles.directorChatCard : ''
            } ${isSelected ? styles.selectedChat : ''}`}
            aria-disabled={false}>
            <img
                src={chat?.opponent_photo_url || '/static/img/ozodbek.png'}
                alt="user img"
            />
            <div className={styles.sidebar_chat_wrapper}>
                <div className={styles.box1}>
                    <div className={styles.chatOpponentHeader}>
                        <h4 className={styles.chatOpponentName}>
                            {chat?.opponent_name}
                        </h4>
                        {isDirector && (
                            <div className={styles.directorBadge}>
                                <FaCrown className={styles.directorIcon} />
                                <span>Takliflar</span>
                            </div>
                        )}
                    </div>
                    <span>
                        {truncateTitle(chat?.last_message?.content, 15)}
                    </span>
                </div>
                <div className={styles.box2}>
                    <p></p>
                    {chat?.unread_count > 0 && (
                        <span>{chat?.unread_count}</span>
                    )}
                </div>
            </div>
            {isDirector && (
                <FaThumbtack className={styles.pinnedIcon} title="Topilgan" />
            )}
        </div>
    );
};

export default memo(ChatSidebar);
