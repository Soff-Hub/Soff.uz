import React, { useState } from 'react';
import styles from '../styles/menuItem.module.scss';
export const MenuItem = ({ items, label }) => {
    return (
        <div className={styles.menuItem}>
            <button type="button" className={styles.label}>
                {label}
            </button>
            <div className={styles.dropDown}>
                <div className={styles.orders}>
                    <h3 className={styles.sectionLabel}>Buyurtma berish</h3>
                    <ul className={styles.details}>
                        {items.orders.map(item => (
                            <li className={styles.detail}>{item.label}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.templates}>
                    <h3 className={styles.sectionLabel}>Tayyor mahsulotlar</h3>
                    <ul className={styles.details}>
                        {items.templates.map(item => (
                            <li className={styles.detail}>{item.label}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
