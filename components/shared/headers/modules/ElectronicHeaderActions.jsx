import React from 'react';
import { connect, useSelector } from 'react-redux';
import Link from 'next/link';

import MiniCart from './MiniCart';
import AccountQuickLinks from './AccountQuickLinks';
import useWishlist from '~/hooks/useWishlist';
import { SmileOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';

const ElectronicHeaderActions = ({ auth, ecomerce }) => {
    const { wishlist } = useWishlist();
    const [socket, setSocket] = useState(0);
    const [api, contextHolder] = notification.useNotification();
    const { user } = useSelector((state) => state.auth);
    const openNotification = () => {
        api.open({
            message: 'Notification Title',
            description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            icon: (
                <SmileOutlined
                    style={{
                        color: '#108ee9',
                    }}
                />
            ),
        });
    };


    // useEffect(() => {
    //     if (user?.access) {
    //         const respons = new WebSocket(
    //             `wss://api.soff.uz/ws/user-notification/?token=${user?.access}`
    //         );
    //         setSocket(respons);
    //     }
    // }, [user?.access]);
    console.log('notification', socket);
    return (
        <div className="header__actions">
            {contextHolder}
            <Link href="/account/notification">
                <a className="header__extra" style={{ cursor: 'pointer' }}>
                    <i class="fa-regular fa-bell fa-lg"></i>
                    {
                        socket ?
                        <span className="socket_navbar">{socket}</span>
                        : ''
                    }
                </a>
            </Link>
            <Link href="/account/wishlist">
                <a className="header__extra">
                    <i className="icon-heart"></i>
                    <span>
                        <i>{wishlist.length}</i>
                    </span>
                </a>
            </Link>
            <MiniCart />
            {auth.isLoggedIn && Boolean(auth.isLoggedIn) === true ? (
                <AccountQuickLinks isLoggedIn={true} />
            ) : (
                <AccountQuickLinks isLoggedIn={false} />
            )}
        </div>
    );
};

export default connect((state) => state)(ElectronicHeaderActions);
