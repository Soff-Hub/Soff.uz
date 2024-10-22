import React, { useMemo, useState } from 'react'
import Link from 'next/link'

import { Badge, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

import useCredentials from '~/hooks/useCredentials'
import useWebSocket from '~/hooks/useWebSocket';
import { wssBaseUrl } from '~/utilities/exports';

export default function HeaderNotifications() {
    const { token } = useCredentials()
    const [api, contextHolder] = notification.useNotification();

    const [notifications, setNotifications] = useState([]);
    const [notificationsCount, setNotificationsCount] = useState(0);

    const { } = useWebSocket(`${wssBaseUrl}ws/user-notification/`, {
        onMessage: (event) => {
            const newNotification = JSON.parse(event.data);
            setNotificationsCount(newNotification?.count)
            setNotifications(newNotification?.notifications);
        },
    });

    const openNotification = () => {
        api.open({
            message: 'Yangi bildirishnoma!',
            description: (
                <div>
                    {notifications?.map((el, i) => (
                        <h4 key={el?.title}>
                            {i + 1}. {el.title}
                        </h4>
                    ))}
                    <Link href={`/account/notification`}>
                        <a className="yashil">
                            Batafsil{' '}
                            <i className="fa-regular fa-hand-point-right"></i>
                        </a>
                    </Link>
                </div>
            ),
            icon: (
                <SmileOutlined
                    style={{
                        color: '#00A44F',
                    }}
                />
            ),
        });
    };

    const handleNewNotifications = useMemo(() => {
        if (notificationsCount > 0) {
            openNotification()
        }
    }, [notifications]);


    return (
        <div>
            {contextHolder}

            {token ? (
                <Link href={`/account/notification`}>
                    <Badge count={notificationsCount} color='#00a44f'>
                        <a className="header__extra fs-1" style={{ cursor: 'pointer' }}>
                            <i className="fa-regular fa-bell text-white"></i>
                            {/* {notificationsCount ? (
                            <span className="socket_navbar">
                                {notificationsCount}
                            </span>
                        ) : (
                            ''
                        )} */}
                        </a>
                    </Badge>
                </Link>
            ) : (
                ''
            )}
        </div>
    )
}
