import React from 'react'
import Chat from '~/components/freeleance/chat/Chat';
import PageContainer from '~/components/layouts/PageContainer'

const ChatPage = () => {
    return (
        <PageContainer>
            <div className='container' style={{ maxWidth: "1400px" }}>
                <Chat/>
            </div>
        </PageContainer>
    )
}

export default ChatPage