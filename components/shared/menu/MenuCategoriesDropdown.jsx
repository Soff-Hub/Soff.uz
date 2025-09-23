import Link from 'next/link';
import React from 'react';
import styles from '../../landingStyles/landingStyles.module.scss';
import useResponsive from '~/shared/utilities/useResponsive';
import { useSelector } from 'react-redux';

const MenuCategoriesDropdown = () => {
    const { isMobile } = useResponsive()
    const { isLoggedIn } = useSelector(state => state.auth)
    return (
        <div className="menu--product-categories">
            {/* {!isMobile && isLoggedIn && 
                <Link href={'/order/my-orders'} target="_blank">
                    <p className={`${styles.navLink} mx-0 my-0`}>Buyurtmalarim</p>
                </Link>
            } */}
            <a href={'https://seller.soff.uz/'} target="_blank">
                <p className={`${styles.navLink} my-0`}>Frilanser bo'lish</p>
            </a>
        </div>
    );
};

export default MenuCategoriesDropdown;
