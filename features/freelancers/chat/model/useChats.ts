import { useEffect, useState } from 'react';
import { useGetChats } from '../api/useGetChats';
import { useChatsSocket } from '../api/useChatsSocket';

const useChats = (search: string) => {
    const [chats, setChats] = useState<any[]>([]);
    const [isInitialChatsSet, setIsInitialChatsSet] = useState(false);
    const {
        data: chatsData,
        isFetching,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        error,
    } = useGetChats(search);

    useChatsSocket({ isInitialChatsSet, setChats });

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
