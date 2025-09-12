import Link from 'next/link';
import React from 'react';
import styles from '../../landingStyles/landingStyles.module.scss';
import useResponsive from '~/utilities/useResponsive';

const MenuCategoriesDropdown = () => {
    const { isMobile } = useResponsive()
    return (
        <div className="menu--product-categories">
            {/* {!isMobile && 
                <Link href={'/order/my-orders'} target="_blank">
                    <p className={`${styles.navLink} mx-0 my-0`}>Buyurtmalarim</p>
                </Link>
            } */}
            <Link href={'https://seller.soff.uz/'} target="_blank">
                <p className={`${styles.navLink} my-0`}>Frilanser bo'lish</p>
            </Link>
        </div>
    );
};

export default MenuCategoriesDropdown;
