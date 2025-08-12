import React, { useState } from 'react'
import ChatSidebar from './ui/ChatSidebar'
import ChatWindow from './ui/ChatWindow'
import useResponsive from '~/utilities/useResponsive'

const Chat = () => {
    const [chatId, setChatId] = useState(null)
    const { isMobile, isTablet } = useResponsive()

    const isSmallScreen = isMobile || isTablet

    return (
        <div className='row'>
            {/* Agar ekran katta bo‘lsa, har ikkisi yonma-yon */}
            {!isSmallScreen && (
                <>
                    <div className='col-3 p-0'>
                        <ChatSidebar setChatId={setChatId} />
                    </div>
                    <div className='col-9 p-0'>
                        <ChatWindow chatId={chatId} />
                    </div>
                </>
            )}

            {/* Agar kichik ekran bo‘lsa */}
            {isSmallScreen && (
                <>
                    {!chatId && (
                        <div className='col-12 p-0'>
                            <ChatSidebar setChatId={setChatId} />
                        </div>
                    )}
                    {chatId && (
                        <div className='col-12 p-0'>
                            <ChatWindow chatId={chatId} goBack={() => setChatId(null)} />
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Chat
