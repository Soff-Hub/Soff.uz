import React from 'react';
import { useTranslation } from 'next-i18next';
import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const ServiceFirstCard = () => {
    const { t } = useTranslation('orders');
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { push, query } = useRouter();

    const handleOrder = () => {
        if (isLoggedIn) {
            push(
                `/order/create?${
                    query?.direction && `direction=${query.direction}`
                }`
            );
        } else {
            push(
                '/auth/login?returnUrl=' + encodeURIComponent('/order/create')
            );
        }
    };

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{t('serviceFirstCard.title')}</h3>
            <button onClick={handleOrder} className={styles.btn}>
                {t('serviceFirstCard.button')}
            </button>
        </div>
    );
};

export default ServiceFirstCard;
