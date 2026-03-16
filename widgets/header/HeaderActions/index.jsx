import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import useWishlist from '~/shared/hooks/useWishlist';
import MiniCart from '~/shared/components/modals/MiniCart';
import HeaderNotifications from './HeaderNotifications';
import HeaderUserDropdown from './HeaderUserDropdown';
// import HeaderAISoffia from './HeaderAISoffia';
import { Badge } from 'antd';
import MenuCategoriesDropdown from '~/widgets/header/MenuCategoriesDropdown';
import useResponsive from '~/shared/utilities/useResponsive';
import HeaderCatergories, { HeaderSearch } from '../HeaderCategories';
import { FaRegHeart } from 'react-icons/fa';
import { useRouter } from 'next/router';
import styles from './header-actions.module.scss';

const HeaderActions = () => {
    const { wishlist } = useWishlist();
    const { pathname } = useRouter();
    const { isDesktop, size } = useResponsive();
    const { cartDataItems, playlistCartDataItems } = useSelector(
        (state) => state.ecomerce
    );

    const isTabletLimit = !isDesktop && size >= 650 && pathname !== '/';
    const isWishlistVisible = wishlist && wishlist.length > 0;
    const isMiniCartVisible =
        (cartDataItems && cartDataItems.length > 0) ||
        (playlistCartDataItems && playlistCartDataItems.length > 0);

    return (
        <div className={`site-header-actions flex-1`}>
            {isDesktop && <HeaderCatergories />}
            {isDesktop && <MenuCategoriesDropdown />}
            {isTabletLimit && <HeaderSearch />}
            {/* <HeaderAISoffia /> */}
            {isWishlistVisible && (
                <Link href="/account/wishlist">
                    <a className="header__extra">
                        <Badge count={wishlist.length} offset={[0, -2]}>
                            <FaRegHeart className={styles.headerIconLike} />
                        </Badge>
                    </a>
                </Link>
            )}

            {isMiniCartVisible && <MiniCart />}
            <HeaderNotifications />
            <HeaderUserDropdown />
        </div>
    );
};

export default HeaderActions;
