import React, { useState, useRef, useEffect, memo } from 'react';
import styles from '../style/chat.module.scss';
import {
    Input,
    Button,
    Avatar,
    Empty,
    message,
    Tooltip,
    Upload,
    Spin,
    Card,
} from 'antd';
import {
    ArrowDownOutlined,
    ArrowLeftOutlined,
    PaperClipOutlined,
    SendOutlined,
    ShoppingCartOutlined,
    CloudUploadOutlined,
} from '@ant-design/icons';
import ChatMessage from './ChatMessage';
import { useRouter } from 'next/router';
import useChat from '../api/useChat';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ClipLoader } from 'react-spinners';
import { useQueryClient } from '@tanstack/react-query';
import CreateOrderModal from '~/shared/components/modals/CreateOrderModal';
import SafetyAlert from './SafetyAlert';
import { useTimeManager } from '~/shared/hooks/useTimeManager';
import { FaRegUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import ChatDateSeperator from './ChatDateSeperator';

const { TextArea } = Input;
const maxSize = 50 * 1024 * 1024;

const ChatWindow = ({ chatId, goBack, containerHeight }) => {
    const [edit, setEdit] = useState(null);
    const { user } = useSelector((state) => state.profile);
    const [openDownIcon, setOpenDownIcon] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const dragCounterRef = useRef(0);
    const messagesContainerRef = useRef(null);
    const scrollPositionRef = useRef(0);
    const chatWindowRef = useRef(null);
    const router = useRouter();

    const {
        messages,
        chat,
        sendMessage,
        sendMessageWithFile,
        updateMessage,
        deleteMessage,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isMessageWithFilePending,
        wsRef,
    } = useChat(chatId);
    const recipient = chat?.opponent;
    const queryClient = useQueryClient();

    // Handle paste image
    useEffect(() => {
        const handlePaste = async (e) => {
            if (!chatId || edit) return;

            const items = e.clipboardData?.items;
            if (!items) return;

            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.type.indexOf('image') !== -1) {
                    e.preventDefault();
                    const file = item.getAsFile();
                    if (file) {
                        // Check file size
                        if (file.size > maxSize) {
                            message.error(
                                'Fayl hajmi 50MB dan oshmasligi kerak'
                            );
                            return;
                        }

                        // Upload the pasted image
                        sendMessageWithFile(
                            {
                                chat_id: chatId,
                                file: file,
                                content: '',
                            },
                            {
                                onSuccess: () => {
                                    queryClient.invalidateQueries({
                                        queryKey: ['chat-messages', chatId],
                                    });
                                    message.success(
                                        'Rasm muvaffaqiyatli yuborildi'
                                    );
                                },
                                onError: (err) => {
                                    message.error(
                                        err?.response?.data?.detail ||
                                            'Rasmni yuborishda xatolik yuz berdi'
                                    );
                                },
                            }
                        );
                    }
                    break;
                }
            }
        };

        document.addEventListener('paste', handlePaste);
        return () => {
            document.removeEventListener('paste', handlePaste);
        };
    }, [chatId, edit, sendMessageWithFile, queryClient]);

    // Handle drag and drop
    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounterRef.current++;
        if (e.dataTransfer.types.includes('Files')) {
            setIsDragging(true);
        }
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounterRef.current--;
        // Only hide if we've left all nested elements
        if (dragCounterRef.current === 0) {
            setIsDragging(false);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounterRef.current = 0;
        setIsDragging(false);

        if (!chatId || edit) return;

        const files = Array.from(e.dataTransfer.files);
        const imageFile = files.find((file) => file.type.startsWith('image/'));

        if (imageFile) {
            // Check file size
            if (imageFile.size > maxSize) {
                message.error('Fayl hajmi 50MB dan oshmasligi kerak');
                return;
            }

            // Upload the dropped image
            sendMessageWithFile(
                {
                    chat_id: chatId,
                    file: imageFile,
                    content: '',
                },
                {
                    onSuccess: () => {
                        queryClient.invalidateQueries({
                            queryKey: ['chat-messages', chatId],
                        });
                        message.success('Rasm muvaffaqiyatli yuborildi');
                    },
                    onError: (err) => {
                        message.error(
                            err?.response?.data?.detail ||
                                'Rasmni yuborishda xatolik yuz berdi'
                        );
                    },
                }
            );
        } else if (files.length > 0) {
            message.warning('Faqat rasm fayllari qo‘llab-quvvatlanadi');
        }
    };

    const handleFetchNext = async () => {
        if (!messagesContainerRef.current) return;

        const el = messagesContainerRef.current;

        const scrollFromBottom =
            el.scrollHeight - el.scrollTop - el.clientHeight;

        await fetchNextPage();

        if (messagesContainerRef.current) {
            const newScrollTop =
                el.scrollHeight - el.clientHeight - scrollFromBottom;
            el.scrollTop = newScrollTop;
        }
    };

    const handlScroll = () => {
        if (
            messagesContainerRef.current &&
            messagesContainerRef.current.scrollTop < -500
        ) {
            setOpenDownIcon(true);
        } else {
            setOpenDownIcon(false);
        }
    };

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
        <div
            ref={chatWindowRef}
            className={styles.chat_window}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
                position: 'relative',
                height: containerHeight ? `${containerHeight}px` : '100%',
            }}>
            {/* Drag and Drop Overlay */}
            {isDragging && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none',
                    }}>
                    <Card
                        style={{
                            backgroundColor: 'white',
                            padding: '40px 60px',
                            borderRadius: '12px',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                            textAlign: 'center',
                        }}>
                        <CloudUploadOutlined
                            style={{
                                fontSize: '64px',
                                color: '#1890ff',
                                marginBottom: '16px',
                            }}
                        />
                        <h3 style={{ margin: 0, color: '#1890ff' }}>
                            Rasmni yuklash
                        </h3>
                        <p style={{ margin: '8px 0 0 0', color: '#666' }}>
                            Rasmni bu yerga tashlang
                        </p>
                    </Card>
                </div>
            )}
            <div className={styles.chat_user}>
                {goBack && (
                    <ArrowLeftOutlined
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            goBack();
                            wsRef.current.close();
                        }}
                    />
                )}
                <Avatar
                    size={50}
                    src={recipient?.photo_url}
                    icon={<FaRegUserCircle />}
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
            <SafetyAlert />

            <div
                onScroll={handlScroll}
                ref={messagesContainerRef}
                id="scrollableDiv"
                style={{
                    width: '100%',
                    height: `100%`,
                    overflowY: 'scroll',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    margin: 'auto',
                    overflowX: 'hidden',
                    position: 'relative',
                }}
                className={`${styles.chat_messages} p-3`}>
                <InfiniteScroll
                    dataLength={messages.length}
                    next={handleFetchNext}
                    hasMore={hasNextPage}
                    loader={<InfiniteLoaderComponent />}
                    style={{
                        display: 'flex',
                        flexDirection: 'column-reverse',
                        overflow: 'visible',
                        position: 'relative',
                    }}
                    scrollableTarget="scrollableDiv"
                    inverse={true}>
                    <div>
                        {isFetching ? (
                            <div
                                style={{
                                    height: '30vh',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Spin />
                            </div>
                        ) : messages?.length ? (
                            messages.map((msg) =>
                                msg.type === 'date-separator' ? (
                                    <ChatDateSeperator
                                        chatDate={msg}
                                        key={msg.id}
                                    />
                                ) : (
                                    <ChatMessage
                                        pushUser={() =>
                                            router.push(
                                                `seller/${chat?.chat?.opponent?.id}`
                                            )
                                        }
                                        key={msg.id}
                                        recipientImg={recipient?.photo_url}
                                        myImg={user?.image}
                                        msg={msg}
                                        onEdit={setEdit}
                                        onDelete={deleteMessage}
                                    />
                                )
                            )
                        ) : (
                            <Empty
                                description="Hozircha xabarlar yo'q"
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                        )}
                    </div>
                </InfiniteScroll>
            </div>
            <ChatInputParts
                edit={edit}
                chatId={chatId}
                chat={chat}
                sendMessage={sendMessage}
                sendMessageWithFile={sendMessageWithFile}
                updateMessage={updateMessage}
                setEdit={setEdit}
                isFetching={isFetching}
                isMessageWithFilePending={isMessageWithFilePending}
                messagesContainerRef={messagesContainerRef}
                scrollPositionRef={scrollPositionRef}
                openDownIcon={openDownIcon}
            />
        </div>
    );
};

