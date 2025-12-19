import React from 'react';
import Chat from '~/features/freelancers/chat/Chat';
import PageContainer from '~/widgets/layouts/PageContainer';

const ChatPage = () => {
    return (
        <div>
            <PageContainer title="Chat" withFooter={false}>
                <Chat />
            </PageContainer>
        </div>
    );
};

export default ChatPage;
