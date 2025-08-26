import React, { useState } from 'react';
import styles from './style.module.scss';
import Link from 'next/link';
import { Collapse } from 'antd';
import { useRouter } from 'next/router';

const option = {
    scientific_work: 'scientific-resources',
    three_d: '3d-models-and-interior-designs',
    web: 'websites',
    dizyn: 'design-developments',
    document: 'templates',
};

const SideBarItem = ({ products, templates, direction, onClick }) => {
    const router = useRouter();
    return (
        <div className={styles.menuItem}>
            <div className={styles.accordion}>
                <div className={styles.orders}>
                    <h3 className={styles.sectionLabel}>Buyurtma berish</h3>
                    <ul className={styles.details}>
                        {products?.map(item => (
                            <li
                                onClick={() => {
                                    router.push(
                                        `/orders?direction=${direction}&parent_category_id=${item.id}`
                                    );
                                    onClick();
                                }}
                                key={item.id}
                                className={styles.detail}>
                                {item.title}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.templates}>
                    <h3 className={styles.sectionLabel}>Tayyor mahsulotlar</h3>
                    <ul className={styles.details}>
                        {templates?.map(item => (
                            <li
                                onClick={() => {
                                    router.push(
                                        `/${option[direction]}/${item.slug}?slug=${item.slug}&search=&parentCategory=${item.slug}`
                                    );
                                    onClick();
                                }}
                                key={item.id}
                                className={styles.detail}>
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
