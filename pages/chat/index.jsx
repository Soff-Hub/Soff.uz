import React from 'react';
import Chat from '~/components/freeleance/chat/Chat';
import PageContainer from '~/widgets/layouts/PageContainer';

const ChatPage = () => {
    return (
        <div
            style={{
                overflowY: 'scroll',
                WebkitOverflowScrolling: 'touch',
            }}>
            <PageContainer title="Chat" withFooter={false}>
                <Chat />
            </PageContainer>
        </div>
    );
};

export default ChatPage;
