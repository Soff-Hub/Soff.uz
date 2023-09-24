import React, { Component } from 'react';
import Link from 'next/link';
import { logOut } from '../../../../store/auth/action';
import { Dropdown, Menu, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '~/hooks/useAuth';
import Router from 'next/router';

function AccountQuickLinks() {
    const { accountLinks } = useSelector(state => state.auth)
    const refresh = useSelector(state => state.auth?.user?.refresh)
    const dispatch = useDispatch();

    const handleLogout = (e) => {
        e.preventDefault();
       
        const data = {
            'refresh' : refresh
        }
        const { logOutAuth } = useAuth();
        const res = logOutAuth(data)
        
        if (res) {
            const modal = Modal.info({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: `Siz muvaffaqqiyatli chiqdingiz`,
            });
            dispatch(logOut());
        }

        Router.push('/');
    };

    const menu = (
        <Menu>
            {accountLinks.map(link => (
                <Menu.Item key={link.url}>
                    <Link href={link.url}>
                        <a> <span><i className={` text-dark fs-4 me-2  ${link.icon}`}></i> </span> {link.text}</a>
                    </Link>
                </Menu.Item>
            ))}
           <Menu.Item>
           <a href="#" onClick={(e) => handleLogout(e)}>
           <i className="fa-solid fa-right-from-bracket me-3 mx-1 text-dark fs-4"></i>  Chiqish
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

};
export default AccountQuickLinks;
