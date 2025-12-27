import React, { useEffect } from 'react';
import ChatSidebar from './ui/ChatSidebar';
import ChatWindow from './ui/ChatWindow';
import useResponsive from '~/shared/utilities/useResponsive';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setShowSearch } from '~/store/fast-dowload/slice';
import { useContentViewport } from '~/shared/hooks/useContentViewport';
import { MODERATOR_ID } from '~/shared/constants';
import { Col, Row } from 'antd';

const STATIC_OPPONENT_ID = 30;

const Chat = () => {
    const { isMobile, isTablet } = useResponsive();
    const router = useRouter();
    const dispatch = useDispatch();
    const { containerHeight } = useContentViewport();
    const { chatId, opponent_id } = router.query;

    const setChat = (chat) => {
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                chatId: chat.chat_id,
                opponent_id: chat.opponent_id,
            },
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
    const isModerator = MODERATOR_ID == opponent_id;
    const isDirector = STATIC_OPPONENT_ID == opponent_id;

    const Sidebar = (
        <ChatSidebar
            chatId={chatId}
            setChat={setChat}
            containerHeight={containerHeight}
        />
    );

    const Window = (
        <ChatWindow
            isModerator={isModerator}
            isDirector={isDirector}
            key={chatId}
            chatId={chatId}
            goBack={clearChatId}
            containerHeight={containerHeight}
        />
    );

    return (
        <div
            style={{
                position: 'relative',
                height: '100%',
                maxWidth: '1370px',
                margin: `${isSmallScreen ? 0 : '10px'} auto 0`,
            }}>
            {isSmallScreen ? (
                <Row>
                    <Col span={24}>{!chatId ? Sidebar : Window}</Col>
                </Row>
            ) : (
                <Row>
                    <Col span={6}>{Sidebar}</Col>
                    <Col span={18} style={{ position: 'relative' }}>
                        {Window}
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default Chat;
