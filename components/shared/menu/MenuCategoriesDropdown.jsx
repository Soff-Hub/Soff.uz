import Link from 'next/link';
import React from 'react';
import styles from '~/shared/styles/landingStyles.module.scss';

const MenuCategoriesDropdown = () => {
    return (
        <div className="menu--product-categories">
            <Link href={'https://seller.soff.uz/'} target="_blank">
                <a>
                    <p
                        className={`${styles.navLinkFreelance} my-0`}
                        style={{
                            color: '#00a44f',
                            fontWeight: '500',
                        }}>
                        Sotuvchi bo'lish
                    </p>
                </a>
            </Link>
        </div>
    );
};

export default MenuCategoriesDropdown;
