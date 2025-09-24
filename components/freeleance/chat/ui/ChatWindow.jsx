import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from '../style/chat.module.scss';
import { Input, Button, Avatar, Empty, message } from 'antd';
import { ArrowDownOutlined, ArrowLeftOutlined, PaperClipOutlined, SendOutlined } from '@ant-design/icons';
import ChatMessage from './ChatMessage';
import { useRouter } from 'next/router';
import useChat from '../api/useChat';
import InfiniteScroll from "react-infinite-scroll-component";
import { ClipLoader } from 'react-spinners';
import useSendMessage from '../api/useSendMessage';
import { useQueryClient } from '@tanstack/react-query';

const ChatWindow = ({ chatId, goBack }) => {
    const [newMessage, setNewMessage] = useState('');
    const [edit, setEdit] = useState(null);
    const [openDownIcon, setOpenDownIcon] = useState(false);
    const messagesContainerRef = useRef(null);
    const router = useRouter();
    const [file, setFile] = useState();
    const queryClient = useQueryClient();
    const { mutate: sendFile, isPending } = useSendMessage()
    const fileInputRef = useRef(null);


    const handleClickAttach = () => {
        fileInputRef.current?.click();
    };

    const handleSendFile = useCallback((selectedFile) => {
        if (!selectedFile) return;
        sendFile({ chat_id: chatId, file: selectedFile }, {
            onSuccess: () => {
                setFile(null);
                queryClient.invalidateQueries(['chat-messages', chatId]);
                scrollToBottom();
                message.success('Fayl muvaffaqiyatli yuborildi');
            }
        });
    }, [chatId, sendFile, queryClient]);

    const { messages, chat, sendMessage, updateMessage, fetchNextPage, hasNextPage } = useChat(chatId);


    const scrollToBottom = useCallback(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }
    }, []);

    const handlScroll = () => {

        if (messagesContainerRef.current.scrollTop < -500) {
            setOpenDownIcon(true);
        } else {
            setOpenDownIcon(false);
        }
    };

    // edit qilishda
    useEffect(() => {
        if (edit) {
            setNewMessage(edit.content);
        }
    }, [edit]);

    useEffect(() => {
        scrollToBottom();
    }, [messages.length]);

    const handleSend = useCallback(() => {

        if (!newMessage.trim()) return;

        if (edit) {
            updateMessage(newMessage, edit.id);
            setEdit(null);
        } else {
            // scrollToBottom();
            sendMessage(newMessage);
        }
        setNewMessage('');
    }, [newMessage, edit, sendMessage, updateMessage]);

    if (!chatId) {
        return (
            <div
                className={`${styles.chat_window} d-flex align-items-center justify-content-center`}>
                <Empty
                    description="Chatni tanlang"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
            </div>
        );
    }




    return (
        <div className={styles.chat_window}>
            {/* header */}
            <div className={styles.chat_user}>
                {goBack && (
                    <ArrowLeftOutlined
                        style={{ cursor: 'pointer' }}
                        onClick={goBack}
                    />
                )}
                <Avatar
                    size={50}
                    src={
                        <img
                            src={
                                chat?.opponent?.photo_url ||
                                '/static/img/ozodbek.png'
                            }
                            alt="user img"
                        />
                    }
                    onClick={() => router.push(`seller/${chat?.opponent?.id}`)}
                    style={{ cursor: 'pointer' }}
                />
                <div className={styles.user_box}>
                    <div className={styles.user_names}>
                        <h4
                            onClick={() =>
                                router.push(`seller/${chat?.opponent?.id}`)
                            }
                            style={{ cursor: 'pointer' }}>
                            {chat?.opponent?.name}
                        </h4>
                    </div>
                    <span>{chat?.opponent?.last_seen}</span>
                </div>
            </div>

            <div onScroll={handlScroll} ref={messagesContainerRef} id="scrollableDiv" style={{ width: "100%", height: "100vh", overflowY: "scroll", display: "flex", flexDirection: "column-reverse", margin: "auto", overflowX: "hidden", position: "relative" }} className={`${styles.chat_messages}  p-3`}>

                <InfiniteScroll
                    dataLength={messages.length}
                    next={fetchNextPage}
                    hasMore={hasNextPage}
                    loader={<div className="d-flex justify-content-center align-items-center py-2">
                        <ClipLoader color='#00A44F' size={20} />
                    </div>}
                    style={{ display: "flex", flexDirection: "column-reverse", overflow: "visible" }}
                    scrollableTarget="scrollableDiv"
                    inverse={true}

                >
                    <div>
                        {messages?.length > 0 ? (
                            messages.map(msg => (
                                <ChatMessage
                                    pushUser={() =>
                                        router.push(
                                            `seller/${chat?.chat?.opponent?.id}`
                                        )
                                    }
                                    key={msg.id}
                                    msg={msg}
                                    onEdit={setEdit}
                                />
                            ))
                        ) : (
                            <Empty
                                description="Hozircha xabarlar yo'q"
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                        )}
                    </div>
                </InfiniteScroll>
            </div>
            <span onClick={scrollToBottom} className={styles.chat_down_icon} style={{ transform: openDownIcon ? 'translateX(0)' : 'translateX(100px)' }}>
                <ArrowDownOutlined size={20} />
            </span>

            {/* input */}
            <div className={styles.chat_input_box}>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={e => {
                        const selectedFile = e.target.files[0];
                        if (selectedFile) {
                            setFile(selectedFile);
                            handleSendFile(selectedFile); // ✅ tanlagan zahoti yuboradi
                        }
                    }}
                    style={{ display: "none" }}
                />


                <Button
                    icon={<PaperClipOutlined />}
                    type="primary"
                    shape="circle"
                    style={{ background: "#00a44f" }}
                    onClick={handleClickAttach}
                    loading={isPending}
                />

                <Input
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    onPressEnter={handleSend}
                    placeholder={
                        edit ? 'Xabarni tahrir qilyapsiz...' : 'Xabar yozing...'
                    }
                    className={styles.chat_input}
                />
                <Button
                    style={{ background: edit ? '#f59e0b' : '#00A44F' }}
                    type="primary"
                    onClick={file ? handleSendFile : handleSend}>
                    <SendOutlined style={{ fontSize: '20px' }} />
                </Button>
            </div>
        </div>
    );
};

export default ChatWindow;

// 