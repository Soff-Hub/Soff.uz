import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Badge, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { api as axios } from '~/repositories/api';

import useCredentials from '~/shared/hooks/useCredentials';
import useWebSocket from '~/shared/hooks/useWebSocket';
import { CHAT_UNSEENS, wssBaseUrl } from '~/shared/api/end-points';
import { useFGet } from '~/shared/hooks/useFApi';
import { cn } from '~/shared/utilities/cn';
import { useQueryClient } from '@tanstack/react-query';

export default function HeaderNotifications({ color }) {
    const queryClient = useQueryClient();
    const { token } = useCredentials();
    const [api, contextHolder] = notification.useNotification();
    const { data } = useFGet('unread_messages_count', CHAT_UNSEENS, {
        enabled: !!token,
        token,
    });
    const [notifications, setNotifications] = useState([]);
    const [notificationsCount, setNotificationsCount] = useState(0);

    const {} = useWebSocket(`${wssBaseUrl}ws/user-notification/`, {
        onMessage: event => {
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
                                Batafsil{' '}
                                <i className="fa-regular fa-hand-point-right"></i>
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
        <div>
            {contextHolder}
            {token ? (
                <Badge
                    offset={[-10, 3]}
                    size="small"
                    count={data?.unread_messages}
                    color="#00a44f">
                    <Link href={`/chat`} style={{ marginRight: '10px' }}>
                        <a
                            className="header__extra fs-1"
                            style={{ cursor: 'pointer' }}>
                            <i
                                style={{ marginRight: '10px' }}
                                className={`fa-regular fa-comment-dots ${color}`}></i>
                        </a>
                    </Link>
                </Badge>
            ) : (
                ''
            )}
            {token ? (
                <Link
                    href={`/account/notification`}
                    style={{ marginRight: '10px' }}>
                    <a
                        className="header__extra fs-1"
                        style={{ cursor: 'pointer' }}>
                        <Badge
                            offset={[-10, 3]}
                            size="small"
                            count={notificationsCount}
                            color="#00a44f">
                            <i
                                style={{
                                    marginRight: '10px',
                                    fontSize: '25px',
                                }}
                                className={`fa-regular fa-bell ${color}`}></i>
                        </Badge>
                    </a>
                </Link>
            ) : (
                ''
            )}
        </div>
    );
}
