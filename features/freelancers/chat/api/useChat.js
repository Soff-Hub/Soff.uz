import { useEffect, useRef, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import useGetChatById from './useGetChatById';
import useDeleteMessage from './useDeleteMessage';
import useSendMessage from './useSendMessage';
import { useTimeManager } from '~/shared/hooks/useTimeManager';
import { message } from 'antd';
import dayjs from 'dayjs';
import { WS_READY_STATE } from '../constants/socket-state';
import useChatSocket from './useChatSocket';
// import useMessageState from '../model/useMessageState';

const useChat = (chatId) => {
    const [messages, setMessages] = useState([]);
    // const { } = useMessageState();
    const [chat, setChat] = useState();
    const { startTimeout, stopTimeout } = useTimeManager();
    const { mutateAsync: deleteMsg } = useDeleteMessage();
    const { mutateAsync: sendFile, isPending: isMessageWithFilePending } =
        useSendMessage();
    const { user } = useSelector((state) => state.auth);
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isInitialLoading,
        refetch: refetchMessages,
    } = useGetChatById(chatId);
    const unreadTimeoutRef = useRef(null);
    const pendingMessageTimeoutsRef = useRef(new Map());

    const lastMessageTimeRef = useRef(Date.now());
    const healthCheckIntervalRef = useRef(null);
    const forceReconnectRef = useRef(null);

    const {
        sendWsMessage,
        lastMessage,
        readyState,
        getWebSocket,
        isConnected,
        forceReconnect,
    } = useChatSocket({ chatId, user });

    // Track pending messages to match with server responses
    const pendingMessagesRef = useRef(new Map()); // content -> tempId

    // Helper function to check if an ID is a temporary ID
    // Temporary IDs are strings starting with 'temp-'
    // Server IDs are numbers, date separator IDs are strings starting with 'date-separator-'
    const isTempId = useCallback((id) => {
        return typeof id === 'string' && id.startsWith('temp-');
    }, []);

    // Function to check and match pending messages with API data
    const checkPendingMessages = useCallback(async () => {
        if (!chatId || !data) return;

        // Get all messages from API (ALL pages, not just latest)
        const allApiMessages = data.pages.flatMap((p) => p.messages || []);

        // Find messages still in "sending" status and clean them up if confirmed
        setMessages((prev) => {
            // Map to track which pending messages should be replaced with which real messages
            const pendingToRealMessage = new Map(); // tempId -> realMessage
            const contentToRealMessage = new Map(); // content -> realMessage

            // First pass: find all matches
            prev.forEach((m) => {
                if (m.status === 'sending' && isTempId(m.id)) {
                    const contentTrimmed = m.content.trim();

                    // Try to find matching message in API data
                    const matchingMessage = allApiMessages.find((apiMsg) => {
                        // Exact content match
                        const contentMatch =
                            apiMsg.content?.trim() === contentTrimmed;
                        // Sender match
                        const senderMatch =
                            apiMsg.sender_id === m.sender_id &&
                            apiMsg.sender_id === user.id;
                        // Time-based check: message should be recent (within last 5 minutes)
                        const msgTime = new Date(m.created_at);
                        const apiMsgTime = new Date(apiMsg.created_at);
                        const timeDiff = Math.abs(apiMsgTime - msgTime);
                        const isRecent = timeDiff < 5 * 60 * 1000; // 5 minutes

                        return contentMatch && senderMatch && isRecent;
                    });

                    if (matchingMessage) {
                        pendingToRealMessage.set(m.id, matchingMessage);
                        contentToRealMessage.set(
                            contentTrimmed,
                            matchingMessage
                        );

                        // Clean up refs
                        pendingMessagesRef.current.delete(contentTrimmed);
                        const timeoutId = pendingMessageTimeoutsRef.current.get(
                            m.id
                        );
                        if (timeoutId) {
                            clearTimeout(timeoutId);
                            pendingMessageTimeoutsRef.current.delete(m.id);
                        }
                    }
                }
            });

            if (pendingToRealMessage.size === 0) {
                return prev; // No changes
            }

            // Second pass: replace pending messages and remove duplicates
            const seenRealIds = new Set();
            const updated = [];

            for (const m of prev) {
                // If this is a pending message that has a match, replace it
                if (pendingToRealMessage.has(m.id)) {
                    const realMessage = pendingToRealMessage.get(m.id);
                    const { status, ...cleanMsg } = realMessage;

                    // Only add if we haven't seen this real message ID yet
                    if (!seenRealIds.has(cleanMsg.id)) {
                        updated.push(cleanMsg);
                        seenRealIds.add(cleanMsg.id);
                    }
                    // Skip the pending message (replaced with real one)
                    continue;
                }

                // If this is a temp message with content that matches a real message, skip it
                if (isTempId(m.id) && m.status === 'sending') {
                    const contentTrimmed = m.content.trim();
                    const realMessage =
                        contentToRealMessage.get(contentTrimmed);
                    if (realMessage && seenRealIds.has(realMessage.id)) {
                        // Real message already added, skip this temp one
                        continue;
                    }
                }

                // Track real message IDs to avoid duplicates
                if (!isTempId(m.id)) {
                    if (seenRealIds.has(m.id)) {
                        continue; // Skip duplicate real message
                    }
                    seenRealIds.add(m.id);
                }

                updated.push(m);
            }

            return updated;
        });
    }, [chatId, data, user?.id, isTempId]);

    // Update last message time on any WebSocket message
    useEffect(() => {
        if (lastMessage?.data) {
            lastMessageTimeRef.current = Date.now();
        }
    }, [lastMessage]);

    // Process messages from WebSocket
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
            setMessages((prev) => {
                const updated = prev.filter((m) => {
                    // Remove temp messages that match the error content
                    if (
                        m.status === 'sending' &&
                        m.content.trim() === msg.content?.trim()
                    ) {
                        pendingMessagesRef.current.delete(m.content.trim());
                        return false;
                    }
                    return true;
                });
                sendUnreadMessages(updated);
                return updated;
            });
            return;
        }

        switch (msg.event) {
            case 'message': {
                setMessages((prev) => {
                    // If it's my message, try to replace temp message
                    if (msg.is_mine) {
                        const contentTrimmed = msg.content?.trim();
                        const tempId =
                            pendingMessagesRef.current.get(contentTrimmed);

                        // First, filter out ALL pending messages with matching content
                        // This is more aggressive and handles reconnection cases
                        const filtered = prev.filter((m) => {
                            // Remove any pending messages that match this content
                            if (
                                m.status === 'sending' &&
                                m.content.trim() === contentTrimmed &&
                                m.sender_id === user.id &&
                                isTempId(m.id)
                            ) {
                                // Clean up refs
                                pendingMessagesRef.current.delete(
                                    contentTrimmed
                                );
                                const timeoutId =
                                    pendingMessageTimeoutsRef.current.get(m.id);
                                if (timeoutId) {
                                    clearTimeout(timeoutId);
                                    pendingMessageTimeoutsRef.current.delete(
                                        m.id
                                    );
                                }
                                return false; // Remove this pending message
                            }
                            return true;
                        });

                        // Check if message with this real ID already exists (avoid duplicates)
                        const alreadyExists = filtered.some(
                            (m) => m.id === msg.id && !isTempId(m.id)
                        );

                        if (alreadyExists) {
                            // Message already exists, just return filtered (pending removed)
                            sendUnreadMessages(filtered);
                            return filtered;
                        }

                        // Add the real message (without status)
                        const { status, ...cleanMsg } = msg;
                        const finalMessages = [...filtered, cleanMsg];
                        sendUnreadMessages(finalMessages);
                        return finalMessages;
                    } else {
                        // Not my message, just add it (but check for duplicates first)
                        const alreadyExists = prev.some(
                            (m) => m.id === msg.id && !isTempId(m.id)
                        );
                        if (alreadyExists) {
                            return prev;
                        }
                        const updated = [...prev, msg];
                        sendUnreadMessages(updated);
                        return updated;
                    }
                });
                break;
            }
            case 'message_update': {
                setMessages((prev) => {
                    const updated = prev.map((m) => {
                        if (m.id === msg.id) {
                            // Remove status and update with server response
                            const { status, ...cleanMsgProperties } = m;
                            const { status: msgStatus, ...cleanMsg } = msg;
                            return { ...cleanMsgProperties, ...cleanMsg };
                        }
                        return m;
                    });
                    return updated;
                });
                break;
            }
            case 'delete_message':
                setMessages((prev) => prev.filter((m) => m.id !== msg.id));
                break;
            default:
                console.warn('Unknown event:', msg);
        }
    }, [lastMessage, user?.id]);

    // Check pending messages when data updates (after refetch or pagination)
    useEffect(() => {
        if (data) {
            // Always check for pending messages when data changes (pagination, refetch, etc.)
            // Small delay to ensure state is updated
            const checkTimeout = setTimeout(() => {
                checkPendingMessages();
            }, 100);
            return () => clearTimeout(checkTimeout);
        }
    }, [data, checkPendingMessages]);

    // Process chat data and format messages with date separators
    useEffect(() => {
        if (chatId && data) {
            setChat(data?.pages[0]?.chat);

            // Get ALL messages from ALL pages (infinite query pages)
            let allMsgs = data.pages.flatMap((p) => p.messages || []);

            allMsgs = allMsgs.sort(
                (a, b) => new Date(a.created_at) - new Date(b.created_at)
            );

            // Create a map of server messages by ID for quick lookup
            const serverMessagesMap = new Map(allMsgs.map((m) => [m.id, m]));

            // Proactively clean up pending refs for messages that are confirmed in server data
            // This helps catch cases where matching might have been missed
            pendingMessagesRef.current.forEach((tempId, content) => {
                const matchingServerMsg = allMsgs.find(
                    (serverMsg) =>
                        serverMsg.content?.trim() === content &&
                        serverMsg.sender_id === user?.id
                );
                if (matchingServerMsg) {
                    // Found a match, clean up the ref
                    pendingMessagesRef.current.delete(content);
                    const timeoutId =
                        pendingMessageTimeoutsRef.current.get(tempId);
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                        pendingMessageTimeoutsRef.current.delete(tempId);
                    }
                }
            });

            // Preserve pending/temporary messages and WebSocket messages from current state
            setMessages((prevMessages) => {
                // Get all messages that need to be preserved:
                // 1. Pending messages (sending/updating status)
                // 2. Messages that came via WebSocket but aren't in server data yet
                const messagesToPreserve = prevMessages.filter((m) => {
                    // Skip date separators - they'll be regenerated
                    if (m.type === 'date-separator') {
                        return false;
                    }

                    // If it's a pending message (temp ID or has status)
                    if (m.status === 'sending' || m.status === 'updating') {
                        // Check if it's been confirmed by server
                        if (isTempId(m.id)) {
                            // For temp messages, check if server has matching message
                            // Try multiple matching strategies for robustness
                            const contentTrimmed = m.content.trim();
                            const matchingServerMsg = allMsgs.find(
                                (serverMsg) => {
                                    // Exact content match
                                    const contentMatch =
                                        serverMsg.content?.trim() ===
                                        contentTrimmed;
                                    // Sender match
                                    const senderMatch =
                                        serverMsg.sender_id === m.sender_id &&
                                        serverMsg.sender_id === user?.id;
                                    // Time-based check: message should be recent (within last 5 minutes)
                                    const msgTime = new Date(m.created_at);
                                    const serverMsgTime = new Date(
                                        serverMsg.created_at
                                    );
                                    const timeDiff = Math.abs(
                                        serverMsgTime - msgTime
                                    );
                                    const isRecent = timeDiff < 5 * 60 * 1000; // 5 minutes

                                    return (
                                        contentMatch && senderMatch && isRecent
                                    );
                                }
                            );

                            if (matchingServerMsg) {
                                // Message confirmed! Clean up pending refs
                                pendingMessagesRef.current.delete(
                                    contentTrimmed
                                );
                                const timeoutId =
                                    pendingMessageTimeoutsRef.current.get(m.id);
                                if (timeoutId) {
                                    clearTimeout(timeoutId);
                                    pendingMessageTimeoutsRef.current.delete(
                                        m.id
                                    );
                                }
                                // Don't preserve - server has it
                                return false;
                            }
                            // Still pending, preserve it
                            return true;
                        }

                        // For updating status with real ID
                        if (m.status === 'updating') {
                            const serverMsg = serverMessagesMap.get(m.id);
                            if (
                                serverMsg &&
                                serverMsg.content?.trim() === m.content.trim()
                            ) {
                                // Update confirmed, don't preserve
                                return false;
                            }
                            return true;
                        }
                    }

                    // If message is not in server data, preserve it (might be a new WebSocket message)
                    // But only if it's not a duplicate of a server message
                    if (!serverMessagesMap.has(m.id)) {
                        // Check if it's a duplicate by content (for temp messages that were confirmed)
                        if (isTempId(m.id)) {
                            // Already handled above
                            return true;
                        }
                        // Real message ID not in server - might be very new, preserve it
                        return true;
                    }

                    // Message exists in server data, don't preserve (use server version)
                    return false;
                });

                // Merge: server messages + preserved messages
                const mergedMessages = [...allMsgs, ...messagesToPreserve];

                // Sort by created_at
                mergedMessages.sort(
                    (a, b) =>
                        new Date(a.created_at || 0) -
                        new Date(b.created_at || 0)
                );

                // Add date separators
                const messagesWithSeparators = mergedMessages.reduce(
                    (acc, msg, index) => {
                        if (!msg.created_at) {
                            acc.push(msg);
                            return acc;
                        }

                        const msgDate = new Date(msg.created_at).toDateString();
                        const prevMsgDate =
                            index > 0 && mergedMessages[index - 1].created_at
                                ? new Date(
                                      mergedMessages[index - 1].created_at
                                  ).toDateString()
                                : null;

                        if (msgDate !== prevMsgDate) {
                            // const dateObj = new Date(msg.created_at);
                            // const uzbekMonths = [
                            //     'Yanvar',
                            //     'Fevral',
                            //     'Mart',
                            //     'Aprel',
                            //     'May',
                            //     'Iyun',
                            //     'Iyul',
                            //     'Avgust',
                            //     'Sentyabr',
                            //     'Oktyabr',
                            //     'Noyabr',
                            //     'Dekabr',
                            // ];

                            // const day = dateObj.getDate();
                            // const month = uzbekMonths[dateObj.getMonth()];
                            // const year = dateObj.getFullYear();
                            // const formattedDate = `${month} ${day}, ${year}`;

                            acc.push({
                                id: `date-separator-${msgDate}-${index}`,
                                type: 'date-separator',
                                date: dayjs(msg.created_at).format(
                                    'MMMM D, YYYY'
                                ),
                            });
                        }
                        acc.push(msg);
                        return acc;
                    },
                    []
                );

                // Remove duplicates (prioritize server messages over pending if same ID)
                const uniqueMsgsById = Array.from(
                    new Map(
                        messagesWithSeparators.map((m) => [m.id, m])
                    ).values()
                );

                // Additional deduplication: remove pending messages if real message with same content exists
                const seenContentToRealId = new Map(); // content -> real message ID
                const finalMessages = uniqueMsgsById.filter((m) => {
                    const contentTrimmed = m.content?.trim();

                    // Track real messages by content
                    if (!isTempId(m.id) && contentTrimmed) {
                        seenContentToRealId.set(contentTrimmed, m.id);
                    }

                    // If this is a pending message and we have a real message with same content, remove it
                    if (
                        isTempId(m.id) &&
                        m.status === 'sending' &&
                        contentTrimmed
                    ) {
                        const realId = seenContentToRealId.get(contentTrimmed);
                        if (realId) {
                            // Real message exists with this content, remove pending
                            return false;
                        }
                    }

                    return true;
                });

                return finalMessages;
            });
        }
    }, [chatId, data, user?.id]);

    // Send unread messages to server
    const sendUnreadMessages = useCallback(
        (msgs = messages) => {
            const ws = getWebSocket();
            if (!ws || ws.readyState !== WS_READY_STATE.OPEN) {
                return;
            }

            const unreadIds = msgs?.filter((m) => !m.is_read).map((m) => m.id);
            if (unreadIds?.length > 0) {
                sendWsMessage(
                    JSON.stringify({
                        event: 'message_read',
                        message_ids: unreadIds,
                    })
                );
            }
        },
        [getWebSocket, sendWsMessage, messages]
    );

    // Send unread messages when connection opens
    useEffect(() => {
        if (isConnected && messages.length > 0) {
            // Debounce sending unread messages
            if (unreadTimeoutRef.current) {
                stopTimeout(unreadTimeoutRef.current);
            }
            unreadTimeoutRef.current = startTimeout(() => {
                sendUnreadMessages(messages);
            }, 1000);
        }

        return () => {
            if (unreadTimeoutRef.current) {
                stopTimeout(unreadTimeoutRef.current);
            }
        };
    }, [isConnected, messages, sendUnreadMessages, startTimeout, stopTimeout]);

    // Store forceReconnect in ref so it's always accessible in intervals
    forceReconnectRef.current = forceReconnect;

    // Connection health check: Monitor if connection is stuck
    useEffect(() => {
        if (!isConnected || !chatId) {
            // Clear health check if not connected
            if (healthCheckIntervalRef.current) {
                clearInterval(healthCheckIntervalRef.current);
                healthCheckIntervalRef.current = null;
            }
            return;
        }

        // Start health check interval
        healthCheckIntervalRef.current = setInterval(() => {
            const timeSinceLastMessage =
                Date.now() - lastMessageTimeRef.current;
            const hasPendingMessages = pendingMessagesRef.current.size > 0;
            const STUCK_THRESHOLD = 15000; // 15 seconds without any messages

            // If we have pending messages AND no messages received for threshold, connection is stuck
            if (hasPendingMessages && timeSinceLastMessage > STUCK_THRESHOLD) {
                console.warn('⚠️ Connection appears stuck:', {
                    timeSinceLastMessage: `${Math.round(
                        timeSinceLastMessage / 1000
                    )}s`,
                    pendingMessages: pendingMessagesRef.current.size,
                    readyState: readyState,
                });

                // Force reconnect by changing URL (library will handle reconnection)
                if (forceReconnectRef.current) {
                    forceReconnectRef.current();
                }
            } else if (
                timeSinceLastMessage > STUCK_THRESHOLD &&
                !hasPendingMessages
            ) {
                // Even without pending messages, if no messages for a long time, might be stuck
                // But be less aggressive - only if it's been a really long time (30s)
                if (timeSinceLastMessage > 30000) {
                    console.warn(
                        '⚠️ No messages received for 30s, connection might be stuck. Forcing reconnect...'
                    );
                    if (forceReconnectRef.current) {
                        forceReconnectRef.current();
                    }
                }
            }
        }, 5000); // Check every 5 seconds

        return () => {
            if (healthCheckIntervalRef.current) {
                clearInterval(healthCheckIntervalRef.current);
                healthCheckIntervalRef.current = null;
            }
        };
    }, [isConnected, chatId, readyState, forceReconnect]);

    // Reset last message time when connection opens
    useEffect(() => {
        if (isConnected) {
            lastMessageTimeRef.current = Date.now();

            // When connection opens (especially after reconnect), check for pending messages
            // that might have been sent successfully but not yet matched
            if (data && pendingMessagesRef.current.size > 0) {
                // Small delay to ensure any pending messages from the new connection are processed
                const checkTimeout = setTimeout(() => {
                    checkPendingMessages();
                    // Also refetch to get the latest messages from server
                    refetchMessages();
                }, 2000);

                return () => clearTimeout(checkTimeout);
            }
        }
    }, [isConnected, data, checkPendingMessages, refetchMessages]);

    // Clean up stuck messages periodically
    useEffect(() => {
        const stuckMessageTimeout = setInterval(() => {
            const now = Date.now();
            setMessages((prev) => {
                const updated = prev.filter((m) => {
                    if (m.status === 'sending' && isTempId(m.id)) {
                        // Extract timestamp from temp ID (format: temp-1234567890)
                        const tempTime = parseInt(m.id.split('-')[1]);
                        const age = now - tempTime;
                        if (age > 30000) {
                            pendingMessagesRef.current.delete(m.content.trim());
                            return false;
                        }
                    }
                    return true;
                });
                return updated;
            });
        }, 5000);

        return () => clearInterval(stuckMessageTimeout);
    }, [isTempId]);

    // Clean up pending messages when chatId changes
    useEffect(() => {
        return () => {
            // Clear all pending message timeouts
            pendingMessageTimeoutsRef.current.forEach((timeoutId) => {
                clearTimeout(timeoutId);
            });
            pendingMessageTimeoutsRef.current.clear();
            pendingMessagesRef.current.clear();

            // Clear health check
            if (healthCheckIntervalRef.current) {
                clearInterval(healthCheckIntervalRef.current);
                healthCheckIntervalRef.current = null;
            }
        };
    }, [chatId]);

    const sendMessage = async (content) => {
        if (!isConnected) {
            message.error(
                'Ulanish yo‘q. Iltimos, biroz kuting va qayta urinib ko‘ring.'
            );
            return;
        }

        const tempId = `temp-${Date.now()}`;
        const contentTrimmed = content.trim();

        // Track this pending message
        pendingMessagesRef.current.set(contentTrimmed, tempId);

        const tempMessage = {
            id: tempId,
            content,
            file: null,
            read_at: null,
            sender_id: user.id,
            created_at: new Date().toISOString(),
            is_read: false,
            is_mine: true,
            status: 'sending',
        };

        // Add temp message to UI
        setMessages((prev) => [...prev, tempMessage]);

        try {
            sendWsMessage(
                JSON.stringify({
                    event: 'message',
                    content,
                })
            );
            // Set up 5-second fallback: if message is still pending, refetch and match
            const timeoutId = setTimeout(async () => {
                // Check if message is still in "sending" status
                setMessages((current) => {
                    const stillPending = current.find(
                        (m) => m.id === tempId && m.status === 'sending'
                    );

                    if (stillPending) {
                        // Check connection health - if no messages received recently, force reconnect
                        const timeSinceLastMessage =
                            Date.now() - lastMessageTimeRef.current;
                        if (timeSinceLastMessage > 10000) {
                            // No messages for 10+ seconds, connection is likely stuck
                            console.warn(
                                '⚠️ No messages received for 10s, forcing reconnect...'
                            );
                            if (forceReconnectRef.current) {
                                forceReconnectRef.current();
                            }
                        }

                        // Refetch messages from API
                        refetchMessages().then(() => {
                            // After refetch, check for matching message
                            setTimeout(() => {
                                checkPendingMessages();
                            }, 500); // Small delay to ensure data is updated
                        });
                    }

                    return current;
                });

                // Clean up timeout reference
                pendingMessageTimeoutsRef.current.delete(tempId);
            }, 5000); // 5 seconds

            // Store timeout ID for cleanup
            pendingMessageTimeoutsRef.current.set(tempId, timeoutId);
        } catch (error) {
            console.error('❌ Error sending message:', error);
            // Remove temp message and tracking on error
            pendingMessagesRef.current.delete(contentTrimmed);
            const timeoutId = pendingMessageTimeoutsRef.current.get(tempId);
            if (timeoutId) {
                clearTimeout(timeoutId);
                pendingMessageTimeoutsRef.current.delete(tempId);
            }
            setMessages((prev) => prev.filter((m) => m.id !== tempId));
            message.error(
                'Xabar yuborishda xatolik yuz berdi. Qayta urinib ko‘ring.'
            );
        }
    };

    const sendMessageWithFile = async (data, options) => {
        setMessages((prev) => [
            ...prev,
            {
                id: `temp-${Date.now()}`,
                content: data.content || '',
                file: {
                    url: URL.createObjectURL(data?.file),
                    filename: data?.file.name,
                    size: data?.file.size,
                },
                read_at: null,
                sender_id: user.id,
                created_at: new Date().toISOString(),
                is_read: false,
                is_mine: true,
                status: 'sending',
            },
        ]);
        await sendFile(data, options);
    };

    const updateMessage = async (content, message_id) => {
        if (!isConnected) {
            message.error(
                'Ulanish yo‘q. Iltimos, biroz kuting va qayta urinib ko‘ring.'
            );
            return;
        }

        const tempMessage = {
            ...(messages.find((m) => m.id === message_id) || {}),
            content,
            status: 'updating',
        };

        setMessages((prev) =>
            prev.map((m) => (m.id === message_id ? tempMessage : m))
        );

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
            // Revert message on error
            setMessages((prev) =>
                prev.map((m) =>
                    m.id === message_id ? { ...m, status: undefined } : m
                )
            );
            message.error(
                'Xabarni yangilashda xatolik yuz berdi. Qayta urinib ko‘ring.'
            );
        }
    };

    const deleteMessage = async (message_id, message_status) => {
        setMessages((prev) => prev.filter((m) => m.id !== message_id));
        await deleteMsg(message_id);
    };

    // Debug helper (development only)
    useEffect(() => {
        if (
            typeof window !== 'undefined' &&
            process.env.NODE_ENV === 'development'
        ) {
            window.checkWS = () => {
                const ws = getWebSocket();
                return {
                    exists: !!ws,
                    readyState: ws?.readyState,
                    readyStateName: {
                        0: 'CONNECTING',
                        1: 'OPEN',
                        2: 'CLOSING',
                        3: 'CLOSED',
                    }[ws?.readyState],
                    isConnected,
                    chatId,
                };
            };
        }
    }, [getWebSocket, isConnected, chatId]);

    return {
        wsRef: { current: getWebSocket() }, // Keep for backward compatibility
        messages,
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

export default useChat;
