import {
    EllipsisOutlined,
    DeleteOutlined,
    EditOutlined,
    CopyOutlined,
    ExclamationCircleOutlined,
    CheckOutlined,
    FileTextOutlined,
    DownloadOutlined,
} from '@ant-design/icons';
import styles from '../style/message.module.scss';
import {
    Dropdown,
    message as AntMessage,
    Modal,
    Tooltip,
    Spin,
    Avatar,
} from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useMemo } from 'react';
import { truncateTitle } from '~/shared/utilities/TruncateTitle';
import AvatarTransitioned from './AvatarTransitioned';
import { FaRegUserCircle } from 'react-icons/fa';
import OrderCard from '~/widgets/order-card';
import useResponsive from '~/shared/utilities/useResponsive';

const { confirm } = Modal;

const ChatMessage = ({
    msg,
    onEdit,
    onDelete,
    myImg,
    recipientImg,
    handleOpenDrawer,
    setRes,
    setFeedbackOpen,
}) => {
    const { isMobile } = useResponsive();
    const isMyMessage = msg.is_mine;
    const isMessageLoading =
        msg.status === 'sending' || msg.status === 'updating';

    const isOrderMessage =
        Boolean(msg.order) &&
        Boolean(msg.order.files) &&
        msg.order.files?.length > 0;

    const handleEdit = useCallback(() => {
        onEdit(msg);
    }, [msg, onEdit]);

    const handleDeleteConfirm = useCallback(() => {
        confirm({
            title: 'Xabarni o‘chirishni tasdiqlang',
            icon: <ExclamationCircleOutlined />,
            content: 'Rostdan ham ushbu xabarni o‘chirmoqchimisiz?',
            okText: 'Ha, o‘chirish',
            okType: 'danger',
            cancelText: 'Bekor qilish',
            onOk() {
                onDelete(msg.id, msg.status);
            },
        });
    }, [onDelete, msg.id]);

    const handleCopy = useCallback((text) => {
        navigator.clipboard
            .writeText(text)
            .then(() => AntMessage.success('Xabar nusxalandi'))
            .catch(() => AntMessage.error('Nusxalashda xatolik yuz berdi'));
    }, []);

    const myMenuItems = useMemo(() => {
        if (msg.file && !msg.content) {
            return [
                {
                    key: 'delete',
                    label: 'O‘chirish',
                    icon: <DeleteOutlined />,
                    danger: true,
                    onClick: handleDeleteConfirm,
                },
            ];
        } else {
            return [
                {
                    key: 'edit',
                    label: 'Tahrirlash',
                    icon: <EditOutlined />,
                    disabled: isMessageLoading,
                    onClick: handleEdit,
                },
                {
                    key: 'copy',
                    label: 'Nusxalash',
                    icon: <CopyOutlined />,
                    onClick: () => handleCopy(msg.content),
                },
                {
                    key: 'delete',
                    label: 'O‘chirish',
                    icon: <DeleteOutlined />,
                    danger: true,
                    onClick: handleDeleteConfirm,
                },
            ];
        }
    }, [
        msg.content,
        handleEdit,
        handleDeleteConfirm,
        handleCopy,
        isMessageLoading,
    ]);

    const opponentMenuItems = useMemo(() => {
        if (msg.file) {
            return [
                {
                    key: 'dowload',
                    label: 'Yuklab olish',
                    icon: <DownloadOutlined />,
                    onClick: () => window.open(msg.file.url, '_blank'),
                },
            ];
        } else {
            return [
                {
                    key: 'copy',
                    label: 'Nusxalash',
                    icon: <CopyOutlined />,
                    onClick: () => handleCopy(msg.content),
                },
            ];
        }
    }, [msg.content, handleCopy]);

    const readStatus = useMemo(() => {
        if (!isMyMessage) return null;

        if (isMessageLoading) {
            return (
                <Tooltip title="Yuborilmoqda...">
                    <img
                        src="/static/svg/svg-spinners--clock.svg"
                        alt="loading"
                        style={{
                            fongSize: '10px',
                            width: '10px',
                            height: '10px',
                            marginLeft: 4,
                        }}
                    />
                </Tooltip>
            );
        }

        return msg.is_read ? (
            <Tooltip title="O‘qildi">
                <CheckOutlined
                    style={{ fontSize: '8px', color: 'white', marginLeft: 4 }}
                />
                <CheckOutlined
                    style={{ fontSize: '8px', color: 'white', marginLeft: -4 }}
                />
            </Tooltip>
        ) : (
            <Tooltip title="Yetib bordi">
                <CheckOutlined
                    style={{
                        fontSize: '8px',
                        color: 'white',
                        marginLeft: 4,
                    }}
                />
            </Tooltip>
        );
    }, [isMyMessage, msg.is_read, isMessageLoading]);

    return (
        <div
            key={msg.id}
            className={`${styles.messageRow} ${
                isMyMessage ? styles.myRow : styles.otherRow
            }`}>
            {!isMyMessage && (
                <div
                    style={{
                        width: '32px',
                        height: '32px',
                    }}>
                    <Avatar
                        size={32}
                        src={recipientImg}
                        icon={<FaRegUserCircle />}
                    />
                </div>
            )}

            {isOrderMessage ? (
                <div
                    style={{
                        width: isMobile ? '100%' : '70%',
                        position: 'relative',
                    }}>
                    <OrderCard
                        withFiles
                        withCollapse
                        withRejectedStatus
                        orderSize="small"
                        fileSize="small"
                        order={msg.order}
                        onClick={handleOpenDrawer}
                        setSelectedOrder={handleOpenDrawer}
                        setRes={setRes}
                        setFeedbackOpen={setFeedbackOpen}
                    />
                    <span
                        style={{
                            position: 'absolute',
                            bottom: '3px',
                            right: '10px',
                            fontSize: '9.5px',
                            color: isMyMessage ? 'white' : 'black',
                            opacity: 0.7,
                            whiteSpace: 'nowrap',
                            zIndex: 10,
                        }}>
                        {msg.created_at
                            ? dayjs(msg.created_at).format('HH:mm')
                            : '--:--'}
                        {readStatus}
                    </span>
                </div>
            ) : (
                <div
                    className={`${styles.chat_message} ${
                        isMyMessage ? styles.my_message : styles.other_message
                    }`}
                    style={{
                        wordBreak: 'break-word',
                        whiteSpace: 'pre-wrap',
                    }}>
                    <span
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr auto',
                            justifyContent: 'space-between',
                            alignItems: 'end',
                            gap: '5px',
                            width: '100%',
                        }}>
                        {msg.file && (
                            <div className={styles.chat_file_box}>
                                <FileTextOutlined
                                    onClick={() =>
                                        window.open(msg.file.url, '_blank')
                                    }
                                    className={styles.chat_file}
                                />
                                <div className={styles.chat_file_info}>
                                    <span className={styles.chat_file_name}>
                                        {truncateTitle(msg.file.filename, 15)}
                                    </span>
                                    <span className={styles.chat_file_size}>
                                        {(
                                            msg.file.size /
                                            (1024 * 1024)
                                        ).toFixed(2)}{' '}
                                        MB
                                    </span>
                                </div>
                            </div>
                        )}
                        {msg.content && (
                            <span
                                style={{
                                    gridColumn: '1 / 2',
                                    whiteSpace: 'pre-wrap',
                                    wordWrap: 'break-word',
                                    overflowWrap: 'break-word',
                                    minWidth: 0,
                                }}>
                                {msg.content}
                            </span>
                        )}
                        <span
                            style={{
                                textAlign: 'right',
                                fontSize: '9.5px',
                                color: isMyMessage ? 'white' : 'black',
                                opacity: 0.7,
                                whiteSpace: 'nowrap',
                            }}>
                            {msg.created_at
                                ? dayjs(msg.created_at).format('HH:mm')
                                : '--:--'}
                            {readStatus}
                        </span>
                    </span>
                    <div
                        style={{
                            ...(isMyMessage
                                ? { left: '-20px' }
                                : { right: '-20px' }),
                            position: 'absolute',
                            top: '4px',
                            zIndex: 10,
                        }}
                        className={styles.moreWrapper}>
                        <Dropdown
                            menu={
                                isMyMessage
                                    ? { items: myMenuItems }
                                    : { items: opponentMenuItems }
                            }
                            trigger={['click']}
                            placement={
                                isMyMessage ? 'bottomRight' : 'bottomLeft'
                            }>
                            <EllipsisOutlined className={styles.moreIcon} />
                        </Dropdown>
                    </div>
                </div>
            )}

            {isMyMessage && <AvatarTransitioned msg={msg} image={myImg} />}
        </div>
    );
};

export default React.memo(ChatMessage, areEqual);

function areEqual(prevProps, nextProps) {
    return prevProps.msg === nextProps.msg;
}
