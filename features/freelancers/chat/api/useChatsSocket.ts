import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import useWebSocket from 'react-use-websocket';
import { useAppSelector } from '~/app/store/hooks';

const chatPath = '/chat';

type useChatsSocketProps = {
    isInitialChatsSet: boolean;
    setChats: Dispatch<SetStateAction<any[]>>;
};
export function useChatsSocket({
    isInitialChatsSet,
    setChats,
}: useChatsSocketProps) {
    const router = useRouter();
    const { user } = useAppSelector((state) => state.auth);
    const isReadyToConnect = Boolean(
        user?.access && isInitialChatsSet && router.pathname === chatPath
    );
    const baseWsUrl = isReadyToConnect
        ? `${process.env.NEXT_PUBLIC_WS_FREELEANCE_URL}chat/?token=${user?.access}`
        : null;

    return useWebSocket(
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
                    const chatsArray = Array.isArray(prev) ? prev : [];

                    const index = chatsArray.findIndex(
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
        },
        isReadyToConnect
    );
}
