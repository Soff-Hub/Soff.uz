import React from 'react';
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
                dataLength={messages.length}
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
                        messages.map((msg) =>
                            msg.type === 'date-separator' ? (
                                <ChatDateSeperator
                                    chatDate={msg}
                                    key={msg.id}
                                />
                            ) : (
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
                            )
                        )
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
