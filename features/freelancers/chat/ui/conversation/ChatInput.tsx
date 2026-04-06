import { useQueryClient } from '@tanstack/react-query';
import { Button, Input, message, Spin, Tooltip, Upload } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useTimeManager } from '~/shared/hooks/useTimeManager';
import {
    ArrowDownOutlined,
    PaperClipOutlined,
    SendOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons';
import styles from '../../style/chat.module.scss';
import { useConversation } from './Conversation';
import { MAX_SIZE } from '../../constants/file-size';

const { TextArea } = Input;

type ChatInputProps = {};

const ChatInput = ({ }: ChatInputProps) => {
    const {
        chat,
        edit,
        setEdit,
        chatId,
        messagesContainerRef,
        openDownIcon,
        sendMessage,
        sendMessageWithFile,
        isMessageWithFilePending,
        updateMessage,
        droppedFile,
        setDroppedFile,
        isModerator,
        isFAQOpen,
        setIsFAQOpen,
    } = useConversation();
    const [newMessage, setNewMessage] = useState('');
    const [fileList, setFileList] = useState<any>([]);
    const { startTimeout } = useTimeManager();
    const fileMapRef = useRef(new Map()); // Store actual files separately
    const queryClient = useQueryClient();
    const fileInputRef = useRef<HTMLButtonElement>(null);

    const isBlocked = chat?.opponent?.is_blocked;

    const onClearDroppedFile = () => {
        setDroppedFile(null);
    };

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
                    onError: (err: any) => {
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

    const customRequest = ({ file, onSuccess, onProgress }: any) => {
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

    const simulateUpload = (
        uid: string,
        onSuccess: (arg: any) => void,
        onProgress: (arg: any) => void
    ) => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;

            onProgress({ percent: progress });

            setFileList((prev: any) =>
                prev.map((f: any) =>
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

    const handleRemove = (file: any) => {
        setFileList((prev: any) => prev.filter((f: any) => f.uid !== file.uid));
        fileMapRef.current.delete(file.uid);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    useEffect(() => {
        if (droppedFile && onClearDroppedFile) {
            const file = droppedFile as any;
            if (!file.uid) {
                file.uid = `rc-upload-${Date.now()}-dropped`;
            }

            customRequest({
                file,
                onSuccess: () => { },
                onProgress: () => { },
            });

            onClearDroppedFile();
        }
    }, [droppedFile]);

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
                    if (file.size > MAX_SIZE) {
                        message.error('Fayl hajmi 50MB dan oshmasligi kerak');
                        return Upload.LIST_IGNORE;
                    }
                    return true;
                }}
                className={`chat-file-uploader ${fileList.length ? 'has-files' : 'no-files'
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
                        disabled={isBlocked || edit != null}
                        loading={fileList?.[0]?.status == 'uploading'}
                    />
                </Tooltip>
                {isModerator && (
                    <Tooltip title="FAQ">
                        <Button
                            icon={<QuestionCircleOutlined />}
                            type="text"
                            shape="circle"
                            onClick={() => setIsFAQOpen(!isFAQOpen)}
                            className={isFAQOpen ? styles.faq_toggle_active : ''}
                        />
                    </Tooltip>
                )}
                <TextArea
                    value={newMessage}
                    disabled={isBlocked || isMessageWithFilePending}
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
                    disabled={isBlocked || !canSubmit}
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
export default ChatInput;
