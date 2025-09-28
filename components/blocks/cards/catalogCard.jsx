import React from 'react';
import styles from './card.module.scss';
import Link from 'next/link';

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
        '/static/img/HomePage/3d3.webp'
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
}
const CatalogCard = ({ content_type, title }) => {

    return (
        <Link href={service[content_type]}>
            <div className={styles.catalogCard}>
                <div className="d-flex gap-3 align-items-center">
                    <div>
                        <h2 className={styles.cardLabel}>{title}</h2>
                    </div>
                </div>
                <div className={styles.cardImageBlock}>
                    <div className={styles.cardBlockRight}>
                        <div className={styles.cardBlockRightTop}>
                            {cardImages[content_type]?.map(img =>
                                <div
                                    className={styles.cardBlockRightTopRight}
                                    style={{
                                        backgroundImage: `url(${img ||
                                            '/static/img/not-found.png'})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: 'center',
                                    }}>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CatalogCard;
