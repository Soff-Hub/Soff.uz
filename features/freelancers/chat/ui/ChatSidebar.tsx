import React, {
    useState,
    useCallback,
    useMemo,
    useRef,
    useEffect,
} from 'react';
import { Button, Empty, Input, Spin } from 'antd';
import { truncateTitle } from '~/shared/utilities/TruncateTitle';
import { useRouter } from 'next/router';
import useChats from '../model/useChats';
import useDebounce from '~/shared/hooks/useDebounce';
import { useTimeManager } from '~/shared/hooks/useTimeManager';
import { useCreateChat } from '../api/useCreateChat';
import { MODERATOR_ID } from '~/shared/constants';
import { FaHeadset } from 'react-icons/fa';
import { FaThumbtack } from 'react-icons/fa';
import { FaCrown } from 'react-icons/fa';
import { useViewportContext } from '~/shared/hooks/useViewportContext';
import styles from '../style/chat.module.scss';
import { useTranslation } from 'next-i18next';

function BackButton() {
    const router = useRouter();
    const backRef = useRef<HTMLDivElement>(null);
    const { startTimeout } = useTimeManager();

    const handleBack = () => {
        router.back();
        if (backRef.current) {
            backRef.current.scrollIntoView({ behavior: 'smooth' });
        }
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

type ChatSidebarProps = {
    setChat: (chat: any) => void;
};

const ChatSidebar: React.FC<ChatSidebarProps> = ({ setChat }) => {
    const { t } = useTranslation('chat');
    const { containerHeight } = useViewportContext();
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 300);
    const { mutateAsync: createChat, isPending: isCreatingChat } =
        useCreateChat();
    const loadMoreRef = useRef(null);

    const { chats, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
        useChats(debouncedSearch);

    const getOpponentId = useCallback((chat: any) => {
        if (!chat) return null;
        return +chat?.opponent_id;
    }, []);

    const staticModeratorChat = useMemo(() => {
        const existingModeratorChat = chats?.find(
            (chat) => getOpponentId(chat) === MODERATOR_ID
        );

        if (existingModeratorChat)
            return {
                opponent_name: t('sidebar.technicalSupport'),
                ...(existingModeratorChat as any),
                isModerator: true,
            };

        return {
            chat_id: 0,
            opponent_id: MODERATOR_ID,
            opponent_name: t('sidebar.technicalSupport'),
            opponent_photo_url: null,
            last_message: {
                content: t('window.greeting'),
                created_at: new Date().toISOString(),
            },
            unread_count: 0,
            isModerator: true,
        };
    }, [chats, getOpponentId]);

    const orderedChats = useMemo(() => {
        const dynamicChats =
            chats?.filter((chat) => getOpponentId(chat) !== MODERATOR_ID) ?? [];

        return [staticModeratorChat, ...dynamicChats];
    }, [chats, staticModeratorChat, getOpponentId]);

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
        observer.observe(loadMoreRef.current!);
        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage, isValidChats]);

    const handleStaticChatClick = async () => {
        // If moderator chat already exists (or we have enriched data), just open it
        if (staticModeratorChat.chat_id) {
            setChat(staticModeratorChat);
            return;
        }

        try {
            const data = await createChat(MODERATOR_ID);
            setChat({ chat_id: data.chat_id, opponent_id: MODERATOR_ID });
        } catch (error) {
            console.error('⚠️ Xatolik yuz berdi:', error);
        }
    };

    const handleChat = (chat: any) => {
        const isModerator = chat?.opponent_id === MODERATOR_ID;
        if (isModerator) {
            handleStaticChatClick();
            return;
        }
        setChat(chat);
    };

    let sidebarContent;
    if (isLoading && !isValidChats) {
        sidebarContent = (
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <Spin size="large" tip={t('sidebar.loading')} />
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
                        <Spin tip={t('sidebar.loadingMore')} />
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
                <Empty description={t('sidebar.empty')} />
            </div>
        );
    }

    return (
        <div
            className={styles.chat_sidebar}
            style={{
                height: containerHeight ? `${containerHeight}px` : '100vh',
            }}>
            <div className={styles.chat_search}>
                <BackButton />
                <Input.Search
                    placeholder={t('sidebar.searchPlaceholder')}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    allowClear
                />
            </div>
            <div className={styles.sidebar_chats}>{sidebarContent}</div>
        </div>
    );
};

type ChatListItemProps = {
    chat: any;
    handleChat: (chat: any) => void;
    isCreatingChat: boolean;
};

const ChatListItem: React.FC<ChatListItemProps> = ({
    chat,
    handleChat,
    isCreatingChat,
}) => {
    const { t } = useTranslation('chat');
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
                        <span className={styles.moderatorBadge}>
                            {t('sidebar.support')}
                        </span>
                    </div>
                    <p className={styles.moderatorSubtext}>
                        {truncateTitle(
                            chat?.last_message?.content ||
                                t('sidebar.supportService'),
                            40
                        )}
                    </p>
                </div>
                <div className={styles.box2}>
                    <p></p>
                    {chat?.unread_count > 0 && (
                        <span>{chat?.unread_count}</span>
                    )}
                </div>
                {isCreatingChat && <Spin size="small" />}
                <FaThumbtack
                    className={styles.pinnedIcon}
                    title={t('sidebar.pinned')}
                />
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
                                <span>{t('sidebar.offers')}</span>
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
                <FaThumbtack
                    className={styles.pinnedIcon}
                    title={t('sidebar.pinned')}
                />
            )}
        </div>
    );
};

export default ChatSidebar;
