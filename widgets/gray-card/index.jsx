import React from 'react';
import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { FaArrowRight } from 'react-icons/fa';
import { FaBox } from 'react-icons/fa';

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
                <div className={styles.watermarkTopRight}>SOFF</div>
                <div className={styles.watermarkBottomRight}>SOFF</div>
                <div className={styles.iconWrapper}>
                    <div className={styles.iconBox}>
                        <FaBox className={styles.icon} />
                    </div>
                </div>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.subtitle}>
                    Bizning mutaxassislarimiz sizga yordam berishga tayyor
                </p>
                <a
                    onClick={handleOrder}
                    href={link}
                    target="_blank"
                    className={styles.catalogSeeAll}>
                    {btn}{' '}
                    <FaArrowRight
                        className={styles.arrowIcon}
                        style={{
                            marginLeft: '3px',
                        }}
                    />
                </a>
            </div>
        </section>
    );
};

export default GrayCard;
