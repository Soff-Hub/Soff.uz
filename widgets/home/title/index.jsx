import React from 'react';
import styles from './style.module.scss';
import { useTranslation } from 'next-i18next';

const Title = () => {
    const { t } = useTranslation('index');
    
    return (
        <div className={styles.wrapper}>
            <img src="/static/img/star.svg" alt="icon" />
            <h3 className={styles.subtitle}>
                {t('titleSection.subtitle')}
            </h3>
            <h2 className={styles.title}>{t('titleSection.title')}</h2>
        </div>
    );
};

export default Title;
