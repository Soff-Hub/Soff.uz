import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import AccountQuickLinksMobile from './AccountQuickLinksMobile';
import { useCookies } from 'react-cookie';

const MobileHeaderActions = ({ auth, ecomerce }) => {
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
                <div className="header__extra color-light">
                    <Link href="/account/login">
                        <i className="icon-user"></i>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default connect((state) => state)(MobileHeaderActions);
