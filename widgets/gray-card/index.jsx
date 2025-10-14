import React from 'react';
import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const GrayCard = ({
    title = '',
    btn = '',
    goProducts = () => {},
    link = '',
}) => {
    const { push } = useRouter();
    const { isLoggedIn } = useSelector((state) => state.auth);

    const handleOrder = (e) => {
        e.preventDefault();
        if (isLoggedIn) {
            push('/order/create');
        } else {
            push(
                '/auth/login?returnUrl=' + encodeURIComponent('/order/create')
            );
        }
    };

    return (
        <section className={styles.readyProducts}>
            <div className={styles.block}>
                <h1 className={styles.title}>{title}</h1>
                <a
                    onClick={handleOrder}
                    href={link}
                    target="_blank"
                    className={styles.catalogSeeAll}>
                    {btn}{' '}
                    <i
                        style={{ marginLeft: '12px' }}
                        className="fa-solid fa-arrow-right"></i>
                </a>
            </div>
        </section>
    );
};

export default GrayCard;
