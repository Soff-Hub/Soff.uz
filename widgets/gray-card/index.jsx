import React from 'react';
import styles from './style.module.scss';
const GrayCard = ({
    title = '',
    btn = '',
    goProducts = () => { },
    link = '',
}) => {
    return (
        <section className={styles.readyProducts}>
            <div className={styles.block}>
                <h1 className={styles.title}>{title}</h1>
                <a
                    onClick={goProducts}
                    href={link}
                    target='_blank'
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
