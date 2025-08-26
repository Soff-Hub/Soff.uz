import React from 'react';
import styles from '../styles/TwoCard.module.scss';
import { useRouter } from 'next/router';

const TwoCard = () => {
    const { push } = useRouter();

    return (
        <div className={styles.wrapper}>
            <div
                className={styles.card}
                style={{ backgroundImage: 'url(/static/img/backdrop.jpg)' }}>
                <span className={styles.backdrop} />
                <h2 className={styles.title}>
                    Tayyor mahsulotlar bilan vaqtingizni tejang
                </h2>
                <div className={styles.actions}>
                    <button className={styles.btn}>
                        {/* 
                        onClick={() => push('/scientific-resources/all')} */}
                        Barcha mahsulotlar{' '}
                        <img
                            src="/static/img/arrowfig.png"
                            height={15}
                            width={45}
                            alt="Arrow"
                            className={styles.arrowIcon}
                        />
                    </button>
                </div>
            </div>

            <div
                className={styles.card}
                style={{ backgroundImage: 'url(/static/img/backdrop2.jpg)' }}>
                <span className={styles.backdrop} />
                <h2 className={styles.title}>
                    Loyihangizni frilanserlar bilan ishga tushiring
                </h2>
                <div className={styles.actions}>
                    <button
                        className={styles.btn}
                        onClick={() =>
                            push('/orders?direction=scientific_work')
                        }>
                        Buyurtma berish{' '}
                        <img
                            src="/static/img/arrowfig.png"
                            height={15}
                            width={45}
                            alt="Arrow"
                            className={styles.arrowIcon}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TwoCard;
