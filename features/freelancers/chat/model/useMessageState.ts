import { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';

type MessageType = any;
type MessageGroupType = {
    date: string;
    dateFormatted: string;
    messages: MessageType[];
};

type useMessageStateProps = {
    defaultMessages: MessageType[];
};

const getDateKey = (message: MessageType): string => {
    if (!message.created_at) return 'Yangi';
    return dayjs(message.created_at).format('YYYY-MM-DD');
};

const getFormattedDate = (dateKey: string): string => {
    if (!dateKey || !dayjs(dateKey).isValid()) return 'Yangi';
    if (dayjs(dateKey).isToday()) return 'Bugun';
    if (dayjs(dateKey).isYesterday()) return 'Kecha';
    return dayjs(dateKey).format('MMMM D, YYYY');
};

const groupMessages = (
    messages: MessageType[]
): Map<string, MessageGroupType> => {
    const sortedMessages = messages
        .map((msg) => ({
            msg,
            timestamp: new Date(msg.created_at || 0).getTime(),
        }))
        .sort((a, b) => a.timestamp - b.timestamp)
        .map(({ msg }) => msg);

    return sortedMessages.reduce((acc, message) => {
        const dateKey = getDateKey(message);
        const group = acc.get(dateKey);
        if (group) {
            acc.set(dateKey, {
                ...group,
                messages: [...group.messages, message],
            });
        } else {
            acc.set(dateKey, {
                date: dateKey,
                dateFormatted: getFormattedDate(dateKey),
                messages: [message],
            } as MessageGroupType);
        }
        return acc;
    }, new Map());
};

function useMessageState({ defaultMessages }: useMessageStateProps) {
    const [messages, setMessages] = useState<Map<string, MessageGroupType>>(
        new Map()
    );

    const groupedMessages = useMemo(
        () =>
            Array.from(messages.values()).sort((a, b) =>
                b.date.localeCompare(a.date)
            ),
        [messages]
    );

    const addMessage = useCallback((message: MessageType) => {
        const dateKey = getDateKey(message);
        setMessages((prev) => {
            const newMap = new Map(prev);
            const group = newMap.get(dateKey);

            if (group) {
                newMap.set(dateKey, {
                    ...group,
                    messages: [...group.messages, message],
                } as MessageGroupType);
            } else {
                newMap.set(dateKey, {
                    date: dateKey,
                    dateFormatted: getFormattedDate(dateKey),
                    messages: [message],
                } as MessageGroupType);
            }

            return newMap;
        });
    }, []);

    const updateMessage = useCallback((message: MessageType) => {
        const dateKey = getDateKey(message);
        setMessages((prev) => {
            const newMap = new Map(prev);
            const group = newMap.get(dateKey);

            if (!group) return prev;

            newMap.set(dateKey, {
                ...group,
                messages: group.messages.map((m) =>
                    m.id === message.id ? message : m
                ),
            } as MessageGroupType);

            return newMap;
        });
    }, []);

    const removeMessage = useCallback((message: MessageType) => {
        const dateKey = getDateKey(message);
        setMessages((prev) => {
            const newMap = new Map(prev);
            const group = newMap.get(dateKey);

            if (!group) return prev;

            newMap.set(dateKey, {
                ...group,
                messages: group.messages.filter((m) => m.id !== message.id),
            } as MessageGroupType);

            if (!group.messages.length) newMap.delete(dateKey);

            return newMap;
        });
    }, []);

    const createTempMessage = useCallback(
        (
            userId: string,
            content?: string,
            file?: {
                url: string;
                filename: string;
                size: number;
            }
        ) => {
            return {
                id: `temp-${Date.now()}`,
                content,
                sender_id: userId,
                created_at: new Date().toISOString(),
                read_at: null,
                file,
                is_read: false,
                is_mine: true,
                status: 'sending',
            } as MessageType;
        },
        []
    );

    useEffect(() => {
        setMessages(groupMessages(defaultMessages));
    }, [defaultMessages]);

    return {
        groupedMessages,
        messages,
        setMessages,
        addMessage,
        updateMessage,
        removeMessage,
        createTempMessage,
    };
}

export default useMessageState;
