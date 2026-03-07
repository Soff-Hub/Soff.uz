import React from 'react';
import styles from './style.module.scss';
import {
    CaretRightOutlined,
    CloseOutlined,
    MenuOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import SideBarItem from './sidebarItem';
import { Collapse, Drawer } from 'antd';
import { useFGet } from '~/shared/hooks/useFApi';
import { NAVBAR_MENU_CATEGORIES } from '~/shared/api/end-points';

const option = {
    scientific_work: 'Ilmiy va Akademik Xizmatlar',
    three_d: '3D Dizayn va Vizualizatsiya',
    web: 'Dasturlash xizmatlari',
    dizayn: 'Dizayn',
    document: 'Shablonlar',
    video: 'Video darsliklar',
};

const SideBar = () => {
    const [open, setOpen] = useState(false);
    const { data, isLoading } = useFGet(
        'navbar-items',
        'categories/categories-with-directions'
    );
    const panelStyle = {
        background: '#fff',
        padding: '0px',
    };
    const getItems = (items, onClick) =>
        items &&
        items.map(item => ({
            key: item.id,
            label: option[item.direction],
            children: (
                <SideBarItem
                    products={item.freelance_categories}
                    templates={item.soff_categories}
                    direction={item.direction}
                    onClick={onClick}
                />
            ),
            style: panelStyle,
        }));

    return (
        <div className=" d-lg-none position-relative">
            <button onClick={() => setOpen(true)} className={styles.barIcon}>
                <MenuOutlined style={{ color: '#000' }} />
            </button>
            <Drawer
                style={panelStyle}
                placement="left"
                closeIcon={
                    <>
                        <div className="d-flex justify-content-between">
                            <span>&nbsp;</span>
                            <CloseOutlined className=" align-self-end" />
                        </div>
                    </>
                }
                onClose={() => setOpen(false)}
                open={open}>
                <div className="  overflow-auto p-0">
                    <Collapse
                        style={{ backgroundColor: '#fff' }}
                        bordered={false}
                        expandIcon={({ isActive }) => (
                            <CaretRightOutlined rotate={isActive ? 90 : 0} />
                        )}
                        items={getItems(data, () => setOpen(false))}
                    />
                </div>
            </Drawer>
        </div>
    );
};

export default SideBar;
