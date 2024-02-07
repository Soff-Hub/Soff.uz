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
import GetRepository from '~/reositoriy-admin/GetRepository';

const ElectronicHeaderActions = ({ auth, ecomerce }) => {
    const { wishlist } = useWishlist();
    const [socket, setSocket] = useState(null);
    const [api, contextHolder] = notification.useNotification();
    const { user } = useSelector((state) => state.auth);
    // const [notifications, setNotifications] = useState(null);

    // const getNotification = async (token) => {
    //     const respons = await GetRepository.getNotificationData(token);
    //     if (respons) {
    //         setNotifications(respons.results);
    //         console.log('notification list', respons.results);
    //     }
    // };

    const openNotification = () => {
        api.open({
            message: 'Soff.uz da yangiliklar',
            description: (
                <div>
                    {socket?.notifications?.map((el, i) => (
                        <h4>
                            {i + 1}. {el.title}
                        </h4>
                    ))}
                    <Link href={`/account/notification`}>
                        <a>
                            Yangiliklarni batafsil ko'rish{' '}
                            <i class="fa-regular fa-hand-point-right"></i>
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

    useEffect(() => {
        if (user?.access) {
            // Agar user?.access mavjud bo'lsa
            const newSocket = new WebSocket(
                `wss://api.soff.uz/ws/user-notification/?token=${user?.access}`
            );

            // Yangi WebSocket ulanishini yaratish
            newSocket.onopen = function () {
                console.log('WebSocket ulanishi amalga oshirildi.');
            };

            // Xabarlarni qabul qilish uchun funksiya
            if (newSocket) {
                newSocket.onmessage = function (event) {
                    setSocket(JSON.parse(event.data));
                };
            }

            // WebSocket ulanishida xatolik bo'lganida ishlaydigan funksiya
            newSocket.onerror = function (error) {
                console.error('WebSocket xatosi:', error);
            };

            // useEffect funksiyasiga qaytariladigan cleanup funksiya
            return () => {
                // WebSocket ulanishini yopish
                newSocket.close();
            };
        }
    }, [user?.access]);

    useEffect(() => {
        socket?.count > 0 && openNotification();
    }, [socket?.count]);

    console.log('not', socket, socket?.count);

    return (
        <div className="header__actions">
            {contextHolder}
            <span
                className="header__extra"
                style={{ cursor: 'pointer' }}
                onClick={openNotification}>
                <i class="fa-regular fa-bell fa-lg"></i>
                {socket?.count ? (
                    <span className="socket_navbar">{socket?.count}</span>
                ) : (
                    ''
                )}
            </span>
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
