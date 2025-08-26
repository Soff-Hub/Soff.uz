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
            left: '/static/img/land-design.svg',
            rightTop: '/static/img/land-dev.svg',
            rightBot: '/static/img/land-file.svg',
        },
    },
    {
        label: '3D Dizayn va Vizualizatsiya',
        content_type: '3d',
        images: {
            left: '/static/img/landb-3d3.png',
            rightTop: '/static/img/landb-3d1.png',
            rightBot: '/static/img/landb-3d2.png',
        },
    },
    {
        label: 'Grafik va & UI, UX Dizayn xizmatlari',
        content_type: 'design',
        images: {
            left: '/static/img/landb-design2.png',
            rightTop: '/static/img/landb-design1.png',
            rightBot: '/static/img/landb-design3.png',
        },
    },
    {
        label: 'IT & Dasturlash xizmatlari',
        content_type: 'website',
        images: {
            left: '/static/img/landb-dev1.png',
            rightTop: '/static/img/landb-dev2.png',
            rightBot: '/static/img/landb-dev3.png',
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
                            <AntImage
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
                    onClick={() => push('orders?direction=scientific_work')}>
                    Barcha xizmatlar
                    <AntImage
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
