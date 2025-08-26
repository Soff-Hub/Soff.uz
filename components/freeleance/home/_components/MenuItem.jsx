import React, { useState } from 'react';
import styles from '../styles/menuItem.module.scss';

const option = {
    scientific_work: 'Ilmiy va Akademik Xizmatlar',
    three_d: '3D Dizayn va Vizualizatsiya',
    web: 'Dasturlash xizmatlari',
    dizyn: 'Dizayn',
    document: 'Shablonlar',
};

const link = {
    templates:
        'scientific-resources/?slug=all&search=&parentCategory=dars-1&childCategory=',
    orders:
        'orders?direction=scientific_work&search=&parent_category_id=&category_id=',
};

export const MenuItem = ({ products, templates, label }) => {
    return (
        <div className={styles.menuItem}>
            <button type="button" className={styles.label}>
                {option[label]}
            </button>
            <div className={styles.dropDown}>
                <div className={styles.orders}>
                    <h3 className={styles.sectionLabel}>Buyurtma berish</h3>
                    <ul className={styles.details}>
                        {products.map(item => (
                            <li key={item.id} className={styles.detail}>
                                {item.title}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.templates}>
                    <h3 className={styles.sectionLabel}>Tayyor mahsulotlar</h3>
                    <ul className={styles.details}>
                        {templates.map(item => (
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
