import React, { useEffect } from 'react';
import ChatSidebar from './ui/ChatSidebar';
import ChatWindow from './ui/ChatWindow';
import useResponsive from '~/shared/utilities/useResponsive';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setShowSearch } from '~/store/fast-dowload/slice';

const Chat = () => {
    const { isMobile, isTablet } = useResponsive();
    const router = useRouter();
    const { chatId = null } = router.query;
    const dispatch = useDispatch();

    const setChatId = chatId => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, chatId },
        });
    };

    const clearChatId = () => {
        const { chatId, ...restQuery } = router.query;
        router.push({
            pathname: router.pathname,
            query: { ...restQuery },
        });
    };

    useEffect(() => {
        dispatch(setShowSearch(false));

        return () => {
            dispatch(setShowSearch(true));
        };
    }, [dispatch]);

    const isSmallScreen = isMobile || isTablet;

    const Sidebar = <ChatSidebar setChatId={setChatId} chatId={chatId} />;
    const Window = <ChatWindow chatId={chatId} goBack={clearChatId} />;

    return (
        <div className="my-2">
            <div className="row">
                {isSmallScreen ? (
                    <div className="col-12 p-0 mt-2 mt-lg-5">
                        {!chatId ? Sidebar : Window}
                    </div>
                ) : (
                    <>
                        <div className="col-3 p-0">{Sidebar}</div>
                        <div className="col-9 p-0">{Window}</div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Chat;
