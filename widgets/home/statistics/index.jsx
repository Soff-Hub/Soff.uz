import React from 'react';
import styles from './style.module.scss';
import { useTranslation } from 'next-i18next';

const Statistics = () => {
    const { t } = useTranslation('index');
    
    const stats = [
        { title: t('statistics.digitalProducts'), value: 250000 },
        { title: t('statistics.activeUsers'), value: 500000 },
        { title: t('statistics.transactions'), value: 86000 },
        { title: t('statistics.specialists'), value: 11000 },
    ];

    return (
        <div className={styles.statsWrapper}>
            <img
                src="/static/img/HomePage/icon.png"
                alt="badge"
                className="mb-5"
            />
            <h2 className={styles.title}>{t('statistics.title')}</h2>
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
