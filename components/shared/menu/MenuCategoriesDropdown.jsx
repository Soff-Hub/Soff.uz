import Link from 'next/link';
import React from 'react';
import styles from '~/shared/styles/landingStyles.module.scss';
import useResponsive from '~/shared/utilities/useResponsive';

const MenuCategoriesDropdown = () => {
    const { isMobile } = useResponsive();
    return (
        <div className="menu--product-categories">
            <Link href={'https://seller.soff.uz/'} target="_blank">
                <a>
                    <p
                        className={`${styles.navLinkFreelance} my-0`}
                        style={{
                            color: '#00a44f',
                            fontWeight: '500',
                            marginRight: isMobile ? 0 : '5px',
                        }}>
                        Sotuvchi bo'lish
                    </p>
                </a>
            </Link>
        </div>
    );
};

export default MenuCategoriesDropdown;
