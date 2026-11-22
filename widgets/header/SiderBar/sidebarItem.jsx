import React, { useState } from 'react';
import styles from './style.module.scss';
import Link from 'next/link';
import { Collapse } from 'antd';
import { useRouter } from 'next/router';

const option = {
    scientific_work: 'scientific-resources',
    three_d: '3d-models-and-interior-designs',
    web: 'websites',
    dizayn: 'design-developments',
    document: 'templates',
    video: 'video-lessons',
};

const SideBarItem = ({ products, templates, direction, onClick }) => {
    return (
        <div className={styles.menuItem}>
            <div className={styles.accordion}>
                {templates?.length > 0 && (
                    <div className={styles.templates}>
                        <h3 className={styles.sectionLabel}>Tayyor mahsulotlar</h3>
                        <ul className={styles.details}>
                            {templates.map((item) => (
                                <li key={item.id} className={styles.detail}>
                                    <Link
                                        href={`/${option[direction]}/${item.slug}?slug=${item.slug}&search=&parentCategory=${item.slug}&title=${item.title}`}>
                                        <a
                                            onClick={onClick}
                                            className="text-decoration-none text-dark d-block w-100">
                                            {item.title}
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {products?.length > 0 && (
                    <div className={styles.orders}>
                        <h3 className={styles.sectionLabel}>Buyurtma berish</h3>
                        <ul className={styles.details}>
                            {products.map((item) => (
                                <li key={item.id} className={styles.detail}>
                                    <Link
                                        href={`/orders?direction=${direction}&parent_category_id=${item.id}&title=${item.title}`}>
                                        <a
                                            onClick={onClick}
                                            className="text-decoration-none text-dark d-block w-100">
                                            {item.title}
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SideBarItem;
