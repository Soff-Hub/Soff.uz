import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useGetChatById from './useGetChatById';
import useDeleteMessage from './useDeleteMessage';
import useSendMessage from './useSendMessage';
import { useTimeManager } from '~/shared/hooks/useTimeManager';
import { message } from 'antd';
import dayjs from 'dayjs';
// import { sleep } from '~/shared/utilities/sleep';

const useChat = chatId => {
    const [messages, setMessages] = useState([]);
    const [chat, setChat] = useState();
    const { startTimeout, stopTimeout } = useTimeManager();
    const { mutateAsync: deleteMsg } = useDeleteMessage();
    const {
        mutateAsync: sendFile,
        isPending: isMessageWithFilePending,
    } = useSendMessage();
    const { user } = useSelector(state => state.auth);
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isInitialLoading,
    } = useGetChatById(chatId);
    const wsRef = useRef();

    useEffect(() => {
        if (chatId && data) {
            setChat(data?.pages[0]?.chat);

            let allMsgs = data.pages.flatMap(p => p.messages);

            allMsgs = allMsgs.sort(
                (a, b) => new Date(a.created_at) - new Date(b.created_at)
            );

            // batch date separators
            allMsgs = allMsgs.reduce((acc, msg, index) => {
                if (!msg.created_at) {
                    acc.push(msg);
                    return acc;
                }

                const msgDate = new Date(msg.created_at).toDateString();
                const prevMsgDate =
                    index > 0 && allMsgs[index - 1].created_at
                        ? new Date(allMsgs[index - 1].created_at).toDateString()
                        : null;

                if (msgDate !== prevMsgDate) {
                    // Create a proper date object and format it safely in Uzbek
                    const dateObj = new Date(msg.created_at);
                    const uzbekMonths = [
                        'Yanvar',
                        'Fevral',
                        'Mart',
                        'Aprel',
                        'May',
                        'Iyun',
                        'Iyul',
                        'Avgust',
                        'Sentyabr',
                        'Oktyabr',
                        'Noyabr',
                        'Dekabr',
                    ];

                    const day = dateObj.getDate();
                    const month = uzbekMonths[dateObj.getMonth()];
                    const year = dateObj.getFullYear();
                    const formattedDate = `${month} ${day}, ${year}`;

                    acc.push({
                        id: `date-separator-${msgDate}-${index}`,
                        type: 'date-separator',
                        date: formattedDate,
                    });
                }
                acc.push(msg);
                return acc;
            }, []);

            // remove duplicates

            const uniqueMsgs = Array.from(
                new Map(allMsgs.map(m => [m.id, m])).values()
            );

            setMessages(uniqueMsgs);
        }
    }, [chatId, data]);

    const sendUnreadMessages = (ws, messages) => {
        if (!ws || ws.readyState !== WebSocket.OPEN) return;
        const unreadIds = messages?.filter(m => !m.is_read).map(m => m.id);
        if (unreadIds?.length > 0) {
            ws.send(
                JSON.stringify({
                    event: 'message_read',
                    message_ids: unreadIds,
                })
            );
        }
    };

    const sendMessage = async content => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            const tempId = `temp-${Date.now()}`;
            const tempMessage = {
                id: tempId,
                content,
                file: null,
                read_at: null,
                sender_id: user.id,
                created_at: new Date().toISOString(),
                is_read: false,
                is_mine: true,
                status: 'sending', // 🟡 UI can show spinner
            };

            // Add it immediately to UI
            setMessages(prev => [...prev, tempMessage]);
            // await sleep(5000);
            wsRef.current.send(
                JSON.stringify({
                    event: 'message',
                    content,
                })
            );
        }
    };

    const sendMessageWithFile = async (data, options) => {
        setMessages(prev => [
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
                status: 'sending', // 🟡 UI can show spinner
            },
        ]);
        // await sleep(5000);
        await sendFile(data, options);
    };

    const updateMessage = async (content, message_id) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            const tempMessage = {
                ...(messages.find(m => m.id === message_id) || {}),
                content,
                status: 'updating', // 🟡 UI can show spinner
            };

            setMessages(prev =>
                prev.map(m => (m.id === message_id ? tempMessage : m))
            );
            // await sleep(5000);
            wsRef.current.send(
                JSON.stringify({
                    event: 'message_update',
                    content,
                    message_id,
                })
            );
        }
    };

    const deleteMessage = async (message_id, message_status) => {
        setMessages(prev => prev.filter(m => m.id !== message_id));
        // await sleep(5000);
        await deleteMsg(message_id);
    };

    useEffect(() => {
        if (!chatId || !user?.access) return;
        let unreadMessageTimeout;
        const ws = new WebSocket(
            `${process.env.NEXT_PUBLIC_WS_FREELEANCE_URL}chat/${chatId}/?token=${user.access}`
        );
        wsRef.current = ws;

        ws.onopen = () => {
            sendUnreadMessages(ws, messages);
        };

        ws.onmessage = event => {
            if (!event.data) {
                console.warn('⚠️ WS event.data bo‘sh:', event);
                return;
            }

            let msg;
            try {
                msg = JSON.parse(event.data);
            } catch (e) {
                console.warn('⚠️ JSON emas data:', event.data);
                return;
            }

            if (msg.error) {
                message.error(msg.error);
                setMessages(prev => {
                    let replaced = false;

                    const updated = prev
                        .map(m => {
                            if (
                                !replaced &&
                                m.status === 'sending' &&
                                m.content.trim() === msg.content.trim()
                            ) {
                                replaced = true;
                                return null; // replace this one
                            }
                            return m;
                        })
                        .filter(Boolean);

                    sendUnreadMessages(ws, updated);
                    return updated;
                });
                return;
            }
            switch (msg.event) {
                case 'message': {
                    setMessages(prev => {
                        let replaced = false;

                        const updated = !msg.is_mine
                            ? [...prev, msg]
                            : prev.map(m => {
                                  if (
                                      !replaced &&
                                      m.status === 'sending' &&
                                      m.content.trim() === msg.content.trim()
                                  ) {
                                      replaced = true;
                                      return msg; // replace this one
                                  }
                                  return m;
                              });

                        sendUnreadMessages(ws, updated);
                        return updated;
                    });

                    break;
                }
                case 'message_update':
                    setMessages(prev =>
                        prev.map(m => {
                            const { status, ...cleanMsgProperties } = m;
                            if (m.id === msg.id) {
                                return { ...cleanMsgProperties, ...msg };
                            }
                            return m;
                        })
                    );
                    break;
                case 'delete_message':
                    setMessages(prev => prev.filter(m => m.id !== msg.id));
                    break;
                default:
                    console.warn('Unknown event:', msg);
            }
            unreadMessageTimeout = startTimeout(() => {
                sendUnreadMessages(ws, messages);
            }, 1000);
        };

        return () => {
            ws.close();
            stopTimeout(unreadMessageTimeout);
        };
    }, [chatId, user?.access]);

    return {
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
    };
};

export default useChat;
