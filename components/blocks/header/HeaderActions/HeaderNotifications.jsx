import React, { useMemo, useState } from 'react'
import Link from 'next/link'

import { notification } from 'antd';
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
            setNotificationsCount(0)
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
                    <a className="header__extra fs-2" style={{ cursor: 'pointer' }}>
                        <i className="fa-regular fa-bell"></i>
                        {notificationsCount ? (
                            <span className="socket_navbar">
                                {notificationsCount}
                            </span>
                        ) : (
                            ''
                        )}
                    </a>
                </Link>
            ) : (
                ''
            )}
        </div>
    )
}
