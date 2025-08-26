import React, { useState } from 'react';
import styles from './style.module.scss';
import Link from 'next/link';

const option = {
    scientific_work: 'Ilmiy va Akademik Xizmatlar',
    three_d: '3D Dizayn va Vizualizatsiya',
    web: 'Dasturlash xizmatlari',
    dizyn: 'Dizayn',
    document: 'Shablonlar',
};

const SideBarItem = ({ label, products, templates }) => {
    const [open, setOpen] = useState(false);

    const product = products.map(item => ({
        key: item.id,
        label: option[label],
        children: <Link href={''}>{item.title}</Link>,
    }));
    return (
        <div className={styles.menuItem}>
            <button
                onClick={() => setOpen(!open)} // toggle qilish
                type="button"
                className={styles.label}>
                {label}
            </button>

            <div className={styles.accordion}>
                <div className={styles.orders}>
                    <h3 className={styles.sectionLabel}>Buyurtma berish</h3>
                    <ul className={styles.details}>
                        {/* {products?.map(item => (
                            <li key={item.id} className={styles.detail}>
                                {item.title}
                            </li>
                        ))} */}
                        {/* <Collapse
                            bordered={false}
                            defaultActiveKey={['1']}
                            expandIcon={({ isActive }) => (
                                <CaretRightOutlined
                                    rotate={isActive ? 90 : 0}
                                />
                            )}
                            style={{ background: token.colorBgContainer }}
                            items={getItems(panelStyle)}
                        /> */}
                    </ul>
                </div>
                <div className={styles.templates}>
                    <h3 className={styles.sectionLabel}>Tayyor mahsulotlar</h3>
                    <ul className={styles.details}>
                        {templates?.map(item => (
                            <li key={item.id} className={styles.detail}>
                                {item.title}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SideBarItem;
