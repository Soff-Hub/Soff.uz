import React from 'react';
import styles from '~/shared/styles/landingStyles.module.scss';

const MenuCategoriesDropdown = () => {
    return (
        <div className="menu--product-categories">
            <a href={'https://seller.soff.uz/'} target="_blank">
                <p className={`${styles.navLink} my-0`}>Frilanser bo'lish</p>
            </a>
        </div>
    );
};

export default MenuCategoriesDropdown;
