import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useGetChats from './useGetChats';

const useChats = (search) => {
    const [chats, setChats] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const { data, isLoading } = useGetChats(search);
    const wsRef = useRef();
    // initial load
    useEffect(() => {
        if (data) setChats(data);
    }, [data]);

    useEffect(() => {
        if (!user?.access) return;

        const ws = new WebSocket(
            `${process.env.NEXT_PUBLIC_WS_FREELEANCE_URL}chat/?token=${user?.access}`
        );
        wsRef.current = ws;

        // ws.onopen = () => {
        //     sendUnreadMessages(ws, messages);
        // };

        ws.onmessage = (event) => {
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

                const index = prev.findIndex((c) => c.chat_id === msg.chat_id);

                if (index !== -1) {
                    // bor bo‘lsa – update qilamiz (listning boshiga olib chiqib qo‘yish ham mumkin)
                    const updated = [...prev];
                    updated.splice(index, 1);
                    return [msg, ...updated].filter((item) => item.chat_id);
                } else {
                    // yo‘q bo‘lsa – qo‘shamiz
                    return [msg, ...prev];
                }
            });
        };

        return () => ws.close();
    }, [user?.access]);

    return {
        chats,
        setChats,
        isLoading,
    };
};

export default useChats;
