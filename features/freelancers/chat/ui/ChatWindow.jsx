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
    Alert,
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
import { FaHeadset } from 'react-icons/fa';
import useResponsive from '~/shared/utilities/useResponsive';
import OrderApproveFiles from '~/features/order-approve-files';

const { TextArea } = Input;
const maxSize = 50 * 1024 * 1024;

// const order = {
//     id: 3689,
//     created_at: '2025-12-23T09:59:32.899661+00:00',
//     order_type: 'custom_order',
//     user_id: 13070,
//     deadline_date: '2025-12-25T14:59:00',
//     title: "Taqdimot bo'yicha xizmat kerak.",
//     budget: 10000,
//     description:
//         'Exactly! You’ve nailed the core philosophy of FSD.\r\n\r\nIn FSD, Entities represent the "What" (the data/the object), and Features represent the "How" (the user actions/the business value).\r\n\r\nWhy Action Buttons belong in Features\r\nBusiness Logic: A "Cancel" button isn\'t just a UI element; it needs to call an API, show a loading spinner, handle success/error messages, and maybe refresh the order list. That is a Feature.\r\n\r\nReusability: You might want to use the OrderCard in a "Read-only" history list where buttons aren\'t allowed. By keeping the buttons out of the Entity, the OrderCard remains clean and reusable.\r\n\r\nIndependence: Features should be "plug-and-play." You should be able to remove the order-cancel folder, and the OrderCard entity should still work perfectly.',
//     language: 'uzb',
//     category: null,
//     service: null,
//     order_status_doing: {
//         status: 'order_file_sent',
//         order_accepted_date: '2025-12-23T09:59:50.465390+00:00',
//         reason: null,
//     },
//     user: {
//         id: 1,
//         full_name: "Abdumo'min Abdurasulov",
//         photo_url:
//             'https://d2co7bxjtnp5o.cloudfront.net/media/users/ChatGPT_Image_Jul_4_2025_09_40_35_PM_wRbcqfd.png',
//         last_active: '2025-12-24T18:50:46.037936+05:00',
//         soff_seller_id: 193695,
//     },
//     chat_id: null,
//     reason: [],
//     order_requirement: null,
//     feedback: null,
//     unread_messages_count: 0,
//     file: null,
//     files: [
//         {
//             url: 'https://freelance.soff.uz/media/order_files/yax2_funksiya.1_xCDbdWt.pptx',
//             size: null,
//             created_at: '2025-12-24T06:59:44.523422+00:00',
//             status: 'pending',
//         },
//         {
//             url: 'https://freelance.soff.uz/media/order_files/soff-story-summary-1765973816177_8OpXxcC.png',
//             size: null,
//             created_at: '2025-12-24T06:59:44.523422+00:00',
//             status: 'pending',
//         },
//     ],
//     offers_count: 0,
//     approved_transaction_amount: 10000,
//     offers: [],
// };
// const msg = {
//     order,
//     files: order.files,
//     chat_id: 5638,
//     opponent_id: 193695,
//     opponent_name: "Abdumo'min Abdurasulov",
//     opponent_photo_url:
//         'https://d2co7bxjtnp5o.cloudfront.net/media/users/ChatGPT_Image_Jul_4_2025_09_40_35_PM_wRbcqfd.png',
//     last_message: {
//         content: 'asdf',
//         created_at: '2025-12-24T13:48:51.528743+00:00',
//     },
//     created_at: '2025-12-24T13:48:51.528743+00:00',
//     unread_count: 0,
// };

