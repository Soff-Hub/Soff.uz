import React, { useState } from 'react';
import styles from '../styles/navbarmenu.module.scss';
import { MenuItem } from '../_components/MenuItem';
import { useQuery } from '@tanstack/react-query';

const items = [
    {
        label: 'Ilmiy ishlar',
        items: {
            orders: [
                {
                    label: 'Slaydlar',
                    slug: 'name',
                },
                {
                    label: 'Referatlar',
                    slug: 'fullname',
                },
                {
                    label: 'Ilmiy ishlar',
                    slug: 'username',
                },
            ],
            templates: [
                {
                    label: 'Cards',
                    slug: 'card',
                },
                {
                    label: 'Elements',
                    slug: 'elements',
                },
                {
                    label: 'Designs',
                    slug: 'designs',
                },
            ],
        },
    },
    {
        label: 'Dizayn ishlar',
        items: {
            orders: [
                {
                    label: 'Logo',
                    slug: 'name',
                },
                {
                    label: 'Smm',
                    slug: 'fullname',
                },
                {
                    label: 'Animatsiyalar',
                    slug: 'username',
                },
            ],
            templates: [
                {
                    label: 'Cards',
                    slug: 'card',
                },
                {
                    label: 'Elements',
                    slug: 'elements',
                },
                {
                    label: 'Designs',
                    slug: 'designs',
                },
            ],
        },
    },
    {
        label: '3D ishlar',
        items: {
            orders: [
                {
                    label: 'Modellar',
                    slug: 'name',
                },
                {
                    label: 'Interior',
                    slug: 'fullname',
                },
                {
                    label: 'Exterior',
                    slug: 'username',
                },
            ],
            templates: [
                {
                    label: 'Cards',
                    slug: 'card',
                },
                {
                    label: 'Elements',
                    slug: 'elements',
                },
                {
                    label: 'Designs',
                    slug: 'designs',
                },
            ],
        },
    },
];
const NavbarMenu = () => {
    return (
        <nav className={styles.navSectionBlock}>
            <div className="container">
                <div className={styles.navbarWrapper}>
                    {items.map(item => (
                        <MenuItem items={item.items} label={item.label} />
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default NavbarMenu;
