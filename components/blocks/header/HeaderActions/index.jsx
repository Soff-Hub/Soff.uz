import React from 'react';
import { connect, useSelector } from 'react-redux';
import Link from 'next/link';

import useWishlist from '~/hooks/useWishlist';
import MiniCart from '~/components/shared/headers/modules/MiniCart';
import HeaderNotifications from './HeaderNotifications';
import HeaderUserDropdown from './HeaderUserDropdown';
import HeaderSearchIcon from './HeaderSearchIcon';
import HeaderAIIcon from './HeaderAIIcon';
import { Badge } from 'antd';

const HeaderActions = ({ auth, isDark }) => {
    const { wishlist } = useWishlist();
    const data = useSelector(state => state.ecomerce.cartDataItems);

    return (
        <div
            className={`site-header-actions ${
                isDark ? 'text-black' : 'text-white'
            }`}>
            {/* <Link href="/page/about-us">
                <a className="header__extra fs-2">
                    <i className="fa-regular fa-circle-question"></i>
                </a>
            </Link> */}
            {/* <HeaderAIIcon /> */}
            <HeaderSearchIcon />
            <HeaderNotifications color={isDark ? 'text-black' : 'text-white'} />

            {wishlist?.length > 0 ? (
                <Link href='/account/wishlist'>
                    <a className='header__extra'>
                        <a href='#'>
                            <Badge count={wishlist.length}>
                                <img
                                    src='/static/img/heart1.png'
                                    width={'25px'}
                                    alt=''
                                />{' '}
                            </Badge>
                        </a>
                    </a>
                </Link>
            ) : (
                ''
            )}

            {data?.length > 0 && <MiniCart />}

            <HeaderUserDropdown
                color={isDark ? 'text-black' : 'text-white'}
                isLoggedIn={auth.isLoggedIn && Boolean(auth.isLoggedIn)}
            />
        </div>
    );
};

export default connect(state => state)(HeaderActions);