const ChatWindow = ({
    chatId,
    goBack,
    containerHeight,
    isModerator = false,
    isDirector = false,
    hideCreateOrderButton = false,
}) => {
    const [edit, setEdit] = useState(null);
    const { user } = useSelector((state) => state.profile);
    const [openDownIcon, setOpenDownIcon] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [createOrderModalOpen, setCreateOrderModalOpen] = useState(false);
    const [res, setRes] = useState('');
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const dragCounterRef = useRef(0);
    const messagesContainerRef = useRef(null);
    const scrollPositionRef = useRef(0);
    const chatWindowRef = useRef(null);
    const router = useRouter();
    const { isDesktop } = useResponsive();

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

    const isBlocked = chat?.opponent?.is_blocked;

    const handleOpenDrawer = (order) => {
        setSelectedOrder(order);
    };

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
        if (disabled) return;
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
        if (disabled) return;
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (disabled) return;
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

    const handleNavigateSellerProfile = () => {
        if (isModerator) return;
        router.push(`/seller/${chat?.opponent?.id}`);
    };

    const handleCreateOrderClick = () => {
        if (isModerator || isDirector) {
            router.push('/order/create');
        } else {
            setCreateOrderModalOpen(true);
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
                    src={isModerator ? null : recipient?.photo_url}
                    icon={isModerator ? <FaHeadset /> : <FaRegUserCircle />}
                    onClick={handleNavigateSellerProfile}
                    style={{
                        cursor: 'pointer',
                        backgroundColor: isModerator ? '#1677ff' : undefined,
                        flexShrink: 0,
                    }}
                />
                <div className={styles.user_box}>
                    <div className={styles.user_names}>
                        <h4
                            onClick={handleNavigateSellerProfile}
                            style={{ cursor: 'pointer' }}>
                            {chat?.opponent?.name}
                        </h4>
                    </div>
                    <span>
                        {isModerator || isDirector
                            ? 'Online'
                            : chat?.opponent?.last_seen}
                    </span>
                </div>
                {!hideCreateOrderButton && (
                    <Button
                        type="primary"
                        disabled={isBlocked}
                        icon={<ShoppingCartOutlined />}
                        onClick={handleCreateOrderClick}
                        style={{ marginLeft: 'auto', flexShrink: 0 }}>
                        {isDesktop ? 'Buyurtma berish' : 'Buyurtma'}
                    </Button>
                )}
            </div>
            {isBlocked ? (
                <Alert
                    className={styles.alertMiddle}
                    message="Sotuvchi vaqtincha bloklangan"
                    description="Afsuski, ushbu frilanserning xizmatlari vaqtincha bloklangan. Iltimos, keyinroq qayta urinib ko'ring yoki boshqa frilanserni tanlang."
                    type="error"
                    showIcon
                />
            ) : (
                <SafetyAlert />
            )}
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
                                        handleOpenDrawer={handleOpenDrawer}
                                        setRes={setRes}
                                        setFeedbackOpen={setFeedbackOpen}
                                    />
                                )
                            )
                        ) : isDirector ? (
                            <DirectorEmptyState
                                name={
                                    chat?.opponent?.name ||
                                    'Zufarbek Abdurakhmonov'
                                }
                                photoUrl={
                                    chat?.opponent?.photo_url ||
                                    '/static/img/zufarbek.webp'
                                }
                            />
                        ) : isModerator ? (
                            <ModeratorEmptyState />
                        ) : (
                            <Empty
                                description="Hozircha xabarlar yo'q"
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                        )}
                        {/* <ChatMessage
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
                            handleOpenDrawer={handleOpenDrawer}
                            setRes={setRes}
                            setFeedbackOpen={setFeedbackOpen}
                        /> */}
                    </div>
                </InfiniteScroll>
            </div>
            <ChatInputParts
                isModerator={isModerator}
                isDirector={isDirector}
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
                disabled={isBlocked}
            />
            <CreateOrderModal
                open={createOrderModalOpen}
                onClose={() => setCreateOrderModalOpen(false)}
                id={chat?.opponent?.id}
                seller={chat?.opponent?.name}
                sellerInfo={chat?.opponent}
            />
            <OrderApproveFiles
                order={selectedOrder}
                res={res}
                setRes={setRes}
                feedbackOpen={feedbackOpen}
                setFeedbackOpen={setFeedbackOpen}
                onSuccess={() => {
                    queryClient.invalidateQueries({
                        queryKey: ['chat-messages', chatId],
                    });
                }}
            />
        </div>
    );
};

const InfiniteLoaderComponent = () => (
    <div className="d-flex justify-content-center align-items-center py-2">
        <ClipLoader color="#00A44F" size={20} />
    </div>
);

const DirectorEmptyState = ({ name, photoUrl }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                padding: '40px 20px',
            }}>
            {/* Profile Picture */}
            <Avatar
                size={120}
                src={photoUrl}
                style={{
                    marginBottom: '24px',
                }}
            />

            {/* Name */}
            <h3
                style={{
                    margin: '0 0 32px 0',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#222',
                    textAlign: 'center',
                }}>
                {name}
            </h3>

            {/* Message Card */}
            <div
                style={{
                    backgroundColor: '#e6f2ff',
                    borderRadius: '12px',
                    padding: '20px 24px',
                    maxWidth: '400px',
                    width: '100%',
                    textAlign: 'center',
                }}>
                <p
                    style={{
                        margin: '0 0 8px 0',
                        fontSize: '16px',
                        fontWeight: 500,
                        color: '#00a44f',
                    }}>
                    Assalomu alaykum
                </p>
                <p
                    style={{
                        margin: 0,
                        fontSize: '14px',
                        color: '#6c757d',
                        lineHeight: '1.5',
                    }}>
                    Takliflar va so'rovlar uchun xabar yuboring
                </p>
            </div>
        </div>
    );
};

const ModeratorEmptyState = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                padding: '40px 20px',
            }}>
            {/* Headphones Icon */}
            <div
                style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    backgroundColor: '#1677ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px',
                    border: '3px solid white',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}>
                <FaHeadset
                    style={{
                        fontSize: '60px',
                        color: 'white',
                    }}
                />
            </div>

            {/* Title */}
            <h3
                style={{
                    margin: '0 0 16px 0',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#222',
                    textAlign: 'center',
                }}>
                Support bilan suhbat
            </h3>

            {/* Message */}
            <p
                style={{
                    margin: 0,
                    fontSize: '14px',
                    color: '#666',
                    lineHeight: '1.6',
                    textAlign: 'center',
                    maxWidth: '400px',
                }}>
                Savol yoki muammolaringiz bo'yicha support xodimi sizga yordam
                berishga tayyor. Birinchi xabaringizni yuboring!
            </p>
        </div>
    );
};

const ChatInputParts = ({
    isModerator,
    isDirector,
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
    disabled,
}) => {
    const [newMessage, setNewMessage] = useState('');
    const [fileList, setFileList] = useState([]);
    const { startTimeout } = useTimeManager();
    const fileMapRef = useRef(new Map()); // Store actual files separately
    const queryClient = useQueryClient();
    const fileInputRef = useRef(null);

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
                <Tooltip title="Fayl yuborish">
                    <Button
                        icon={<PaperClipOutlined />}
                        type="primary"
                        shape="circle"
                        onClick={handleClickAttach}
                        disabled={disabled || edit != null}
                        loading={fileList?.[0]?.status == 'uploading'}
                    />
                </Tooltip>
                <TextArea
                    value={newMessage}
                    disabled={disabled || isMessageWithFilePending}
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
                    disabled={disabled || !canSubmit}
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
        </>
    );
};
export default memo(ChatWindow);
