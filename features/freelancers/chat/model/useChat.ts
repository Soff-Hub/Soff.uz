import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useGetChatById } from '../api/useGetChatById';
import { useDeleteMessage } from '../api/useDeleteMessage';
import useSendMessage from '../api/useSendMessage';
import { useTimeManager } from '~/shared/hooks/useTimeManager';
import { message } from 'antd';
import { WS_READY_STATE } from '../constants/socket-state';
import { useChatSocket } from '../api/useChatSocket';
import { useMessageState, groupMessages } from './useMessageState';
import { usePendingMessages } from './usePendingMessages';
import { useAppSelector } from '~/app/store/hooks';

export const useChat = (chatId?: string) => {
    const { startTimeout, stopTimeout, startInterval, stopInterval } =
        useTimeManager();
    const { mutateAsync: deleteMsg } = useDeleteMessage();
    const { mutateAsync: sendFile, isPending: isMessageWithFilePending } =
        useSendMessage();
    const { user } = useAppSelector((state) => state.auth);
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isInitialLoading,
        refetch: refetchMessages,
    } = useGetChatById(chatId);
    const {
        sendWsMessage,
        lastMessage,
        readyState,
        getWebSocket,
        isConnected,
        forceReconnect,
    } = useChatSocket({ chatId, user });
    const messageState = useMessageState({});
    const pending = usePendingMessages();
    const lastMessageTimeRef = useRef(Date.now());
    const forceReconnectRef = useRef<Function | null>(null);
    const hasCheckedPendingOnConnectRef = useRef(false);

    const chat = useMemo(() => data?.pages[0]?.chat, [data]);
    const allApiMessages = useMemo(() => {
        if (!data) return [];
        return data.pages.flatMap((p) => p.messages || []);
    }, [data]);

    const checkPendingMessages = useCallback(async () => {
        if (!chatId || !allApiMessages.length) return;

        messageState.flatMessages.forEach((msg) => {
            if (msg.status === 'sending' && pending.isTempId(msg.id)) {
                const matchingMessage = pending.matchPendingMessage(
                    msg,
                    allApiMessages,
                    user?.id
                );

                if (matchingMessage) {
                    pending.cleanupPendingRefs(msg.content, msg.id);
                    messageState.removeMessage(msg);
                    const { status, ...cleanMsg } = matchingMessage;
                    messageState.addMessage(cleanMsg);
                }
            }
        });
    }, [chatId, allApiMessages, user?.id]);

    useEffect(() => {
        if (lastMessage?.data) {
            lastMessageTimeRef.current = Date.now();
        }
    }, [lastMessage]);

    // ✅ Process messages from WebSocket
    useEffect(() => {
        if (!lastMessage?.data) return;

        let msg;
        try {
            msg = JSON.parse(lastMessage.data);
        } catch (e) {
            console.warn('⚠️ Invalid JSON data:', lastMessage.data);
            return;
        }

        if (msg.error) {
            message.error(msg.error);
            const currentFlat = messageState.flatMessages;
            if (!msg.content) {
                const lastMessage = currentFlat[currentFlat.length - 1];
                pending.cleanupPendingRefs(lastMessage.content, lastMessage.id);
                messageState.removeMessage(lastMessage);
                return;
            }
            currentFlat.forEach((m) => {
                if (
                    m.status === 'sending' &&
                    m.content?.trim() === msg.content?.trim()
                ) {
                    pending.cleanupPendingRefs(m.content, m.id);
                    messageState.removeMessage(m);
                }
            });
            return;
        }

        switch (msg.event) {
            case 'message': {
                // If it's my message, try to replace temp message
                if (msg.is_mine) {
                    const contentTrimmed = msg.content?.trim();

                    // Remove all pending messages with matching content or file
                    const currentFlat = messageState.flatMessages;
                    currentFlat.forEach((m) => {
                        if (
                            m.status === 'sending' &&
                            m.sender_id === user.id &&
                            pending.isTempId(m.id)
                        ) {
                            let shouldRemove = false;

                            // Match by content if both have content
                            if (
                                contentTrimmed &&
                                m.content?.trim() === contentTrimmed
                            ) {
                                shouldRemove = true;
                            }
                            // Match by file if both have files
                            else if (msg.file && m.file) {
                                const filenameMatch =
                                    msg.file.filename === m.file.filename;
                                const sizeMatch =
                                    msg.file.size &&
                                    m.file.size &&
                                    Math.abs(msg.file.size - m.file.size) < 100; // Allow small size differences
                                if (filenameMatch || sizeMatch) {
                                    shouldRemove = true;
                                }
                            }
                            // If incoming message has file and temp message has file but no content match
                            else if (
                                msg.file &&
                                m.file &&
                                !contentTrimmed &&
                                !m.content?.trim()
                            ) {
                                // Both are file-only messages, match by time proximity (within 10 seconds)
                                const msgTime = new Date(
                                    msg.created_at || 0
                                ).getTime();
                                const tempTime = new Date(
                                    m.created_at || 0
                                ).getTime();
                                const timeDiff = Math.abs(msgTime - tempTime);
                                if (timeDiff < 10000) {
                                    // 10 seconds
                                    shouldRemove = true;
                                }
                            }

                            if (shouldRemove) {
                                pending.cleanupPendingRefs(
                                    m.content || '',
                                    m.id
                                );
                                messageState.removeMessage(m);
                            }
                        }
                    });

                    // Check if already exists
                    const exists = messageState.flatMessages.some(
                        (m) => m.id === msg.id && !pending.isTempId(m.id)
                    );
                    if (!exists) {
                        const { status, ...cleanMsg } = msg;
                        messageState.addMessage(cleanMsg);
                    }
                } else {
                    // Not my message - just add it (check for duplicates first)
                    const exists = messageState.flatMessages.some(
                        (m) => m.id === msg.id && !pending.isTempId(m.id)
                    );
                    if (!exists) {
                        messageState.addMessage(msg);
                    }
                }
                break;
            }
            case 'message_update': {
                const currentFlat = messageState.flatMessages;
                const existing = currentFlat.find((m) => m.id === msg.id);
                if (existing) {
                    const { status, ...cleanMsg } = msg;
                    messageState.updateMessage({
                        ...existing,
                        ...cleanMsg,
                    });
                }
                break;
            }
            case 'delete_message':
                messageState.removeMessage({ id: msg.id });
                break;
            default:
                console.warn('Unknown event:', msg);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastMessage, user?.id]);

    // ✅ Process chat data and merge with pending messages
    useEffect(() => {
        if (chatId && allApiMessages) {
            const messagesToPreserve = messageState.flatMessages.filter((m) => {
                if (m.status === 'sending' || m.status === 'updating') {
                    if (pending.isTempId(m.id)) {
                        const matching = pending.matchPendingMessage(
                            m,
                            allApiMessages,
                            user?.id
                        );
                        if (matching) {
                            pending.cleanupPendingRefs(m.content, m.id);
                            return false;
                        }
                        return true;
                    }

                    if (m.status === 'updating') {
                        const serverMsg = allApiMessages.find(
                            (api) => api.id === m.id
                        );
                        if (
                            serverMsg &&
                            serverMsg.content?.trim() === m.content?.trim()
                        ) {
                            return false;
                        }
                        return true;
                    }
                }

                const inServer = allApiMessages.some((api) => api.id === m.id);
                return !inServer;
            });

            const merged = [...allApiMessages, ...messagesToPreserve];

            messageState.setMessages(groupMessages(merged));
        }
    }, [chatId, allApiMessages, user?.id]);

    // ✅ Check pending messages when data updates
    useEffect(() => {
        if (data) {
            const checkTimeout = startTimeout(() => {
                checkPendingMessages();
            }, 100);
            return () => stopTimeout(checkTimeout);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, checkPendingMessages, startTimeout, stopTimeout]);

    // ✅ Send unread messages to server
    const sendUnreadMessages = useCallback(
        (msgs: any[]) => {
            const ws = getWebSocket();
            if (!ws || ws.readyState !== WS_READY_STATE.OPEN) {
                return;
            }

            // Use provided msgs or get current flat messages
            const messagesToCheck = msgs || messageState.flatMessages;
            const unreadIds = messagesToCheck
                ?.filter((m) => !m.is_read && !pending.isTempId(m.id))
                .map((m) => m.id);
            if (unreadIds?.length > 0) {
                sendWsMessage(
                    JSON.stringify({
                        event: 'message_read',
                        message_ids: unreadIds,
                    })
                );
            }
        },
        [getWebSocket, sendWsMessage]
        // eslint-disable-next-line react-hooks/exhaustive-deps
    );

    // ✅ Send unread messages when connection opens
    useEffect(() => {
        if (isConnected && messageState.flatMessages.length > 0) {
            const timeoutId = startTimeout(() => {
                sendUnreadMessages(messageState.flatMessages);
            }, 1000);

            return () => stopTimeout(timeoutId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected, sendUnreadMessages, startTimeout, stopTimeout]);

    // ✅ Store forceReconnect in ref so it's always accessible in intervals
    useEffect(() => {
        forceReconnectRef.current = forceReconnect;
    }, [forceReconnect]);

    // ✅ Connection health check: Monitor if connection is stuck
    useEffect(() => {
        if (!isConnected || !chatId) {
            return;
        }

        const intervalId = startInterval(() => {
            const timeSinceLastMessage =
                Date.now() - lastMessageTimeRef.current;
            const hasPendingMessages = pending.hasPending();
            const STUCK_THRESHOLD = 15000; // 15 seconds

            if (hasPendingMessages && timeSinceLastMessage > STUCK_THRESHOLD) {
                console.warn('⚠️ Connection appears stuck:', {
                    timeSinceLastMessage: `${Math.round(
                        timeSinceLastMessage / 1000
                    )}s`,
                    pendingMessages: pending.getPendingCount(),
                    readyState: readyState,
                });

                if (forceReconnectRef.current) {
                    forceReconnectRef.current();
                }
            } else if (
                timeSinceLastMessage > STUCK_THRESHOLD &&
                !hasPendingMessages
            ) {
                if (timeSinceLastMessage > 30000) {
                    console.warn(
                        '⚠️ No messages received for 30s, connection might be stuck. Forcing reconnect...'
                    );
                    if (forceReconnectRef.current) {
                        forceReconnectRef.current();
                    }
                }
            }
        }, 5000);

        return () => stopInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isConnected,
        chatId,
        readyState,
        forceReconnect,
        startInterval,
        stopInterval,
    ]);

    // ✅ Reset last message time when connection opens
    useEffect(() => {
        if (isConnected) {
            lastMessageTimeRef.current = Date.now();

            // Only check pending messages once when connection first opens
            if (
                !hasCheckedPendingOnConnectRef.current &&
                pending.hasPending()
            ) {
                hasCheckedPendingOnConnectRef.current = true;

                const timeoutId = startTimeout(() => {
                    checkPendingMessages();
                    refetchMessages();
                }, 2000);

                return () => stopTimeout(timeoutId);
            }
        } else {
            // Reset the flag when disconnected
            hasCheckedPendingOnConnectRef.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected, startTimeout, stopTimeout]);

    // ✅ Clean up stuck messages periodically
    useEffect(() => {
        const stuckMessageInterval = startInterval(() => {
            const now = Date.now();
            const flatMsgs = messageState.flatMessages;
            flatMsgs.forEach((m) => {
                if (m.status === 'sending' && pending.isTempId(m.id)) {
                    const tempTime = parseInt(m.id.split('-')[1]);
                    const age = now - tempTime;
                    if (age > 30000) {
                        pending.cleanupPendingRefs(m.content, m.id);
                        messageState.removeMessage(m);
                    }
                }
            });
        }, 5000);

        return () => stopInterval(stuckMessageInterval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startInterval, stopInterval]);

    // ✅ Clean up pending messages when chatId changes
    useEffect(() => {
        return () => {
            pending.clearAll();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatId]);

    // ✅ Send message
    const sendMessage = async (content: string) => {
        if (!isConnected) {
            message.error(
                'Ulanish yo‘q. Iltimos, biroz kuting va qayta urinib ko‘ring.'
            );
            return;
        }

        const tempMessage = messageState.createTempMessage(user.id, content);
        const contentTrimmed = content.trim();

        // Track pending
        pending.addPending(contentTrimmed, tempMessage.id);

        // Add to UI
        messageState.addMessage(tempMessage);

        try {
            sendWsMessage(
                JSON.stringify({
                    event: 'message',
                    content,
                })
            );

            // Set timeout for fallback matching
            const timeoutId = startTimeout(async () => {
                const flatMsgs = messageState.flatMessages;
                const stillPending = flatMsgs.find(
                    (m) => m.id === tempMessage.id && m.status === 'sending'
                );

                if (stillPending) {
                    const timeSinceLastMessage =
                        Date.now() - lastMessageTimeRef.current;
                    if (timeSinceLastMessage > 10000) {
                        console.warn(
                            '⚠️ No messages received for 10s, forcing reconnect...'
                        );
                        if (forceReconnectRef.current) {
                            forceReconnectRef.current();
                        }
                    }

                    refetchMessages().then(() => {
                        startTimeout(() => {
                            checkPendingMessages();
                        }, 500);
                    });
                }

                pending.removeTimeout(tempMessage.id);
            }, 5000);

            pending.addTimeout(tempMessage.id, timeoutId);
        } catch (error) {
            console.error('❌ Error sending message:', error);
            pending.removePending(contentTrimmed, tempMessage.id);
            messageState.removeMessage(tempMessage);
            message.error(
                'Xabar yuborishda xatolik yuz berdi. Qayta urinib ko‘ring.'
            );
        }
    };

    // ✅ Send message with file
    const sendMessageWithFile = async (data: any, options: any) => {
        const tempMessage = messageState.createTempMessage(
            user.id,
            data.content || '',
            {
                url: URL.createObjectURL(data?.file),
                filename: data?.file.name,
                size: data?.file.size,
            }
        );
        messageState.addMessage(tempMessage);
        await sendFile(data, options);
    };

    // ✅ Update message
    const updateMessage = async (content: string, message_id: number) => {
        if (!isConnected) {
            message.error(
                'Ulanish yo‘q. Iltimos, biroz kuting va qayta urinib ko‘ring.'
            );
            return;
        }

        const flatMsgs = messageState.flatMessages;
        const existing = flatMsgs.find((m) => m.id === message_id);
        if (existing) {
            messageState.updateMessage({
                ...existing,
                content,
                status: 'updating',
            });
        }

        try {
            sendWsMessage(
                JSON.stringify({
                    event: 'message_update',
                    content,
                    message_id,
                })
            );
        } catch (error) {
            console.error('❌ Error updating message:', error);
            if (existing) {
                messageState.updateMessage({
                    ...existing,
                    status: undefined,
                });
            }
            message.error(
                'Xabarni yangilashda xatolik yuz berdi. Qayta urinib ko‘ring.'
            );
        }
    };

    // ✅ Delete message
    const deleteMessage = async (message_id: number) => {
        const flatMsgs = messageState.flatMessages;
        const msg = flatMsgs.find((m) => m.id === message_id);
        if (msg) {
            messageState.removeMessage(msg);
        }
        await deleteMsg(message_id);
    };

    // Debug helper (development only)
    useEffect(() => {
        if (
            typeof window !== 'undefined' &&
            process.env.NODE_ENV === 'development'
        ) {
            (window as any).checkWS = () => {
                const ws = getWebSocket();
                return {
                    exists: !!ws,
                    readyState: ws?.readyState,
                    readyStateName: {
                        0: 'CONNECTING',
                        1: 'OPEN',
                        2: 'CLOSING',
                        3: 'CLOSED',
                    }[ws?.readyState ?? 0],
                    isConnected,
                    chatId,
                };
            };
        }
    }, [getWebSocket, isConnected, chatId]);

    return {
        wsRef: { current: getWebSocket() }, // Keep for backward compatibility
        messages: messageState.groupedMessages, // ✅ Return grouped messages
        chat,
        sendMessage,
        sendMessageWithFile,
        updateMessage,
        deleteMessage,
        sendUnreadMessages,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isFetching: isInitialLoading,
        isMessageWithFilePending,
        isConnected,
        checkConnectionState: () => {
            const ws = getWebSocket();
            return {
                exists: !!ws,
                isClosed: ws?.readyState === WS_READY_STATE.CLOSED,
                isOpen: ws?.readyState === WS_READY_STATE.OPEN,
                readyState: ws?.readyState,
            };
        },
    };
};
