import React, { useEffect, useState } from 'react';
import ChatSidebar from './ui/ChatSidebar';
import ChatWindow from './ui/ChatWindow';
import useResponsive from '~/utilities/useResponsive';
import { useRouter } from 'next/router';
import useGetChatById from './api/useGetChatById';

const Chat = () => {
    const [chatId, setChatId] = useState(null);
    const { isMobile, isTablet } = useResponsive();
    const { query } = useRouter();
    const { refetch } = useGetChatById(chatId);
    useEffect(() => {
        if (query?.chatId) {
            console.log(query);

            setChatId(query.chatId);
        }
    }, [query?.chatId]);

    useEffect(() => {
        if (chatId) {
            refetch();
        }
    }, [chatId]);

    const isSmallScreen = isMobile || isTablet;

    return (
        <div className="row mb-5">
            {!isSmallScreen && (
                <>
                    <div className="col-3 p-0">
                        <ChatSidebar setChatId={setChatId} chatId={chatId} />
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
    );
};

export default Chat;
