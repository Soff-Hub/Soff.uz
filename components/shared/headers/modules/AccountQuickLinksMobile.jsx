import React from 'react';
import Link from 'next/link';
import { logOut } from '../../../../store/auth/slice';
import { Badge, Card, Dropdown, Menu, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '~/hooks/useAuth';
import Router from 'next/router';
import { setSavedPrfileData } from '~/store/ecomerce/slice';



function AccountQuickLinks() {
    const { accountLinks } = useSelector((state) => state.auth);
    const refresh = useSelector((state) => state.auth?.user?.refresh);
    const { profile } = useSelector((state) => state.ecomerce);
    const dispatch = useDispatch();


    const handleLogout = () => {
        const data = {
            refresh: refresh,
        };
        const { logOutAuth } = useAuth();
        const res = logOutAuth(data);

        if (res) {
            Router.push('/auth/login');
            dispatch(logOut());
            dispatch(setSavedPrfileData(null))
        }
    };


    const menu = (
        <Menu>
            {accountLinks.map((link, index) => (
                <div className="order" key={index}>
                    {link?.url == '/account/selling' ? <Badge.Ribbon key={link?.url} text="Yangi funksiya" color='blue'>
                        <Card size="small" style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)', borderRadius: 0 }}>
                            <li  >
                                <Link
                                    href={link?.url}
                                    style={{
                                        cursor: 'pointer',
                                    }}>
                                    <a className="d-flex align-items-center ps-3">
                                        <img src='/static/img/birja-icon.png' height={20} width={20} className='me-2' />
                                        {link.text}
                                    </a>
                                </Link>
                            </li >
                        </Card>
                    </Badge.Ribbon> : link?.url == '/account/deals' ? (
                        <Badge.Ribbon text="Tez kunda" color="volcano" key={index}>
                            <Card size="small">
                                <Menu.Item key={link.url}>
                                    <Link href={link.url}>
                                        <a>
                                            {' '}
                                            <span>
                                                <i className={` text-dark fs-4 me-2  ${link.icon}`}></i>{' '}
                                            </span>{' '}
                                            Mening bitimlarim
                                        </a>
                                    </Link>
                                </Menu.Item>
                            </Card>
                        </Badge.Ribbon>
                    ) : link?.url == 'b' ? (
                        <Badge.Ribbon text="Tez kunda" color="volcano" key={index}>
                            <Card size="small">
                                <Menu.Item key={link.url}>
                                    <Link href="#">
                                        <a>
                                            {' '}
                                            <span>
                                                <i className="fa-regular fa-handshake"></i>{' '}
                                            </span>{' '}
                                            Buyurtma berish
                                        </a>
                                    </Link>
                                </Menu.Item>
                            </Card>
                        </Badge.Ribbon>
                    ) : (
                        <Menu.Item key={link.url}>
                            <Link href={link.url}>
                                <a>
                                    {' '}
                                    <span>
                                        <i
                                            className={` text-dark fs-4 me-2  ${link.icon}`}></i>{' '}
                                    </span>{' '}
                                    {link.text}
                                </a>
                            </Link>
                        </Menu.Item>
                    )}
                </div>
            ))}
            <Menu.Item>
                <a href="#" onClick={() => handleLogout()}>
                    <i className="fa-solid fa-right-from-bracket me-3 mx-1 text-dark fs-4"></i>{' '}
                    Chiqish
                </a>
            </Menu.Item>
        </Menu>
    );



    return (
        <Dropdown overlay={menu} placement="bottomLeft">
            <a href="#" className="header__extra ps-user--mobile">
                {profile?.image ? (
                    <img
                        alt="soff"
                        src={profile?.image}
                        className="profile__image-client"
                    />
                ) : (
                    <i className="icon-user"></i>
                )}
            </a>
        </Dropdown>
    );
}
export default AccountQuickLinks;
