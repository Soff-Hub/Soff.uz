import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '~/shared/styles/landingStyles.module.scss';
import useResponsive from '~/shared/utilities/useResponsive';

const MenuCategoriesDropdown = () => {
    const { isMobile } = useResponsive();
    const { t } = useTranslation('header');
    return (
        <div className="menu--product-categories">
            <Link href={'https://seller.soff.uz/'} target="_blank">
                <a
                    target="_blank"
                    className={`${styles.navLinkFreelance} my-0`}
                    style={{
                        color: '#00a44f',
                        fontWeight: '500',
                        marginRight: isMobile ? 0 : '5px',
                    }}>
                    {t('becomeSeller')}
                </a>
            </Link>
        </div>
    );
};

export default MenuCategoriesDropdown;
