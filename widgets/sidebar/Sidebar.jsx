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
import useDebounce from '~/shared/hooks/useDebounce';

const { Sider } = Layout;

const disableLinkStyle = {
    pointerEvents: 'none',
};

function Sidebar({ collapsed, onChangeCollapse }) {
    const { logOutAuth } = useAuth();
    const { size } = useResponsive();
    const isStyleApplicable = useDebounce(!collapsed, 200);
    const router = useRouter();
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const refresh = useSelector((state) => state.auth?.user?.refresh);
    const [lastPathSegment, setLasPathSegment] = useState();
    const profileImg = user?.image;
    const isAuthorized = Boolean(user && Object.keys(user).length);
    const fullName =
        `${user?.first_name || ''} ${user?.last_name || ''}`.trim() ||
        'Foydalanuvchi';

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
                disabled: !isAuthorized,
                label: (
                    <Link href={'/account/sellerproducts'}>
                        <a style={!isAuthorized ? disableLinkStyle : {}}>
                            Sotib olinganlar
                        </a>
                    </Link>
                ),
            },
            {
                key: 'my-orders',
                icon: <FaTruck size={20} />,
                disabled: !isAuthorized,
                label: (
                    <Link href={'/order/my-orders'}>
                        <a style={!isAuthorized ? disableLinkStyle : {}}>
                            Buyurtmalarim
                        </a>
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
                disabled: !isAuthorized,
                label: (
                    <Link href={'/chat'}>
                        <a style={!isAuthorized ? disableLinkStyle : {}}>
                            Chat
                        </a>
                    </Link>
                ),
            },
            {
                key: 'notification',
                icon: <FaRegBell size={20} />,
                disabled: !isAuthorized,
                label: (
                    <Link href={'/account/notification'}>
                        <a style={!isAuthorized ? disableLinkStyle : {}}>
                            Bildirishnomalar
                        </a>
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
                disabled: !isAuthorized,
                label: 'Chiqish',
                onClick: handleLogout,
                danger: true,
            },
        ],
        [isAuthorized]
    );

    const onClickMenuItem = (menuItem) => {
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
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setLasPathSegment(
                window.location.pathname.split('/').filter(Boolean).pop()
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
                    }
                />
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
                                overflowWrap: isStyleApplicable && 'anywhere',
                            }}>
                            {fullName}
                        </h4>
                        <p
                            style={{
                                marginBottom: '0px',
                                color: 'gray',
                                overflowWrap: isStyleApplicable && 'anywhere',
                            }}>
                            {user?.phone || user?.email || ''}
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
