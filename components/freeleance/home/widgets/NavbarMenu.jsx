import React, { useState } from 'react';
import styles from '../styles/navbarmenu.module.scss';
import { MenuItem } from '../_components/MenuItem';
import useNavCategories from '../../chat/api/useNavCatergories';
import Link from 'next/link';

const NavbarMenu = () => {
    const { data, isLoading } = useNavCategories();

    if (isLoading && !data) return null;

    return (
        <>
            {data && (
                <nav className={styles.navSectionBlock}>
                    <div className="container">
                        <div className={styles.navbarWrapper}>
                            {data?.map(item => (
                                <MenuItem
                                    key={item.direction}
                                    products={item.freelance_categories}
                                    templates={item.soff_categories}
                                    label={item.direction}
                                />
                            ))}
                        </div>
                    </div>
                </nav>
            )}
        </>
    );
};

export default NavbarMenu;
