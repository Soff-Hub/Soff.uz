import React from 'react';
import styles from '../styles/TwoCard.module.scss';
import { useRouter } from 'next/router';
import useResponsive from '~/utilities/useResponsive';
import Link from 'next/link';

const TwoCard = () => {
    const { push } = useRouter();
    const { isMobile, isTablet } = useResponsive();
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
            {/* <div className="mt-5 mx-lg-5">
                <iframe
                    height="300"
                    src={`https://www.youtube.com/embed/RW65MEGen4w?modestbranding=1&showinfo=0&rel=0&controls=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                        width: '100%',
                        border: 'none',
                        height: isMobile
                            ? '280px'
                            : isTablet
                            ? '440px'
                            : '640px',
                    }}></iframe>
            </div> */}
        </>
    );
};

export default TwoCard;
