import React from 'react';
import { connect, useSelector } from 'react-redux';
import Link from 'next/link';
import AccountQuickLinksMobile from './AccountQuickLinksMobile';
import { Dropdown, Menu, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useEffect } from 'react';

const MobileHeaderActions = ({ auth, ecomerce }) => {
    const state = useSelector((state) => state.ecomerce.cartDataItems);
    const menu = (
        <Menu>
            <div className="d-flex flex-column p-2">
                <Link href="/account/login">
                    <a>Kirish</a>
                </Link>

                <Link href="/account/selection">
                    <a>Ro'yxatdan o'tish</a>
                </Link>
            </div>
        </Menu>
    );

    const [socket, setSocket] = useState(null);
    const [api, contextHolder] = notification.useNotification();
    const { user } = useSelector((state) => state.auth);

    const openNotification = () => {
        api.open({
            message: 'Soff.uz da yangiliklar',
            description: (
                <div>
                    {socket?.notifications?.map((el, i) => (
                        <h4 key={el?.title}>
                            {i + 1}. {el.title}
                        </h4>
                    ))}
                    <Link href={`/account/notification`}>
                        <a className="yashil">
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

    return (
        <div className="navigation__right">
            {contextHolder}
            {user?.access && (
                <Link href={`/account/notification`}>
                    <a className="header__extra" style={{ cursor: 'pointer' }}>
                        <i class="fa-regular fa-bell fa-lg"></i>
                        {socket?.count ? (
                            <span className="socket_navbar">
                                {socket?.count}
                            </span>
                        ) : (
                            ''
                        )}
                    </a>
                </Link>
            )}
            <Link href="/account/shopping-cart">
                <a className="header__extra" href="#">
                    <i className="icon-bag2"></i>
                    <span>
                        <i>{state ? state?.length : 0}</i>
                    </span>
                </a>
            </Link>

            {auth.isLoggedIn && Boolean(auth.isLoggedIn) === true ? (
                <AccountQuickLinksMobile />
            ) : (
                <Dropdown overlay={menu} placement="bottomLeft">
                    <a href="#" className="header__extra ps-user--mobile">
                        <i className="icon-user"></i>
                    </a>
                </Dropdown>
            )}
        </div>
    );
};

export default connect((state) => state)(MobileHeaderActions);
