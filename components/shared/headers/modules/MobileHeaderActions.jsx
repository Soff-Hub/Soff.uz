import React from 'react';
import { connect, useSelector } from 'react-redux';
import Link from 'next/link';
import AccountQuickLinksMobile from './AccountQuickLinksMobile';
import { Dropdown, Menu, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const MobileHeaderActions = ({ auth }) => {
    const state = useSelector((state) => state.ecomerce.cartDataItems);
    const router = useRouter();
    const { id, deal } = router?.query



    const menu = (
        <Menu>
            <div className="d-flex flex-column p-2">
                <Link href={
                    (id) ? `/account/login?id=${id}` :
                        (deal) ? `/account/login?deal=${deal}` :
                            "/account/login"
                }>
                    <a>Kirish</a>
                </Link>

                <Link href={
                    (id) ? `/account/register?id=${id}&role=customer` :
                        (deal) ? `/account/register?deal=${deal}` :
                            "/account/register"
                }>
                    <a>Ro'yxatdan o'tish</a>
                </Link>
            </div>
        </Menu >
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


    useEffect(() => {
        if (user?.access && user?.role !== 'admin') {
            const newSocket = new WebSocket(
                `${process.env.NEXT_PUBLIC_WS_BASE_URL}ws/user-notification/?token=${user?.access}`
            );

            newSocket.onopen = function () { };

            if (newSocket) {
                newSocket.onmessage = function (event) {
                    setSocket(JSON.parse(event.data));
                };
            }

            newSocket.onerror = function (error) {

            };

            return () => {
                newSocket.close();
            };
        }
    }, [user?.access]);


    useEffect(() => {
        if (socket?.count > 0) {
            openNotification();
        }
    }, [socket]);


    return (
        <div className="navigation__right">
            {contextHolder}
            <Link href="/page/about-us">
                <a className="header__extra">
                    <i className="fa-regular fa-circle-question"></i>
                </a>
            </Link>
            {user?.access ? (
                <Link href={`/account/notification`}>
                    <a className="header__extra" style={{ cursor: 'pointer' }}>
                        <i className="fa-regular fa-bell fa-lg"></i>
                        {socket?.count ? (
                            <span className="socket_navbar">
                                {socket?.count}
                            </span>
                        ) : (
                            ''
                        )}
                    </a>
                </Link>
            ) : " "}
            {
                state?.length > 0 ?
                    <Link href="/account/shopping-cart">
                        <a className="header__extra" href="#">
                            <i className="icon-bag2"></i>
                            <span>
                                <i>{state ? state?.length : 0}</i>
                            </span>
                        </a>
                    </Link>
                    : " "
            }

            {auth.isLoggedIn && Boolean(auth.isLoggedIn) === true ? (
                <AccountQuickLinksMobile />
            ) : (
                <Dropdown menu={menu} placement="bottomLeft">
                    <a href="#" className="header__extra ps-user--mobile">
                        <i className="icon-user"></i>
                    </a>
                </Dropdown>
            )}
        </div>
    );
};

export default connect((state) => state)(MobileHeaderActions);
