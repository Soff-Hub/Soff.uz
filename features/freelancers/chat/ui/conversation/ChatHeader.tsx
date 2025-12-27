import React from 'react';
import { Avatar, Button } from 'antd';
import { ArrowLeftOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { FaRegUserCircle } from 'react-icons/fa';
import { FaHeadset } from 'react-icons/fa';
import { useConversation } from './Conversation';
import useResponsive from '~/shared/utilities/useResponsive';
import styles from '../../style/chat.module.scss';
import { BlockedAlert, SafetyAlert } from './ChatAlerts';

type ChatHeaderProps = {};

function ChatHeader({}: ChatHeaderProps) {
    const { isDesktop } = useResponsive();
    const {
        goBack,
        chat,
        wsRef,
        isModerator,
        isDirector,
        hideCreateOrderButton,
        handleNavigateSellerProfile,
        handleCreateOrderClick,
    } = useConversation();

    const isBlocked = chat?.opponent?.is_blocked;
    const recipient = chat?.opponent;

    return (
        <>
            <div className={styles.chat_user}>
                {goBack && (
                    <ArrowLeftOutlined
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            goBack();
                            wsRef.current?.close();
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
            {isBlocked ? <BlockedAlert /> : <SafetyAlert />}
        </>
    );
}

export default ChatHeader;
