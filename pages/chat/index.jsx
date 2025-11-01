import React from 'react';
import Chat from '~/components/freeleance/chat/Chat';
import PageContainer from '~/widgets/layouts/PageContainer';

const ChatPage = () => {
    return (
        <PageContainer title="Chat">
            <div className="container">
                <Chat />
            </div>
        </PageContainer>
    );
};

export default ChatPage;
