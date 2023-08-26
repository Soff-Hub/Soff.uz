import React, { Component } from 'react';
import Link from 'next/link';
import { logOut } from '../../../../store/auth/action';
import { Dropdown, Menu } from 'antd';
import { useSelector } from 'react-redux';

function AccountQuickLinks() {
    const { accountLinks } = useSelector(state => state.auth)

//    const handleLogout = e => {
//         e.preventDefault();
//         dispatch(logOut());
//         localStorage.removeItem('token')
//     };
    
    const menu = (
        <Menu>
            {accountLinks.map(link => (
                <Menu.Item key={link.url}>
                    <Link href={link.url}>
                        <a>{link.text}</a>
                    </Link>
                </Menu.Item>
            ))}

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
