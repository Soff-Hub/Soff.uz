import React from 'react';
import styles from './style.module.scss';

const Title = () => {
    return (
        <div className={styles.wrapper}>
            <img src="/static/img/star.svg" alt="icon" />
            <h3 className={styles.subtitle}>
                Raqamli mahsulotlar va onlayn xizmatlar bozori
            </h3>
            <h2 className={styles.title}>SOFF.UZ</h2>
        </div>
    );
};

export default Title;
