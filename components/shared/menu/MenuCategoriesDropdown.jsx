import React from 'react';
import styles from '~/shared/styles/landingStyles.module.scss';

const MenuCategoriesDropdown = () => {
    return (
        <div className="menu--product-categories">
            <a href={'https://seller.soff.uz/'} target="_blank">
                <p
                    className={`${styles.navLinkFreelance} my-0`}
                    style={{
                        color: '#00a44f',
                        fontWeight: '500',
                    }}>
                    Frilanser bo'lish
                </p>
            </a>
        </div>
    );
};

export default MenuCategoriesDropdown;