const InfiniteLoaderComponent = () => (
    <div className="d-flex justify-content-center align-items-center py-2">
        <ClipLoader color="#00A44F" size={20} />
    </div>
);

const ChatInputParts = ({
    edit,
    chat,
    chatId,
    messagesContainerRef,
    openDownIcon,
    sendMessage,
    sendMessageWithFile,
    isMessageWithFilePending,
    updateMessage,
    setEdit,
}) => {
    const [newMessage, setNewMessage] = useState('');
    const [fileList, setFileList] = useState([]);
    const { startTimeout } = useTimeManager();
    const fileMapRef = useRef(new Map()); // Store actual files separately
    const queryClient = useQueryClient();
    const fileInputRef = useRef(null);
    const [open, setOpen] = useState(false);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            const container = messagesContainerRef.current;
            container.scrollTop =
                container.scrollHeight - container.clientHeight;
        }
    };

    const handleClickAttach = () => {
        if (fileInputRef.current) fileInputRef.current?.click();
    };

    const clearStates = () => {
        setFileList([]);
        fileMapRef.current.clear();
        setNewMessage('');
    };

    const handleSend = () => {
        const trimmedMessage = newMessage.trim();

        if (fileList.length) {
            const file = fileMapRef.current.get(fileList[0].uid);

            sendMessageWithFile(
                {
                    chat_id: chatId,
                    file: file,
                    content: trimmedMessage,
                },
                {
                    onSuccess: () => {
                        queryClient.invalidateQueries({
                            queryKey: ['chat-messages', chatId],
                        });
                        startTimeout(scrollToBottom, 100);
                        message.success('Fayl muvaffaqiyatli yuborildi');
                    },
                    onError: (err) => {
                        message.error(
                            err?.response?.data?.detail ||
                                'Faylni yuborishda xatolik yuz berdi'
                        );
                    },
                }
            );
            clearStates();
            return;
        }

        if (!trimmedMessage) return;

        if (edit) {
            updateMessage(newMessage, edit.id);
            setEdit(null);
        } else {
            sendMessage(newMessage);
            startTimeout(scrollToBottom, 100);
        }

        clearStates();
    };

    const customRequest = ({ file, onSuccess, onProgress }) => {
        const uid = file.uid;
        setFileList([
            {
                uid: uid,
                name: file.name,
                status: 'uploading',
                percent: 0,
                size: file.size,
            },
        ]);

        // Defer file storage to avoid blocking
        requestIdleCallback(
            () => {
                fileMapRef.current.set(uid, file);
                simulateUpload(uid, onSuccess, onProgress);
            },
            { timeout: 100 }
        );
    };

    const simulateUpload = (uid, onSuccess, onProgress) => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;

            onProgress({ percent: progress });

            setFileList((prev) =>
                prev.map((f) =>
                    f.uid === uid
                        ? {
                              ...f,
                              percent: progress,
                              status: progress >= 100 ? 'done' : 'uploading',
                          }
                        : f
                )
            );

            if (progress >= 100) {
                clearInterval(interval);
                onSuccess('ok');
            }
        }, 150);
    };

    const handleRemove = (file) => {
        setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
        fileMapRef.current.delete(file.uid);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    useEffect(() => {
        if (edit) {
            setNewMessage(edit.content);
        }
    }, [edit]);

    const canSubmit = edit
        ? newMessage.trim() !== edit.content && newMessage.trim() !== ''
        : (fileList.length && fileList[0]?.status === 'done') ||
          newMessage.trim() !== '';

    return (
        <>
            <span
                onClick={scrollToBottom}
                className={styles.chat_down_icon}
                style={{
                    transform: openDownIcon
                        ? 'translateX(0)'
                        : 'translateX(100px)',
                }}>
                <ArrowDownOutlined size={20} />
            </span>

            <Upload
                listType="picture"
                customRequest={customRequest}
                fileList={fileList}
                onRemove={handleRemove}
                multiple={false}
                maxCount={1}
                showUploadList={{
                    showPreviewIcon: false,
                    showDownloadIcon: false,
                }}
                beforeUpload={(file) => {
                    if (file.size > maxSize) {
                        message.error('Fayl hajmi 50MB dan oshmasligi kerak');
                        return Upload.LIST_IGNORE;
                    }
                    return true;
                }}
                className={`chat-file-uploader ${
                    fileList.length ? 'has-files' : 'no-files'
                }`}>
                <Button
                    type="primary"
                    icon={'🌛'}
                    ref={fileInputRef}
                    style={{
                        display: 'none',
                    }}>
                    Upload
                </Button>
            </Upload>

            <div className={styles.chat_input_box}>
                <Tooltip title="Maxsus buyurtma berish">
                    <Button
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                        iconPosition="end"
                        onClick={() => setOpen(true)}
                    />
                </Tooltip>
                <Tooltip title="Fayl yuborish">
                    <Button
                        icon={<PaperClipOutlined />}
                        type="primary"
                        shape="circle"
                        onClick={handleClickAttach}
                        disabled={edit != null}
                        loading={fileList?.[0]?.status == 'uploading'}
                    />
                </Tooltip>

                <TextArea
                    value={newMessage}
                    disabled={isMessageWithFilePending}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    autoSize={{ minRows: 1, maxRows: 6 }}
                    placeholder={
                        edit ? 'Xabarni tahrir qilyapsiz...' : 'Xabar yozing...'
                    }
                    className={styles.chat_input}
                />
                <Button
                    type="primary"
                    disabled={!canSubmit}
                    onClick={handleSend}>
                    {fileList?.[0]?.status == 'uploading' ? (
                        <Spin
                            percent={fileList?.[0]?.percent || 0}
                            className="chat-file-upload-indicator"
                        />
                    ) : (
                        <SendOutlined style={{ fontSize: '20px' }} />
                    )}
                </Button>
            </div>
            <CreateOrderModal
                open={open}
                onClose={() => setOpen(false)}
                id={chat?.opponent?.id}
                seller={chat?.opponent?.name}
                sellerInfo={chat?.opponent}
            />
        </>
    );
};
export default memo(ChatWindow);
