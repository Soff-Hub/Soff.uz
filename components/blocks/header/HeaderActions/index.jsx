import React from 'react';
import { connect, useSelector } from 'react-redux';
import Link from 'next/link';
import useWishlist from '~/hooks/useWishlist';
import MiniCart from '~/components/shared/headers/modules/MiniCart';
import HeaderNotifications from './HeaderNotifications';
import HeaderUserDropdown from './HeaderUserDropdown';
import { Badge } from 'antd';
import MenuCategoriesDropdown from '~/components/shared/menu/MenuCategoriesDropdown';
import useResponsive from '~/utilities/useResponsive';
import HeaderCatergories from '../HeaderCategories';
import SideBar from '../SiderBar/sidebar';

const HeaderActions = ({ auth, isDark }) => {
    const { wishlist } = useWishlist();
    const { isMobile, isTablet, si } = useResponsive();
    const data = useSelector(state => state.ecomerce.cartDataItems);

    return (
        <div
            className={`site-header-actions gap-3 ${
                isDark ? 'text-black' : 'text-white'
            }`}>
            {!isMobile && !isTablet &&  <HeaderCatergories />}
            {!isMobile && !isTablet && <MenuCategoriesDropdown />}
            <div className="d-flex gap-4">
                {wishlist?.length > 0 ? (
                    <Link href="/account/wishlist">
                        <a className="header__extra">
                            <a href="#">
                                <Badge count={wishlist.length}>
                                    <img
                                        src="/static/img/heart1.png"
                                        width={'20px'}
                                        alt=""
                                    />{' '}
                                </Badge>
                            </a>
                        </a>
                    </Link>
                ) : (
                    ''
                )}

                {data?.length > 0 && <MiniCart />}
            </div>
            <HeaderNotifications color={isDark ? 'text-black' : 'text-white'} />
            <HeaderUserDropdown
                color={isDark ? 'text-black' : 'text-white'}
                isLoggedIn={auth.isLoggedIn && Boolean(auth.isLoggedIn)}
            />
            <SideBar />
        </div>
    );
};

export default connect(state => state)(HeaderActions);
