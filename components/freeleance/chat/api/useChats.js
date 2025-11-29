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
    const { data, isFetching, isFetched } = useGetChats(search);
    const wsRef = useRef(null);
    const isReadyToConnect = Boolean(
        user?.access && isInitialChatsSet && router.pathname === chatPath
    );
    const baseWsUrl = isReadyToConnect
        ? `${process.env.NEXT_PUBLIC_WS_FREELEANCE_URL}chat/?token=${user?.access}`
        : null;

    const { getWebSocket } = useWebSocket(
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
        if (isFetched && !isInitialChatsSet) {
            setChats(data);
            startTransition(() => {
                setIsInitialChatsSet(true);
            });
        }
        return () => {
            getWebSocket()?.close();
        };
    }, [data, isInitialChatsSet, isFetched]);

    useEffect(() => {
        return () => {
            getWebSocket()?.close();
        };
    }, [getWebSocket]);

    // useEffect(() => {
    //     if (!user?.access) return;

    //     const ws = new WebSocket(
    //         `${process.env.NEXT_PUBLIC_WS_FREELEANCE_URL}chat/?token=${user?.access}`
    //     );
    //     wsRef.current = ws;

    //     // ws.onopen = () => {
    //     //     sendUnreadMessages(ws, messages);
    //     // };

    //     ws.onmessage = (event) => {
    //         if (!event.data) return;
    //         let msg;
    //         try {
    //             msg = JSON.parse(event.data);
    //         } catch (e) {
    //             console.warn('⚠️ JSON emas data:', event.data);
    //             return;
    //         }
    //         console.log('🟢 New chat message received via WebSocket:', msg);
    //         setChats((prev) => {
    //             if (!Array.isArray(prev)) prev = [];

    //             const index = prev.findIndex((c) => c.chat_id === msg.chat_id);

    //             if (index !== -1) {
    //                 // bor bo‘lsa – update qilamiz (listning boshiga olib chiqib qo‘yish ham mumkin)
    //                 const updated = [...prev];
    //                 updated.splice(index, 1);
    //                 return [msg, ...updated].filter((item) => item.chat_id);
    //             } else {
    //                 // yo‘q bo‘lsa – qo‘shamiz
    //                 return [msg, ...prev];
    //             }
    //         });
    //     };

    //     return () => ws.close();
    // }, [user?.access]);

    return {
        chats,
        setChats,
        isFetching,
        isLoading: isFetching,
    };
};

export default useChats;
