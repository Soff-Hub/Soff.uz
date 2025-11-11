import React from 'react';
import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const ServiceFirstCard = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { push, query } = useRouter();

    const handleOrder = () => {
        if (isLoggedIn) {
            push(`/order/create?${query?.direction && `direction=${query.direction}`}`);
        } else {
            push(
                '/auth/login?returnUrl=' + encodeURIComponent('/order/create')
            );
        }
    };

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>
                Ishingizni frilanserlarga topshiring.
            </h3>
            <button onClick={handleOrder} className={styles.btn}>
                Hoziroq buyurtma berish
            </button>
        </div>
    );
};

export default ServiceFirstCard;
