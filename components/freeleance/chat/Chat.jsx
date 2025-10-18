import React, { useEffect, useState } from 'react';
import ChatSidebar from './ui/ChatSidebar';
import ChatWindow from './ui/ChatWindow';
import useResponsive from '~/shared/utilities/useResponsive';
import { useRouter } from 'next/router';
import useGetChatById from './api/useGetChatById';
import { useDispatch } from 'react-redux';
import { setShowSearch } from '~/store/fast-dowload/slice';

const Chat = () => {
    const [chatId, setChatId] = useState(null);
    const { isMobile, isTablet } = useResponsive();
    const router = useRouter();
    const { query } = router;
    const { refetch } = useGetChatById(chatId);
    const dispatch = useDispatch();
    useEffect(() => {
        if (query?.chatId) {
            setChatId(query.chatId);
        }
    }, [query?.chatId]);

    useEffect(() => {
        if (chatId) {
            refetch();
        }
    }, [chatId]);

    useEffect(() => {
        dispatch(setShowSearch(false));

        return () => {
            dispatch(setShowSearch(true));
        };
    }, [dispatch]);

    const isSmallScreen = isMobile || isTablet;

    return (
        <div className="my-2">
            <div className="row">
                {!isSmallScreen && (
                    <>
                        <div className="col-3 p-0">
                            <ChatSidebar
                                setChatId={setChatId}
                                chatId={chatId}
                            />
                        </div>
                        <div className="col-9 p-0">
                            <ChatWindow
                                goBack={() => setChatId(null)}
                                chatId={chatId}
                            />
                        </div>
                    </>
                )}

                {isSmallScreen && (
                    <>
                        {!chatId && (
                            <div className="col-12 p-0 mt-2 mt-lg-5">
                                <ChatSidebar setChatId={setChatId} />
                            </div>
                        )}
                        {chatId && (
                            <div className="col-12 p-0 mt-2 mt-lg-5">
                                <ChatWindow
                                    chatId={chatId}
                                    goBack={() => setChatId(null)}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Chat;
