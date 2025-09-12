import React, { useState } from 'react';
import styles from '../styles/menuItem.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';

const option = {
    scientific_work: 'Ilmiy va Akademik Xizmatlar',
    three_d: '3D Dizayn va Vizualizatsiya',
    web: 'Dasturlash xizmatlari',
    dizayn: 'Dizayn',
    document: 'Shablonlar',
};

const templateLink = {
    scientific_work: 'scientific-resources',
    three_d: '3d-models-and-interior-designs',
    web: 'websites',
    dizayn: 'design-developments',
    document: 'templates',
};

export const MenuItem = ({ products, templates, label }) => {
    const router = useRouter();

    return (
        <div className={styles.menuItem}>
            <button type="button" className={styles.label}>
                {option[label]}
            </button>
            <div className={styles.dropDown}>
                <div className={styles.templates}>
                    <h3 style={{ cursor: "pointer" }} onClick={() => router.push(`/${templateLink[label]}/all`)} className={styles.sectionLabel}>Tayyor mahsulotlar</h3>
                    <ul className={styles.details}>
                        {templates.map(item => (
                            <Link key={item.id} href={`/${templateLink[label]}/${item.slug}?slug=${item.slug}&search=&parentCategory=${item.slug}&title=${item.title}`}>
                                <p className={styles.detail}>{item.title}</p>
                            </Link>
                        ))}
                    </ul>
                </div>
                <div className={styles.orders}>
                    <h3 style={{ cursor: "pointer" }} onClick={() => router.push(`/orders?direction=${label}`)} className={styles.sectionLabel}>Buyurtma berish</h3>
                    <ul className={styles.details}>
                        {products.map(item => (
                            <Link key={item.id} href={`/orders?direction=${label}&parent_category_id=${item.id}&title=${item.title}`}>
                                <p className={styles.detail}>{item.title}</p>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

{
    /* {items.map(item => (
                        <div key={item.title}>
                            <p className={styles.detailsTitle}>{item.title}</p>
                            <ul className={styles.details}>
                                {item.children.map(child => (
                                    <li key={child} className={styles.detail}>
                                        {child}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))} */
}
