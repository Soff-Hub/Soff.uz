import React from 'react';
import Link from 'next/link';
import { Badge, Card, Dropdown, Menu, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '~/hooks/useAuth';
import Router from 'next/router';
import { setSavedPrfileData } from '~/rtk-store/ecomerce';
import { logOut } from '~/rtk-store/auth';



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
            Router.push('/account/login');
            dispatch(logOut());
            dispatch(setSavedPrfileData(null))
        }
    };


    const menu = (
        <Menu>
            {accountLinks.map((link) => (
                <div className="order">
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
