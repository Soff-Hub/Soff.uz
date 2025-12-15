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

const DEFAULT_STATIC_CHAT_COPY = {
    opponent_name: 'Moderator',
    opponent_photo_url: '',
    last_message: { content: '24/7 Yordam xizmati' },
};

const ChatSidebar = ({ setChat, containerHeight, chatId: selectedChatId }) => {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 300);
    const { mutateAsync: createChat, isPending: isCreatingChat } =
        useCreateChat();

    const { chats, isLoading } = useChats(debouncedSearch);

    const getOpponentId = useCallback((chat) => {
        if (!chat) return null;
        return +chat?.opponent_id;
    }, []);

    const staticChat = useMemo(() => {
        const existingStaticChat = chats?.find(
            (chat) => getOpponentId(chat) == MODERATOR_ID
        );
        if (existingStaticChat)
            return { ...existingStaticChat, __isStatic: true };

        return {
            __isStatic: true,
        };
    }, [chats, getOpponentId]);

    const orderedChats = useMemo(() => {
        const dynamicChats =
            chats?.filter((chat) => getOpponentId(chat) !== MODERATOR_ID) ?? [];

        return [staticChat, ...dynamicChats];
    }, [chats, staticChat, getOpponentId]);

    const handleStaticChatClick = async () => {
        if (staticChat.chat_id) {
            setChat(staticChat);
            return;
        }

        try {
            const data = await createChat(MODERATOR_ID);
            setChat({ chat_id: data.chat_id, opponent_id: MODERATOR_ID });
        } catch (error) {
            console.error('⚠️ Xatolik yuz berdi:', error);
        }
    };

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
            <div className={styles.sidebar_chats}>
                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <Spin size="large" tip="Qidirilmoqda..." />
                    </div>
                ) : null}
                {!isLoading &&
                    orderedChats?.map((chat) => {
                        const isStatic = chat?.__isStatic;
                        const isSelected = selectedChatId == chat?.chat_id;
                        if (isStatic) {
                            return (
                                <div
                                    key={'static-' + MODERATOR_ID}
                                    onClick={handleStaticChatClick}
                                    className={`${styles.sidebar_chat} ${
                                        styles.moderatorCard
                                    } ${
                                        isSelected
                                            ? styles.selectedModerator
                                            : ''
                                    }`}
                                    aria-disabled={isCreatingChat}>
                                    <div className={styles.moderatorAvatar}>
                                        <FaHeadset />
                                    </div>
                                    <div className={styles.moderatorInfo}>
                                        <div
                                            className={
                                                styles.moderatorHeaderRow
                                            }>
                                            <h4>Support</h4>
                                            <span
                                                className={
                                                    styles.moderatorBadge
                                                }>
                                                Aloqa
                                            </span>
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
                                onClick={() => setChat(chat)}
                                className={`${styles.sidebar_chat} ${
                                    isSelected ? styles.selectedChat : ''
                                }`}
                                aria-disabled={false}>
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
                        );
                    })}
            </div>
        </div>
    );
};

export default memo(ChatSidebar);
