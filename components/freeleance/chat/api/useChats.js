import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useGetChats from './useGetChats';
import { setUnreadMessages } from '~/store/seller/slice';

const useChats = () => {
    const [chats, setChats] = useState([]);
    const { user } = useSelector(state => state.auth);
    const wsRef = useRef();
    const dispatch = useDispatch()
    const { data, refetch } = useGetChats();

    // initial load
    useEffect(() => {
        if (data) setChats(data);
    }, [data]);

    useEffect(() => {
        if (!user?.access) return;

        const ws = new WebSocket(
            `${process.env.NEXT_PUBLIC_WS_FREELEANCE_URL}?token=${user.access}`
        );
        wsRef.current = ws;


        ws.onmessage = (event) => {
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

            // dispatch(setUnreadMessages(chats.filter(item => item.type == 'chat_update').length || 0))
        };


        return () => ws.close();
    }, [user?.access]);

    return {
        chats,
        setChats,
        wsRef
    };
};

export default useChats;
