import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useGetChats from './useGetChats';
import { useWebSocket } from '@shined/react-use';

const useChats = (search) => {
    const [chats, setChats] = useState([]);
    const { user } = useSelector(state => state.auth);
    const { data } = useGetChats(search);
    // initial load
    useEffect(() => {
        if (data) setChats(data);
    }, [data]);

    if (!user?.access) return;

    const ws = useWebSocket(`${process.env.NEXT_PUBLIC_WS_FREELEANCE_URL}?token=${user?.access}`, {
        heartbeat: true,
        reconnect: true,
        immediate: true,
        onMessage: (event) => {
            if (!event.data) return;
            let msg;
            try {
                msg = JSON.parse(event.data);
            } catch (e) {
                console.warn("⚠️ JSON emas data:", event.data);
                return;
            }
            // 🔥 chat update qilish
            // refetch()
            setChats(prev => {
                if (!Array.isArray(prev)) prev = [];

                const index = prev.findIndex(c => c.chat_id === msg.chat_id);

                if (index !== -1) {
                    // bor bo‘lsa – update qilamiz (listning boshiga olib chiqib qo‘yish ham mumkin)
                    const updated = [...prev];
                    updated.splice(index, 1);
                    return [msg, ...updated].filter(item => item.chat_id);
                } else {
                    // yo‘q bo‘lsa – qo‘shamiz
                    return [msg, ...prev];
                }
            });
        }
    })

    return {
        chats,
        setChats,
    };
};

export default useChats;
