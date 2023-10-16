import React from 'react';
import { connect, useSelector } from 'react-redux';
import Link from 'next/link';
import AccountQuickLinksMobile from './AccountQuickLinksMobile';
import { Dropdown, Menu } from 'antd';

const MobileHeaderActions = ({ auth, ecomerce }) => {
const state = useSelector((state => state.ecomerce.cartDataItems))
    const menu = (

        <Menu>
           <div className='d-flex flex-column p-2'>
           <Link href="/account/login" >
                    <a>Kirish</a>
                </Link>

                <Link href="/account/foydalanuvchi">
                    <a>Ro'yxatdan o'tish</a>
                </Link>
            </div>      
        </Menu>
    );
    return (
        <div className="navigation__right">
            <Link href="/page/about-us">
                <a className="header__extra">
                <i className="fa-regular fa-circle-question" ></i>
                </a>
            </Link>
            <Link href="/account/shopping-cart">
                <a className="header__extra" href="#">
                    <i className="icon-bag2"></i>
                    <span>
                        <i>{state ? state?.length : 0}</i>
                    </span>
                </a>
            </Link>

            {auth.isLoggedIn && Boolean(auth.isLoggedIn) === true ? (
                <AccountQuickLinksMobile />
            ) : (
                <Dropdown overlay={menu} placement="bottomLeft">
                    <a href="#" className="header__extra ps-user--mobile">
                        <i className="icon-user"></i>
                    </a>
                </Dropdown>
            )}
        </div>
    );
};

export default connect((state) => state)(MobileHeaderActions);
