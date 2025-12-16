import { startTransition, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import useGetChats from './useGetChats';
import useWebSocket from 'react-use-websocket';
import { useRouter } from 'next/router';

const chatPath = '/chat';

const useChats = (search) => {
    const router = useRouter();
    const [chats, setChats] = useState([]);
    const [isInitialChatsSet, setIsInitialChatsSet] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const {
        data: chatsData,
        isFetching,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        error,
    } = useGetChats(search);
    const wsRef = useRef(null);
    const isReadyToConnect = Boolean(
        user?.access && isInitialChatsSet && router.pathname === chatPath
    );
    const baseWsUrl = isReadyToConnect
        ? `${process.env.NEXT_PUBLIC_WS_FREELEANCE_URL}chat/?token=${user?.access}`
        : null;

    useWebSocket(
        baseWsUrl,
        {
            onMessage: (event) => {
                if (!event.data) return;
                let msg;
                try {
                    msg = JSON.parse(event.data);
                } catch (e) {
                    console.warn('⚠️ JSON emas data:', event.data);
                    return;
                }

                setChats((prev) => {
                    if (!Array.isArray(prev)) prev = [];

                    const index = prev.findIndex(
                        (c) => c.chat_id === msg.chat_id
                    );

                    if (index !== -1) {
                        const updated = [...prev];
                        updated.splice(index, 1);
                        return [msg, ...updated].filter((item) => item.chat_id);
                    } else {
                        return [msg, ...prev];
                    }
                });
            },
            share: true,
            shouldReconnect: isReadyToConnect,
        },
        isReadyToConnect
    );
    // initial load
    useEffect(() => {
        setChats(() => {
            if (!chatsData || !chatsData?.pages?.length) return [];
            return chatsData.pages.flatMap((page) => page.results || []);
        });
        if (!chatsData || !chatsData?.pages?.length) setIsInitialChatsSet(true);
    }, [chatsData]);

    return {
        chats,
        setChats,
        isFetching,
        isLoading: isFetching,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        error,
    };
};

export default useChats;
