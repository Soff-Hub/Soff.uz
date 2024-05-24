import React from 'react';
import Link from 'next/link';
import { logOut } from '../../../../store/auth/action';
import { Badge, Card, Dropdown, Menu, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '~/hooks/useAuth';
import Router from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';

function AccountQuickLinks() {
    const { accountLinks, user } = useSelector((state) => state.auth);
    const refresh = useSelector((state) => state.auth?.user?.refresh);
    const dispatch = useDispatch();
    const [profile, setProfile] = useState(null);

    const handleLogout = () => {
        const data = {
            refresh: refresh,
        };
        const { logOutAuth } = useAuth();
        const res = logOutAuth(data);

        if (res) {
            const modal = Modal.info({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: `Siz muvaffaqqiyatli chiqdingiz`,
            });
            Router.push('/account/selection');
            dispatch(logOut());
        }
    };


    const menu = (
        <Menu>
            {accountLinks.map((link) => (
                <div className="order">
                    {link?.url == '/account/deals' ? (
                        <Badge.Ribbon text="Tez kunda" color="volcano">
                            <Card size="small">
                                <Menu.Item key={link.url}>
                                    <Link href={link.url}>
                                        <a>
                                            {' '}
                                            <span>
                                                <i  className={` text-dark fs-4 me-2  ${link.icon}`}></i>{' '}
                                            </span>{' '}
                                            Mening bitimlarim
                                        </a>
                                    </Link>
                                </Menu.Item>
                            </Card>
                        </Badge.Ribbon>
                    ) : link?.url == 'b' ? (
                        <Badge.Ribbon text="Tez kunda" color="volcano">
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

    async function ProfileUsers(token) {
        const ItemsData = await GetRepository.getProfile(token);
        if (ItemsData) {
            setProfile(ItemsData);
        }
    }

    useEffect(() => {
        if (user?.access) {
            ProfileUsers(user?.access);
        }
    }, [user?.access]);

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
