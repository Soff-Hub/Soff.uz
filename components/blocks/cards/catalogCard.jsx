import Image from 'next/image';
import React from 'react';
import styles from './card.module.scss';
import { useRouter } from 'next/router';

const service = {
    '3d': '/3d-models-and-interior-designs/all',
    website: '/websites/all',
    design: '/design-developments/all',
    video: '/video-lessons/all',
    template: '/templates/all',
    file: '/scientific-resources/all',
};
const CatalogCard = ({ content_type, title, count, items }) => {
    const router = useRouter();
    const [first, second, third, fourth] = items;

    return (
        <div
            className={styles.catalogCard}
            onClick={() => router.push(service[content_type])}>
            <div className="d-flex gap-3 align-items-center">
                <div className={styles.cardIcon}>
                    <Image
                        src={`/static/img/${content_type}.png`}
                        alt="Catalog Image"
                        width={50}
                        height={50}
                    />
                </div>
                <div>
                    <h2 className={styles.cardLabel}>{title}</h2>
                    <p className={styles.cardDesc}>{count}+ mahsulot</p>
                </div>
            </div>
            <div className={styles.cardImageBlock}>
                <div
                    className={styles.cardBlockLeft}
                    style={{
                        backgroundImage: `url(${first?.poster_url ||
                            '/static/img/not-found.png'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}></div>
                <div className={styles.cardBlockRight}>
                    <div className={styles.cardBlockRightTop}>
                        <div
                            className={styles.cardBlockRightTopLeft}
                            style={{
                                backgroundImage: `url(${second?.poster_url ||
                                    '/static/img/not-found.png'})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}></div>
                        <div
                            className={styles.cardBlockRightTopRight}
                            style={{
                                backgroundImage: `url(${third?.poster_url ||
                                    '/static/img/not-found.png'})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}></div>
                    </div>
                    <div
                        className={styles.cardBlockRightBottom}
                        style={{
                            backgroundImage: `url(${fourth?.poster_url ||
                                '/static/img/not-found.png'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}></div>
                </div>
            </div>
        </div>
    );
};

export default CatalogCard;
