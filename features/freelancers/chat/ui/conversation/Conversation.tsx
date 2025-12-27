import React, { createContext, useContext, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import useChat from '../../api/useChat';
import {
    FetchNextPageOptions,
    InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import useDropzone from '../../model/useDropzone';
import { MAX_SIZE } from '../../constants/file-size';
import { WebSocketLike } from 'react-use-websocket/dist/lib/types';
import styles from '../../style/chat.module.scss';
import { Empty } from 'antd';
// Compound component parts
import DropOverlay from './ChatDropOverlay';
import Header from './ChatHeader';
import Messages from './ChatMessages';
import Input from './ChatInput';
import Modals from './ChatModals';
import { useContentViewport } from '~/shared/hooks/useContentViewport';

type ConversationProps = {
    chatId: string;
    goBack: () => void;
    isModerator: boolean;
    isDirector: boolean;
    hideCreateOrderButton: boolean;
    children?: React.ReactNode;
};

type ConversationContextType = {
    chatId: string;
    goBack: () => void;
    isModerator: boolean;
    isDirector: boolean;
    hideCreateOrderButton: boolean;
    edit: any;
    setEdit: React.Dispatch<React.SetStateAction<any>>;
    openDownIcon: boolean;
    setOpenDownIcon: React.Dispatch<React.SetStateAction<boolean>>;
    createOrderModalOpen: boolean;
    setCreateOrderModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    res: string;
    setRes: React.Dispatch<React.SetStateAction<string>>;
    feedbackOpen: boolean;
    setFeedbackOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedOrder: null;
    messagesContainerRef: React.RefObject<HTMLDivElement>;
    chatWindowRef: React.MutableRefObject<null>;
    scrollPositionRef: React.MutableRefObject<number>;
    chat: any;
    messages: any[];
    sendMessage: (content: any) => Promise<void>;
    sendMessageWithFile: (data: any, options: any) => Promise<void>;
    updateMessage: (content: any, message_id: any) => Promise<void>;
    deleteMessage: (message_id: any, message_status: any) => Promise<void>;
    fetchNextPage: (
        options?: FetchNextPageOptions
    ) => Promise<InfiniteQueryObserverResult<any, unknown>>;
    hasNextPage: boolean | undefined;
    isFetching: boolean;
    isMessageWithFilePending: boolean;
    wsRef: {
        current: WebSocketLike | null;
    };
    droppedFile: File | null;
    setDroppedFile: React.Dispatch<React.SetStateAction<File | null>>;
    isDragging: boolean;
    handleDragEnter: (e: React.DragEvent) => void;
    handleDragLeave: (e: React.DragEvent) => void;
    handleDragOver: (e: React.DragEvent) => void;
    handleDrop: (e: React.DragEvent) => Promise<void>;
    handleOpenDrawer: (order: any) => void;
    handleFetchNext: () => Promise<void>;
    handlScroll: () => void;
    handleNavigateSellerProfile: () => void;
    handleCreateOrderClick: () => void;
};

const ConversationContext = createContext<ConversationContextType | null>(null);
export const useConversation = () => {
    const context = useContext(ConversationContext);
    if (!context)
        throw new Error('useConversation must be used within Conversation');
    return context;
};

function Conversation({
    chatId,
    goBack,
    isModerator = false,
    isDirector = false,
    hideCreateOrderButton = false,
    children,
}: ConversationProps) {
    const router = useRouter();
    const { containerHeight } = useContentViewport();
    const [edit, setEdit] = useState(null);
    const [openDownIcon, setOpenDownIcon] = useState(false);
    const [createOrderModalOpen, setCreateOrderModalOpen] = useState(false);
    const [res, setRes] = useState('');
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const scrollPositionRef = useRef(0);
    const chatWindowRef = useRef(null);
    const {
        chat,
        messages,
        sendMessage,
        sendMessageWithFile,
        updateMessage,
        deleteMessage,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isMessageWithFilePending,
        wsRef,
    } = useChat(chatId) as any;
    const [droppedFile, setDroppedFile] = useState<File | null>(null);
    const isBlocked = chat?.opponent?.is_blocked;

    const {
        isDragging,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
    } = useDropzone({
        chatId,
        edit,
        maxSize: MAX_SIZE,
        isBlocked,
        onFileReceived: setDroppedFile,
    });

    const handleOpenDrawer = (order: any) => {
        setSelectedOrder(order);
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

    const value = {
        chatId,
        goBack,
        isModerator,
        isDirector,
        hideCreateOrderButton,
        edit,
        setEdit,
        openDownIcon,
        setOpenDownIcon,
        createOrderModalOpen,
        setCreateOrderModalOpen,
        res,
        setRes,
        feedbackOpen,
        setFeedbackOpen,
        selectedOrder,
        messagesContainerRef,
        chatWindowRef,
        scrollPositionRef,
        chat,
        messages,
        sendMessage,
        sendMessageWithFile,
        updateMessage,
        deleteMessage,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isMessageWithFilePending,
        wsRef,
        droppedFile,
        setDroppedFile,
        isDragging,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
        handleOpenDrawer,
        handleFetchNext,
        handlScroll,
        handleNavigateSellerProfile,
        handleCreateOrderClick,
    };

    return (
        <ConversationContext.Provider value={value}>
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
                {children}
            </div>
        </ConversationContext.Provider>
    );
}

Conversation.DropOverlay = DropOverlay;
Conversation.Header = Header;
Conversation.Messages = Messages;
Conversation.Input = Input;
Conversation.Modals = Modals;

export default Conversation;
