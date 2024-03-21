import React, { Component } from 'react';
import Link from 'next/link';
import { logOut } from '../../../../store/auth/action';
import { Badge, Card, Dropdown, Menu, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '~/hooks/useAuth';
import Router from 'next/router';

function AccountQuickLinks() {
    const { accountLinks } = useSelector((state) => state.auth);
    const refresh = useSelector((state) => state.auth?.user?.refresh);
    const dispatch = useDispatch();

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
            Router.push('/');
            dispatch(logOut());
        }
    };

    const menu = (
        <Menu>
            {accountLinks.map((link) => (
                <div className="order">
                    {link?.url == '#' ? (
                        <Badge.Ribbon text="Tez kunda" color="volcano">
                            <Card size="small">
                                <Menu.Item key={link.url}>
                                    <Link href={link.url}>
                                        <a>
                                            {' '}
                                            <span>
                                            <i class="fa-regular fa-handshake"></i>{' '}
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
                                    <Link href='#'>
                                        <a>
                                            {' '}
                                            <span>
                                            <i class="fa-regular fa-handshake"></i>{' '}
                                            </span>{' '}
                                            Buyurtma berish
                                        </a>
                                    </Link>
                                </Menu.Item>
                            </Card>
                        </Badge.Ribbon>
                    )        : (
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
                <i className="icon-user"></i>
            </a>
        </Dropdown>
    );
}
export default AccountQuickLinks;
