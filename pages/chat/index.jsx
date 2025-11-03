import React from 'react';
import Chat from '~/components/freeleance/chat/Chat';
import PageContainer from '~/widgets/layouts/PageContainer';

const ChatPage = () => {
    return (
        <PageContainer title="Chat" withFooter={false}>
            <div
                className="container"
                style={{
                    maxWidth: '1370px',
                    marginTop: '10px',
                }}>
                <Chat />
            </div>
        </PageContainer>
    );
};

export default ChatPage;
