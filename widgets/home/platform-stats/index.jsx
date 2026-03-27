import React from 'react';
import styles from './style.module.scss';

const PlatformStats = () => {
    return (
        <section className={styles.platformStats}>
            <div className="container">
                <span className={styles.statsLabel}>Minglab kreatorlar ishongan platforma</span>
                <div className={styles.statsGrid}>
                    <div className={styles.statItem}>
                        <span className={styles.val}>250,000+</span>
                        <span className={styles.name}>Raqamli mahsulotlar</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.val}>500,000+</span>
                        <span className={styles.name}>Oylik faol foydalanuvchilar</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.val}>86,000+</span>
                        <span className={styles.name}>Tranzaksiyalar</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.val}>11,000+</span>
                        <span className={styles.name}>Mutaxassislar soni</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlatformStats;
