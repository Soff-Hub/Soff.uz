import React from 'react';
import styles from './style.module.scss';
import cardStyle from './service.module.scss';
import Link from 'next/link';

const items = [
    {
        label: 'Ilmiy va Akademik Xizmatlar',
        content_type: 'file',
        images: {
            left: '/static/img/HomePage/file1.webp',
            rightTop: '/static/img/HomePage/file2.webp',
            rightBot: '/static/img/HomePage/file3.webp',
        },
    },
    {
        label: 'Grafik va & UI, UX Dizayn xizmatlari',
        content_type: 'design',
        images: {
            left: '/static/img/HomePage/design1.webp',
            rightTop: '/static/img/HomePage/design3.webp',
            rightBot: '/static/img/HomePage/design2.webp',
        },
    },
    {
        label: 'IT & Dasturlash xizmatlari',
        content_type: 'website',
        images: {
            left: '/static/img/HomePage/web3.webp',
            rightTop: '/static/img/HomePage/web1.webp',
            rightBot: '/static/img/HomePage/web2.webp',
        },
    },
    {
        label: '3D Dizayn va Vizualizatsiya',
        content_type: '3d',
        images: {
            left: '/static/img/HomePage/3d2.webp',
            rightTop: '/static/img/HomePage/3d1.webp',
            rightBot: '/static/img/HomePage/3d3.webp',
        },
    },
];

const title = {
    '3d': '3D Dizayn va Vizualizatsiya',
    website: 'Dasturlash xizmatlari',
    design: 'Dizayn',
    file: 'Ilmiy va Akademik Xizmatlar',
};

const link = {
    '3d': '/orders?direction=three_d',
    website: '/orders?direction=web',
    design: '/orders?direction=dizayn',
    file: '/orders?direction=scientific_work',
};

const Freelance = () => {
    return (
        <>
            <div className={styles.freelance_section}>
                <div className={styles.freelance_text}>
                    <div className="d-flex  gap-2 flex-fill">
                        <div className="d-none d-md-flex">
                            <img
                                src={'/static/img/star.svg'}
                                width={30}
                                height={30}
                                alt="starts"
                            />
                        </div>
                        <div className={styles.titleWrapper}>
                            <h2 className={styles.labelWrapperH1}>
                                Xizmatni tanlang – Buyurtma bering
                            </h2>

                            <p className={styles.labelWrapperP}>
                                Tajribali frilanserlar bilan ishlang va sifatli
                                natijaga erishing.
                            </p>
                        </div>
                    </div>
                </div>
                <Link href="/orders">
                    <a className={styles.freelance_button}>
                        Barcha xizmatlar
                        <img
                            src={'/static/img/arrowwhite.svg'}
                            sizes="15"
                            alt="arrow"
                        />
                    </a>
                </Link>
            </div>
            <div className={styles.serviceCardSection}>
                {items.map((item) => (
                    <ServiceCard
                        key={item.content_type}
                        content_type={item.content_type}
                        items={item.images}
                    />
                ))}
            </div>
        </>
    );
};

export default Freelance;

const ServiceCard = ({ content_type = 'file', items = {} }) => {
    return (
        <Link href={link[content_type]}>
            <a>
                <div className={cardStyle.catalogCard}>
                    <div className={cardStyle.cardImageBlock}>
                        <div
                            className={cardStyle.cardBlockLeft}
                            style={{
                                backgroundImage: `url(${
                                    items.left || '/static/img/not-found.png'
                                })`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                            }}></div>
                        <div className={cardStyle.cardBlockRight}>
                            <div
                                className={cardStyle.cardBlockRightBottom}
                                style={{
                                    backgroundImage: `url(${
                                        items.rightTop ||
                                        '/static/img/not-found.png'
                                    })`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                }}></div>
                            <div
                                className={cardStyle.cardBlockRightBottom}
                                style={{
                                    backgroundImage: `url(${
                                        items.rightBot ||
                                        '/static/img/not-found.png'
                                    })`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                }}></div>
                        </div>
                    </div>
                    <div className="d-flex flex-column flex-fill">
                        <h3 className={cardStyle.cardTile}>
                            {title[content_type]}
                        </h3>
                    </div>
                </div>
            </a>
        </Link>
    );
};
