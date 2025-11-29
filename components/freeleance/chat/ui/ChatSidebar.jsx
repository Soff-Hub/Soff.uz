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
            <div ref={backRef}></div>
            <Button
                onClick={handleBack}
                icon={<i className="fa-solid fa-arrow-left"></i>}
            />
        </>
    );
}

const STATIC_OPPONENT_ID = 30;

const DEFAULT_STATIC_CHAT_COPY = {
    opponent_name: 'Zufarbek Abdurakhmonov',
    opponent_photo_url: '/static/img/ozodbek.png',
    last_message: { content: '' },
};

const ChatSidebar = ({ setChatId }) => {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 300);
    const router = useRouter();
    const { mutate: createChat, isPending: isCreatingChat } = useCreateChat();
    const [persistedStaticChat, setPersistedStaticChat] = useState(null);

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

    const getOpponentId = useCallback((chat) => {
        if (!chat) return null;
        return (
            chat?.opponent?.id ??
            chat?.opponent_id ??
            chat?.opponentId ??
            chat?.opponent?.soff_seller_id ??
            null
        );
    }, []);

    const existingStaticChat = useMemo(
        () => chats?.find((chat) => getOpponentId(chat) === STATIC_OPPONENT_ID),
        [chats, getOpponentId]
    );

    useEffect(() => {
        if (existingStaticChat?.chat_id) {
            setPersistedStaticChat(existingStaticChat);
        }
    }, [existingStaticChat]);

    const resolvedStaticChat = persistedStaticChat ?? existingStaticChat;

    const staticChat = useMemo(() => {
        if (resolvedStaticChat) {
            return {
                ...resolvedStaticChat,
                chat_id:
                    resolvedStaticChat.chat_id ??
                    `static-${STATIC_OPPONENT_ID}`,
                __isStatic: true,
            };
        }

        return {
            chat_id: `static-${STATIC_OPPONENT_ID}`,
            unread_count: 0,
            ...DEFAULT_STATIC_CHAT_COPY,
            last_message: {
                content: DEFAULT_STATIC_CHAT_COPY.last_message.content,
            },
            __isStatic: true,
        };
    }, [resolvedStaticChat]);

    const orderedChats = useMemo(() => {
        const dynamicChats =
            chats?.filter(
                (chat) => getOpponentId(chat) !== STATIC_OPPONENT_ID
            ) ?? [];

        return [staticChat, ...dynamicChats];
    }, [chats, staticChat, getOpponentId]);

    const handleStaticChatClick = useCallback(() => {
        const activeStaticChatId =
            resolvedStaticChat?.chat_id ?? existingStaticChat?.chat_id;

        if (activeStaticChatId) {
            handleChatId(activeStaticChatId);
            return;
        }
        createChat(STATIC_OPPONENT_ID);
    }, [createChat, existingStaticChat, handleChatId, resolvedStaticChat]);

    const hasDynamicChats = useMemo(
        () => orderedChats?.some((chat) => !chat?.__isStatic),
        [orderedChats]
    );

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
                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <Spin size="large" tip="Qidirilmoqda..." />
                    </div>
                ) : null}
                {!isLoading && !hasDynamicChats && (
                    <Empty
                        description="Chat topilmadi"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                )}
                {!isLoading &&
                    orderedChats?.map((chat, index) => {
                        const isStatic = chat?.__isStatic;
                        const key =
                            chat?.chat_id ??
                            (isStatic
                                ? `static-${STATIC_OPPONENT_ID}`
                                : `chat-${index}`);

                        return (
                            <div
                                key={key}
                                onClick={() =>
                                    isStatic
                                        ? handleStaticChatClick()
                                        : handleChatId(chat?.chat_id)
                                }
                                className={`${styles.sidebar_chat} `}
                                aria-disabled={isStatic && isCreatingChat}>
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
                                        <p>
                                            {isStatic && isCreatingChat && (
                                                <Spin size="small" />
                                            )}
                                        </p>
                                        {!isStatic &&
                                            chat?.unread_count > 0 && (
                                                <span>
                                                    {chat?.unread_count}
                                                </span>
                                            )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default memo(ChatSidebar);
