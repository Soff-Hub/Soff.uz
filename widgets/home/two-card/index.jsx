import React from 'react';
import styles from './style.module.scss';
import Link from 'next/link';

const TwoCard = () => {
    return (
        <>
            <div className={styles.wrapper}>
                <div
                    className={styles.card}
                    style={{
                        backgroundImage: 'url(/static/img/backdrop.jpg)',
                    }}>
                    <span className={styles.backdrop} />
                    <h2 className={styles.title}>
                        Tayyor mahsulotlar bilan vaqtingizni tejang
                    </h2>
                    <div className={styles.actions}>
                        <Link href="/scientific-resources/all">
                            <button className={styles.btn}>
                                Barcha mahsulotlar{' '}
                                <img
                                    src="/static/img/arrowfig.png"
                                    height={15}
                                    width={45}
                                    alt="Arrow"
                                    className={styles.arrowIcon}
                                />
                            </button>
                        </Link>
                    </div>
                </div>

                <div
                    className={styles.card}
                    style={{
                        backgroundImage: 'url(/static/img/backdrop2.jpg)',
                    }}>
                    <span className={styles.backdrop} />
                    <h2 className={styles.title}>
                        Loyihangizni frilanserlar bilan ishga tushiring
                    </h2>
                    <div className={styles.actions}>
                        <Link href="/orders?direction=scientific_work">
                            <button className={styles.btn}>
                                Buyurtma berish{' '}
                                <img
                                    src="/static/img/arrowfig.png"
                                    height={15}
                                    width={45}
                                    alt="Arrow"
                                    className={styles.arrowIcon}
                                />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TwoCard;
