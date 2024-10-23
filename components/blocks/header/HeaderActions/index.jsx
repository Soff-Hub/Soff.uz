import React from 'react';
import { connect, useSelector } from 'react-redux';
import Link from 'next/link';

import useWishlist from '~/hooks/useWishlist';
import MiniCart from '~/components/shared/headers/modules/MiniCart';
import HeaderNotifications from './HeaderNotifications';
import HeaderUserDropdown from './HeaderUserDropdown';

const HeaderActions = ({ auth, isDark }) => {
    const { wishlist } = useWishlist();
    const data = useSelector((state) => state.ecomerce.cartDataItems);

    return (
        <div className={`site-header-actions ${isDark ? 'text-black' : 'text-white'}`}>
            <Link href="/page/about-us">
                <a className="header__extra fs-2">
                    <i className="fa-regular fa-circle-question"></i>
                </a>
            </Link>

            <HeaderNotifications color={isDark ? 'text-black' : 'text-white'} />

            {wishlist?.length > 0 ? (
                <Link href="/account/wishlist">
                    <a className="header__extra">
                        <i className="icon-heart"></i>
                        <span>
                            <i>{wishlist.length}</i>
                        </span>
                    </a>
                </Link>
            ) : (
                ''
            )}

            {data?.length > 0 && <MiniCart />}

            <HeaderUserDropdown isLoggedIn={auth.isLoggedIn && Boolean(auth.isLoggedIn)} />
        </div>
    );
};

export default connect((state) => state)(HeaderActions);
