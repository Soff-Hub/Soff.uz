import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Badge, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { api as axios } from '~/repositories/api';
import { FaRegCommentDots } from 'react-icons/fa';
import { FaRegBell } from 'react-icons/fa';
import useCredentials from '~/shared/hooks/useCredentials';
import useWebSocket from '~/shared/hooks/useWebSocket';
import { CHAT_UNSEENS, wssBaseUrl } from '~/shared/api/end-points';
import { useFGet } from '~/shared/hooks/useFApi';
import { cn } from '~/shared/utilities/cn';
import { useQueryClient } from '@tanstack/react-query';
import { FaHandPointRight } from 'react-icons/fa';
import styles from './header-actions.module.scss';

export default function HeaderNotifications() {
    const queryClient = useQueryClient();
    const { token } = useCredentials();
    const [api, contextHolder] = notification.useNotification();
    const { data } = useFGet('unread_messages_count', CHAT_UNSEENS, {
        enabled: !!token,
        token,
    });
    const [notifications, setNotifications] = useState([]);
    const [notificationsCount, setNotificationsCount] = useState(0);

    useWebSocket(`${wssBaseUrl}ws/user-notification/`, {
        onMessage: (event) => {
            const newNotification = JSON.parse(event.data);
            if (newNotification?.count > 0) {
                setNotificationsCount(newNotification?.count);
                setNotifications(newNotification?.notifications);
            }
            if (newNotification?.new_purchase) {
                queryClient.invalidateQueries({
                    queryKey: ['fast-download'],
                    exact: false,
                });
            }
        },
    });

    const handleRead = async () => {
        try {
            await axios.post(
                'seller/notifications/read-all/',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            api.destroy();
            setNotificationsCount(0);
        } catch (error) {
            console.error(
                'Bildirishnomalarni o‘qilgan qilishda xatolik:',
                error
            );
        }
    };

    const openNotification = () => {
        api.open({
            message: 'Yangi bildirishnoma!',
            description: (
                <div>
                    {notifications?.map((el, i) => (
                        <h4 key={i}>
                            {i + 1}. {el.title}
                        </h4>
                    ))}
                    <div
                        className={cn(
                            'flex',
                            'justify-between',
                            'items-center'
                        )}>
                        <Link href={`/account/notification`}>
                            <a className="yashil">
                                Batafsil <FaHandPointRight />
                            </a>
                        </Link>
                        <span
                            onClick={handleRead}
                            className={cn(
                                'text-primary',
                                'cursor-pointer',
                                'hover-underline',
                                'transition'
                            )}>
                            O'qildi
                        </span>
                    </div>
                </div>
            ),
            icon: (
                <SmileOutlined
                    style={{
                        color: '#00A44F',
                    }}
                />
            ),
            onClose: handleRead,
        });
    };

    const handleNewNotifications = useMemo(() => {
        if (notificationsCount > 0) {
            openNotification();
        }
    }, [notifications]);

    return (
        <>
            {contextHolder}
            {token ? (
                <Link href={`/chat`}>
                    <a className="header__extra" style={{ cursor: 'pointer' }}>
                        <Badge count={data?.unread_messages} color="#00a44f">
                            <FaRegCommentDots className={styles.headerIcon} />
                        </Badge>
                    </a>
                </Link>
            ) : (
                ''
            )}
            {token ? (
                <Link href={`/account/notification`}>
                    <a className="header__extra" style={{ cursor: 'pointer' }}>
                        <Badge count={notificationsCount} color="#00a44f">
                            <FaRegBell className={styles.headerIcon} />
                        </Badge>
                    </a>
                </Link>
            ) : (
                ''
            )}
        </>
    );
}
