import React from 'react';
import styles from './style.module.scss';
import Image from 'next/image';
import cardStyles from './card.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

const title = {
    '3d': '3D Moddellar',
    website: 'Veb Saytlar',
    design: 'Grafik Dizaynlar',
    video: 'Video Darslar',
    template: 'Shablonlar',
    file: 'Ilmiy Ishlar',
};

const data = [
    {
        direction: 'file',
    },
    {
        direction: '3d',
    },
    {
        direction: 'design',
    },
    {
        direction: 'template',
    },
    {
        direction: 'video',
    },
    {
        direction: 'website',
    },
];
const Catalog = ({ inFile }) => {
    const router = useRouter();
    return (
        <div className={styles.catalogSectionBlock}>
            <div className="container mx-auto">
                {!inFile && (
                    <>
                        <div className={styles.catalogHealine}>
                            <div className="d-flex gap-2 flex-fill">
                                {' '}
                                <div>
                                    <Image
                                        src={'/static/img/star.svg'}
                                        width={40}
                                        height={40}
                                        alt="starts"
                                    />
                                </div>
                                <div className={styles.catalogWrapper}>
                                    <h2 className={styles.catalogLabel}>
                                        Tayyor mahsulotlar katalogi
                                    </h2>
                                    <p className={styles.catalogSubLabel}>
                                        Sifatli va tayyor ishlardan foydalaning,
                                        vaqt va kuchingizni tejang.
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() =>
                                    router.push('/scientific-resources/all')
                                }
                                className={styles.catalogSeeAll}>
                                Barcha mahsulotlar{' '}
                                <Image
                                    src={'/static/img/arrowwhite.svg'}
                                    width={40}
                                    height={20}
                                    alt="arrow"
                                />
                            </button>
                        </div>
                        <div className={styles.catalogCardsSection}>
                            {data?.map((item) => (
                                <CatalogCard
                                    key={item.direction}
                                    content_type={item.direction}
                                    title={title[item.direction]}
                                />
                            ))}
                        </div>
                    </>
                )}
                <section className={styles.howItWorksSection}>
                    <div className="d-flex justify-content-center my-5">
                        <Image
                            width={30}
                            height={30}
                            src={'/static/img/star.svg'}
                            alt="starts"
                        />
                    </div>
                    <h2>Tayyor mahsulotlardan foydalanish qanday ishlaydi?</h2>
                    <div className={styles.steps}>
                        <div className={styles.stepItem}>
                            <img
                                src={'/static/img/catalogMenu.png'}
                                alt="starts"
                            />
                            <div>
                                <h3>Qidiring va tanlang</h3>
                                <p>
                                    Katalogdan yoki qidiruv orqali sizga kerakli
                                    tayyor mahsulotni toping.
                                </p>
                            </div>
                        </div>
                        <div className={styles.stepItem}>
                            <img
                                src={'/static/img/catalogCoin.png'}
                                alt="starts"
                            />
                            <div>
                                <h3>Sotib oling</h3>
                                <p>
                                    Xavfsiz to‘lov tizimi orqali mahsulotni
                                    sotib oling — narx va shartlar oldindan
                                    ko‘rinadi.
                                </p>
                            </div>
                        </div>
                        <div className={styles.stepItem}>
                            <img
                                src={'/static/img/catalogSecure.png'}
                                alt="starts"
                            />
                            <div>
                                <h3>Yuklab oling va foydalaning</h3>
                                <p>
                                    Mahsulotni darhol yuklab oling va
                                    ishlatishni boshlang.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Catalog;

const service = {
    '3d': '/3d-models-and-interior-designs/all',
    website: '/websites/all',
    design: '/design-developments/all',
    video: '/video-lessons/all',
    template: '/templates/all',
    file: '/scientific-resources/all',
};

const cardImages = {
    '3d': [
        '/static/img/HomePage/3d1.webp',
        '/static/img/HomePage/3d2.webp',
        '/static/img/HomePage/3d3.webp',
    ],
    website: [
        '/static/img/HomePage/web1.webp',
        '/static/img/HomePage/web2.webp',
        '/static/img/HomePage/web3.webp',
    ],
    design: [
        '/static/img/HomePage/design1.webp',
        '/static/img/HomePage/design2.webp',
        '/static/img/HomePage/design3.webp',
    ],
    video: [
        '/static/img/HomePage/video1.webp',
        '/static/img/HomePage/video2.webp',
        '/static/img/HomePage/video3.webp',
    ],
    template: [
        '/static/img/HomePage/template1.webp',
        '/static/img/HomePage/template2.webp',
        '/static/img/HomePage/template3.webp',
    ],
    file: [
        '/static/img/HomePage/file1.webp',
        '/static/img/HomePage/file2.webp',
        '/static/img/HomePage/file3.webp',
    ],
};
const CatalogCard = ({ content_type, title }) => {
    return (
        <Link href={service[content_type]}>
            <div className={cardStyles.catalogCard}>
                <div className="d-flex gap-3 align-items-center">
                    <div>
                        <h2 className={cardStyles.cardLabel}>{title}</h2>
                    </div>
                </div>
                <div className={cardStyles.cardImageBlock}>
                    <div className={cardStyles.cardBlockRight}>
                        <div className={cardStyles.cardBlockRightTop}>
                            {cardImages[content_type]?.map((img) => (
                                <div
                                    className={
                                        cardStyles.cardBlockRightTopRight
                                    }
                                    style={{
                                        backgroundImage: `url(${
                                            img || '/static/img/not-found.png'
                                        })`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
