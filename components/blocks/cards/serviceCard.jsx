import React from 'react';
import styles from './service.module.scss';
import { useRouter } from 'next/router';

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
const ServiceCard = ({ content_type = 'file', items = {} }) => {
    const router = useRouter();

    return (
        <div
            className={styles.catalogCard}
            onClick={() => router.push(link[content_type])}>
            <div className={styles.cardImageBlock}>
                <div
                    className={styles.cardBlockLeft}
                    style={{
                        backgroundImage: `url(${items.left ||
                            '/static/img/not-found.png'})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}> 
                </div>
                <div className={styles.cardBlockRight}>
                    <div
                        className={styles.cardBlockRightBottom}
                        style={{
                            backgroundImage: `url(${items.rightTop ||
                                '/static/img/not-found.png'})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                        }}></div>
                    <div
                        className={styles.cardBlockRightBottom}
                        style={{
                            backgroundImage: `url(${items.rightBot ||
                                '/static/img/not-found.png'})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                        }}></div>
                </div>
            </div>
            <div className="d-flex flex-column flex-fill">
                <h3 className={styles.cardTile}>{title[content_type]}</h3>
                {/* <p className={styles.cardSubTitle}>200+ mahsulot</p> */}
            </div>
        </div>
    );
};

export default ServiceCard;
