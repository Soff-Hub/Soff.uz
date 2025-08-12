import React, { useState } from 'react'
import ChatSidebar from './ui/ChatSidebar'
import ChatWindow from './ui/ChatWindow'
import useResponsive from '~/utilities/useResponsive'

const Chat = () => {
    const [chatId, setChatId] = useState(null)
    const [ opponentId, setOpponentId ] = useState()
    const { isMobile, isTablet } = useResponsive()

    const isSmallScreen = isMobile || isTablet

    return (
        <div className='row'>
            {!isSmallScreen && (
                <>
                    <div className='col-3 p-0'>
                        <ChatSidebar setOpponentId={setOpponentId} setChatId={setChatId} />
                    </div>
                    <div className='col-9 p-0'>
                        <ChatWindow opponentId={opponentId} chatId={chatId} />
                    </div>
                </>
            )}

            {isSmallScreen && (
                <>
                    {!chatId && (
                        <div className='col-12 p-0 mt-5'>
                            <ChatSidebar setOpponentId={setOpponentId} setChatId={setChatId} />
                        </div>
                    )}
                    {chatId && (
                        <div className='col-12 p-0 mt-5'>
                            <ChatWindow opponentId={opponentId} chatId={chatId} goBack={() => setChatId(null)} />
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Chat
