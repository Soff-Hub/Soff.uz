import React, { useRef, useEffect } from 'react';
import { useConversation } from './Conversation';
import styles from '../../style/chat.module.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ClipLoader } from 'react-spinners';
import { Spin } from 'antd';
import ChatDateSeperator from './ChatDateSeperator';
import ChatMessage from './ChatMessage';
import { useAppSelector } from '~/app/store/hooks';
import {
    DirectorEmptyState,
    EmptyMessages,
    ModeratorEmptyState,
} from './ChatEmptyMessages';

type ChatMessagesProps = {};

function ChatMessages({}: ChatMessagesProps) {
    const { user } = useAppSelector((state) => state.profile) as any;
    const {
        chat,
        messagesContainerRef,
        messages,
        handleFetchNext,
        hasNextPage,
        isFetching,
        isDirector,
        isModerator,
        handlScroll,
        setEdit,
        setRes,
        deleteMessage,
        setFeedbackOpen,
        handleOpenDrawer,
    } = useConversation();

    const recipient = chat?.opponent;
    const prevMessagesLengthRef = useRef(0);
    const lastMessageRef = useRef<any>(null);

    // ✅ Auto-scroll when new messages arrive
    useEffect(() => {
        const currentMessagesLength = messages.reduce(
            (total, group) => total + group.messages.length,
            0
        );

        // Get the last message
        const lastGroup = messages[messages.length - 1];
        const lastMsg = lastGroup?.messages[lastGroup.messages.length - 1];

        // Check if a new message was added (not from initial load)
        if (
            currentMessagesLength > prevMessagesLengthRef.current &&
            lastMsg &&
            lastMsg.id !== lastMessageRef.current?.id
        ) {
            // Only scroll if it's an opponent message or if user is near bottom
            const isOpponentMessage = !lastMsg.is_mine;
            const container = messagesContainerRef.current;

            if (container) {
                // Check if user is near bottom (within 100px)
                const isNearBottom = container.scrollTop < 100;

                if (isOpponentMessage || isNearBottom) {
                    setTimeout(() => {
                        if (messagesContainerRef.current) {
                            messagesContainerRef.current.scrollTop = 0;
                        }
                    }, 100);
                }
            }

            lastMessageRef.current = lastMsg;
        }

        prevMessagesLengthRef.current = currentMessagesLength;
    }, [messages, messagesContainerRef]);

    return (
        <div
            onScroll={handlScroll}
            ref={messagesContainerRef}
            id="scrollableDiv"
            style={{
                width: '100%',
                height: `100%`,
                overflowY: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                margin: 'auto',
                overflowX: 'hidden',
                position: 'relative',
            }}
            className={`${styles.chat_messages} p-3`}>
            <InfiniteScroll
                dataLength={
                    // ✅ Calculate total messages across all groups
                    messages.reduce(
                        (total, group) => total + group.messages.length,
                        0
                    )
                }
                next={handleFetchNext}
                hasMore={Boolean(hasNextPage)}
                loader={<InfiniteLoaderComponent />}
                style={{
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    overflow: 'visible',
                    position: 'relative',
                }}
                scrollableTarget="scrollableDiv"
                inverse={true}>
                <div>
                    {isFetching ? (
                        <div
                            style={{
                                height: '30vh',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Spin />
                        </div>
                    ) : messages?.length ? (
                        // ✅ Render grouped messages: each group has dateFormatted and messages array
                        messages.map((group, groupIndex) => (
                            <div
                                key={group.date}
                                style={{
                                    position: 'relative',
                                    width: '100%',
                                    isolation: 'isolate', // Create new stacking context for each group
                                }}>
                                <ChatDateSeperator
                                    chatDate={{ date: group.dateFormatted }}
                                    isFirst={groupIndex === 0}
                                />
                                {group.messages.map((msg) => (
                                    <ChatMessage
                                        key={msg.id}
                                        recipientImg={recipient?.photo_url}
                                        myImg={user?.image}
                                        msg={msg}
                                        onEdit={setEdit}
                                        onDelete={deleteMessage}
                                        handleOpenDrawer={handleOpenDrawer}
                                        setRes={setRes}
                                        setFeedbackOpen={setFeedbackOpen}
                                    />
                                ))}
                            </div>
                        ))
                    ) : isDirector ? (
                        <DirectorEmptyState
                            name={
                                chat?.opponent?.name || 'Zufarbek Abdurakhmonov'
                            }
                            photoUrl={
                                chat?.opponent?.photo_url ||
                                '/static/img/zufarbek.webp'
                            }
                        />
                    ) : isModerator ? (
                        <ModeratorEmptyState />
                    ) : (
                        <EmptyMessages />
                    )}
                </div>
            </InfiniteScroll>
        </div>
    );
}

const InfiniteLoaderComponent = () => (
    <div className="d-flex justify-content-center align-items-center py-2">
        <ClipLoader color="#00A44F" size={20} />
    </div>
);

export default ChatMessages;
