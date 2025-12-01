import React from 'react';
import { connect, useSelector } from 'react-redux';
import Link from 'next/link';
import useWishlist from '~/shared/hooks/useWishlist';
import MiniCart from '~/components/shared/headers/modules/MiniCart';
import HeaderNotifications from './HeaderNotifications';
import HeaderUserDropdown from './HeaderUserDropdown';
import { Badge } from 'antd';
import MenuCategoriesDropdown from '~/components/shared/menu/MenuCategoriesDropdown';
import useResponsive from '~/shared/utilities/useResponsive';
import HeaderCatergories, { HeaderSearch } from '../HeaderCategories';

const HeaderActions = ({ auth, isDark }) => {
    const { wishlist } = useWishlist();
    const { isMobile, isTablet, size } = useResponsive();
    const isTabletLimit = size >= 650;
    const data = useSelector((state) => state.ecomerce.cartDataItems);

    return (
        <div
            className={`site-header-actions flex-1 ${
                isDark ? 'text-black' : 'text-white'
            }`}>
            {!isMobile && !isTablet && <HeaderCatergories />}
            {!isMobile && !isTablet && <MenuCategoriesDropdown />}
            {isTabletLimit && <HeaderSearch />}
            <div className="d-flex">
                {wishlist?.length > 0 && (
                    <Link href="/account/wishlist">
                        <a
                            className="header__extra"
                            style={{ marginRight: '15px' }}>
                            <Badge count={wishlist.length}>
                                <img
                                    src="/static/img/heart1.png"
                                    width={'20px'}
                                    alt=""
                                />{' '}
                            </Badge>
                        </a>
                    </Link>
                )}

                {data?.length > 0 && <MiniCart />}
            </div>
            <HeaderNotifications color={isDark ? 'text-black' : 'text-white'} />
            <HeaderUserDropdown
                color={isDark ? 'text-black' : 'text-white'}
                isLoggedIn={auth.isLoggedIn && Boolean(auth.isLoggedIn)}
            />
        </div>
    );
};

export default connect((state) => state)(HeaderActions);
