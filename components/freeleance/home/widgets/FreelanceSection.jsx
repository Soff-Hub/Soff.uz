// FreelanceSection.jsx
import React from 'react';
import styles from '../styles/Freelance.module.scss';
import { useRouter } from 'next/router';
import ServiceCard from '~/components/blocks/cards/serviceCard';
import { Image as AntImage } from 'antd';

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

const FreelanceSection = () => {
    const { push } = useRouter();
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
                            <h1 className={styles.labelWrapperH1}>
                                Xizmatni tanlang – Buyurtma bering
                            </h1>

                            <p className={styles.labelWrapperP}>
                                Tajribali frilanserlar bilan ishlang va sifatli
                                natijaga erishing.
                            </p>
                        </div>
                    </div>
                </div>
                <button
                    className={styles.freelance_button}
                    size="large"
                    onClick={() => push('orders')}>
                    Barcha xizmatlar
                    <img
                        src={'/static/img/arrowwhite.svg'}
                        sizes="15"
                        alt="arrow"
                    />
                </button>
            </div>
            <div className={styles.serviceCardSection}>
                {items.map(item => (
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

export default FreelanceSection;
