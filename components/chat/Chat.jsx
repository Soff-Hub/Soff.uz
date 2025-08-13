import React, { useEffect, useState } from 'react'
import ChatSidebar from './ui/ChatSidebar'
import ChatWindow from './ui/ChatWindow'
import useResponsive from '~/utilities/useResponsive'
import { useRouter } from 'next/router'

const Chat = () => {
    const [chatId, setChatId] = useState(null)
    const { isMobile, isTablet } = useResponsive()
    const { query } = useRouter()


    useEffect(() => {
        if (query?.id) {
            setChatId(query.id)
        }
    }, [query?.id])

    const isSmallScreen = isMobile || isTablet

    return (
        <div className='row'>
            {!isSmallScreen && (
                <>
                    <div className='col-3 p-0'>
                        <ChatSidebar setChatId={setChatId} />
                    </div>
                    <div className='col-9 p-0'>
                        <ChatWindow  goBack={() => setChatId(null)} chatId={chatId} />
                    </div>
                </>
            )}

            {isSmallScreen && (
                <>
                    {!chatId && (
                        <div className='col-12 p-0 mt-5'>
                            <ChatSidebar setChatId={setChatId} />
                        </div>
                    )}
                    {chatId && (
                        <div className='col-12 p-0 mt-5'>
                            <ChatWindow chatId={chatId} goBack={() => setChatId(null)} />
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Chat
