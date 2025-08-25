import React, { useState } from 'react';
import styles from '../styles/navbarmenu.module.scss';
import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';

const items = [
    {
        label: 'Ilmiy va Akademik',
        key: 'file',
        children: [
            {
                type: 'group',
                label: 'Item 1',
                children: [
                    { label: 'Option 1', key: 'setting:1' },
                    { label: 'Option 2', key: 'setting:2' },
                ],
            },
            {
                type: 'group',
                label: 'Item 2',
                children: [
                    { label: 'Option 3', key: 'setting:3' },
                    { label: 'Option 4', key: 'setting:4' },
                ],
            },
        ],
    },
    {
        label: 'Dizayn',
        key: 'design',
        children: [
            {
                type: 'group',
                label: 'Item 1',
                children: [
                    { label: 'Option 1', key: 'setting:1' },
                    { label: 'Option 2', key: 'setting:2' },
                ],
            },
            {
                type: 'group',
                label: 'Item 2',
                children: [
                    { label: 'Option 3', key: 'setting:3' },
                    { label: 'Option 4', key: 'setting:4' },
                ],
            },
        ],
    },
    {
        label: 'Dasturlash',
        key: 'website',
    },
    {
        label: '3D Dizayn va Vizualizatsiya',
        key: '3d',
    },
    {
        label: 'Biznes',
        key: 'business',
    },
    {
        label: 'Marketing',
        key: 'market',
    },
];
const NavbarMenu = () => {
    const [current, setCurrent] = useState('mail');

    const onClick = e => {
        // console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <nav className={styles.navSectionBlock}>
            <div className="container">
                {' '}
                <Menu
                    onClick={onClick}
                    selectedKeys={[current]}
                    className="navMenuBlock"
                    mode="horizontal"
                    items={items}
                    color="#03ba4c"
                />
            </div>
        </nav>
    );
};

export default NavbarMenu;
