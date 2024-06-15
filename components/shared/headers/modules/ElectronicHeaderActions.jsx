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

const ElectronicHeaderActions = ({ auth }) => {
    const { wishlist } = useWishlist();
    const [socket, setSocket] = useState(null);
    const [socketCount, setSocketCount] = useState(null);
    const [api, contextHolder] = notification.useNotification();
    const { user } = useSelector((state) => state.auth);
    const [webdata, setWebData] = useState(null);
    const data = useSelector((state) => state.ecomerce.cartDataItems);

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
        if (user?.access) {
            // Agar user?.access mavjud bo'lsa
            const newSocket = new WebSocket(
                `${process.env.NEXT_PUBLIC_WS_BASE_URL}ws/user-notification/?token=${user?.access}`
            );

            // Yangi WebSocket ulanishini yaratish
            newSocket.onopen = function () { };

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


    useEffect(() => {
        const token = user?.access;
        if (token) {
            const ws = new WebSocket(
                `${process.env.NEXT_PUBLIC_WS_BASE_URL}ws/deals?token=${token}`
            );
            setSocketCount(ws);

            ws.onopen = () => {
                console.log('WebSocket connection established');
            };

            ws.onmessage = (event) => {
                setWebData(JSON.parse(event?.data));
            };

            ws.onclose = () => {
                console.log('WebSocket connection closed');
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            // Clean up on unmount
            return () => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.close();
                }
            };
        }
    }, [user?.access]);


    useEffect(() => {
        if (socketCount) {
            socketCount.onmessage = (event) => {
                setWebData(JSON.parse(event?.data));
            };
        }
    }, [socketCount]);




console.log(webdata?.sent_applications);
console.log(webdata?.sent_applications + webdata?.received_applications);
console.log( webdata?.received_applications);



    return (
        <div className="header__actions">
            {contextHolder}
            <Link href="/account/all-orders" className='mx-2'>
                <a className="header__extra">
                    <i class="fa-solid fa-handshake fa-fade" ></i>
                    {(webdata?.sent_applications || webdata?.received_applications) ? (
                        <span className="socket_navbar">
                            {webdata?.sent_applications + webdata?.received_applications}
                        </span>
                    ) : (
                        ''
                    )}
                </a>
            </Link>

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
            ) : (
                ''
            )}

            {wishlist?.length > 0 ? (
                <Link href="/account/wishlist">
                    <a className="header__extra">
                        <i className="icon-heart"></i>
                        <span>
                            <i>{wishlist.length}</i>
                        </span>
                    </a>
                </Link>
            ) : (
                ''
            )}
            {data?.length > 0 && <MiniCart />}
            {auth.isLoggedIn && Boolean(auth.isLoggedIn) === true ? (
                <AccountQuickLinks isLoggedIn={true} />
            ) : (
                <AccountQuickLinks isLoggedIn={false} />
            )}
        </div>
    );
};

export default connect((state) => state)(ElectronicHeaderActions);
