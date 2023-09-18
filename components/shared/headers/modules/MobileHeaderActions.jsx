import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import AccountQuickLinksMobile from './AccountQuickLinksMobile';
import { useCookies } from 'react-cookie';
import { Dropdown, Menu } from 'antd';

const MobileHeaderActions = ({ auth, ecomerce }) => {

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
    const [cookies, setCookie] = useCookies(['cart']);
    const { cartItems, wishlist } = ecomerce;
    return (
        <div className="navigation__right">
            {/* <Link href="/account/wishlist">
                <a className="header__extra" href="#">
                    <i className="icon-heart"></i>
                    <span>
                        <i>{wishlist ? wishlist.length : 0}</i>
                    </span>
                </a>

            </Link> */}
            <Link href="/account/shopping-cart">
                <a className="header__extra" href="#">
                    <i className="icon-bag2"></i>
                    <span>
                        <i>{cookies ? cookies.cart?.length : 0}</i>
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
