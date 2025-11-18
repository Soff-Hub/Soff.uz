import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Layout, Menu } from 'antd';
import { RiShoppingBasketFill } from 'react-icons/ri';
import { FaTruck } from 'react-icons/fa';
import { PiSignOutBold } from 'react-icons/pi';
import { FaRegUserCircle } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegCommentDots } from 'react-icons/fa';
import { FaRegBell } from 'react-icons/fa';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { logOut } from '~/store/auth/slice';
import { setSavedPrfileData } from '~/store/ecomerce/slice';
import useAuth from '~/shared/hooks/useAuth';
import useResponsive from '~/shared/utilities/useResponsive';

const { Sider } = Layout;

function Sidebar({ collapsed, onChangeCollapse }) {
    const { logOutAuth } = useAuth();
    const { size } = useResponsive();
    const router = useRouter();
    const { user } = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const refresh = useSelector(state => state.auth?.user?.refresh);
    const [lastPathSegment, setLasPathSegment] = useState();
    const profileImg = user?.image;

    const handleLogout = () => {
        const data = {
            refresh: refresh,
        };
        const res = logOutAuth(data);

        if (res) {
            router.push('/auth/login');
            dispatch(logOut());
            dispatch(setSavedPrfileData(null));
        }
    };

    const items = useMemo(
        () => [
            {
                key: 'sellerproducts',
                icon: <RiShoppingBasketFill size={20} />,
                onClick: () => router.push('/account/sellerproducts'),
                label: (
                    <Link href={'/account/sellerproducts'}>
                        <a>Sotib olinganlar</a>
                    </Link>
                ),
            },
            {
                key: 'my-orders',
                icon: <FaTruck size={20} />,
                label: (
                    <Link href={'/order/my-orders'}>
                        <a>Buyurtmalarim</a>
                    </Link>
                ),
            },
            {
                key: 'divider-1',
                type: 'divider',
            },
            {
                key: 'wishlist',
                icon: <FaRegHeart size={20} />,
                label: (
                    <Link href={'/account/wishlist'}>
                        <a>Tanlanganlar</a>
                    </Link>
                ),
            },
            {
                key: 'shopping-cart',
                icon: <MdOutlineShoppingCart size={20} />,
                label: (
                    <Link href={'/account/shopping-cart'}>
                        <a>Savatcha</a>
                    </Link>
                ),
            },
            {
                key: 'chat',
                icon: <FaRegCommentDots size={20} />,
                label: (
                    <Link href={'/chat'}>
                        <a>Chat</a>
                    </Link>
                ),
            },
            {
                key: 'notification',
                icon: <FaRegBell size={20} />,
                label: (
                    <Link href={'/account/notification'}>
                        <a>Bildirishnomalar</a>
                    </Link>
                ),
            },
            {
                key: 'divider-2',
                type: 'divider',
            },
            {
                key: 'logout',
                icon: <PiSignOutBold size={20} />,
                label: 'Chiqish',
                onClick: handleLogout,
                danger: true,
            },
        ],
        []
    );

    const onClickMenuItem = menuItem => {
        if (collapsed) {
            console.log('collapsed', menuItem);
            switch (menuItem.key) {
                case 'sellerproducts':
                    router.push('/account/sellerproducts');
                    break;
                case 'my-orders':
                    router.push('/order/my-orders');
                    break;
                case 'wishlist':
                    router.push('/account/wishlist');
                    break;
                case 'shopping-cart':
                    router.push('/account/shopping-cart');
                    break;
                case 'chat':
                    router.push('/chat');
                    break;
                case 'notification':
                    router.push('/account/notification');
                    break;
            }
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setLasPathSegment(
                window.location.pathname
                    .split('/')
                    .filter(Boolean)
                    .pop()
            );
        }
    }, []);

    if (size < 650) return null;

    return (
        <Sider
            trigger={null}
            width={300}
            collapsible
            collapsed={collapsed}
            className="sidebar-layout"
            theme="light">
            <div
                style={{
                    display: 'flex',
                    justifyContent: collapsed ? 'center' : 'end',
                    alignItems: 'center',
                    paddingTop: '10px',
                    paddingInline: '10px',
                }}>
                <Button
                    onClick={onChangeCollapse}
                    size={collapsed ? 'large' : 'middle'}
                    icon={
                        collapsed ? (
                            <MdKeyboardDoubleArrowRight size={20} />
                        ) : (
                            <MdKeyboardDoubleArrowLeft size={20} />
                        )
                    }></Button>
            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '15px',
                }}>
                <div
                    style={{
                        width: '50px',
                        aspectRatio: '1 / 1',
                    }}>
                    <Avatar
                        size={50}
                        src={profileImg}
                        icon={<FaRegUserCircle />}
                    />
                </div>
                {!collapsed ? (
                    <div>
                        <h4
                            style={{
                                marginBottom: '0px',
                                overflowWrap: 'anywhere',
                            }}>
                            {user?.first_name || 'Foydalanuvchi'}
                        </h4>
                        <p
                            style={{
                                marginBottom: '0px',
                                color: 'gray',
                            }}>
                            {user?.phone || user?.email || 'Email mavjud emas'}
                        </p>
                    </div>
                ) : null}
            </div>
            <Menu
                mode="inline"
                selectedKeys={[lastPathSegment]}
                onSelect={onClickMenuItem}
                items={items}
                style={{
                    border: 'none',
                }}
            />
        </Sider>
    );
}

export default Sidebar;
