import React, { useEffect } from 'react';
import ChatSidebar from './ui/ChatSidebar';
import ChatWindow from './ui/ChatWindow';
import useResponsive from '~/shared/utilities/useResponsive';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setShowSearch } from '~/store/fast-dowload/slice';
import { useContentViewport } from '~/shared/hooks/useContentViewport';

const Chat = () => {
    const { isMobile, isTablet } = useResponsive();
    const router = useRouter();
    const dispatch = useDispatch();
    const { containerHeight } = useContentViewport();
    const { chatId = null } = router.query;
    const setChatId = (chatId) => {
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

    const Sidebar = (
        <ChatSidebar
            chatId={chatId}
            setChatId={setChatId}
            containerHeight={containerHeight}
        />
    );
    const Window = (
        <ChatWindow
            key={chatId}
            chatId={chatId}
            goBack={clearChatId}
            containerHeight={containerHeight}
        />
    );

    return (
        <div>
            <div
                className="row h-100"
                style={{
                    position: 'relative',
                    maxWidth: '1370px',
                    margin: `${isSmallScreen ? 0 : '10px'} auto 0`,
                }}>
                {isSmallScreen ? (
                    <div className="col-12 p-0 h-100">
                        {!chatId ? Sidebar : Window}
                    </div>
                ) : (
                    <>
                        <div className="col-3 p-0">{Sidebar}</div>
                        <div
                            className="col-9 p-0"
                            style={{ position: 'relative' }}>
                            {Window}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Chat;
