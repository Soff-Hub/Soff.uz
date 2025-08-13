import React from 'react'
import styles from '../style/chat.module.scss'
import { Input } from 'antd'
import useGetChats from '../api/useGetChats'

const ChatSidebar = ({ setChatId }) => {
    const { data: chats } = useGetChats()
    return (
        <div className={styles.chat_sidebar}>
            <div className={styles.chat_search}>
                <Input.Search
                    placeholder='chatlarni qidirish'
                />
            </div>
            <div className={styles.sidebar_chats}>
                {chats?.map(chat => 
                    <div 
                        onClick={() => {
                            setChatId(chat?.chat_id) 
                        }} 
                        className={styles.sidebar_chat}>
                        <img src='/static/img/ozodbek.png' alt="user img" />
                        <div className={styles.sidebar_chat_wrapper}>
                            <div className={styles.box1}>
                                <h4>{chat?.opponent_name}</h4>
                                <span></span>
                            </div>
                            <div className={styles.box2}>
                                <p></p>
                                {/* <span></span> */}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChatSidebar