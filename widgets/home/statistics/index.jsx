import React from 'react';
import styles from './style.module.scss';

const stats = [
    { title: 'Raqamli mahsulotlar', value: 1000000 },
    { title: 'Oylik faol foydalanuvchilar', value: 600000 },
    { title: 'Tranzaksiyalar', value: 200000 },
    { title: 'Mutaxassislar soni', value: 30000 },
];

const Statistics = () => {
    return (
        <div className={styles.statsWrapper}>
            <img
                src="/static/img/HomePage/icon.png"
                alt="badge"
                className="mb-5"
            />
            <h2 className={styles.title}>Statistik ma’lumotlar</h2>
            <div className={styles.statSection}>
                {stats.map((item, idx) => (
                    <div key={item.title} className={styles.statCard}>
                        <div className={styles.value}>
                            {item.value.toLocaleString()}+
                        </div>
                        <div className={styles.label}>{item.title}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Statistics;
