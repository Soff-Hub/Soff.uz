// FreelanceSection.jsx
import React from 'react';
import styles from '../styles/Freelance.module.scss';
import { Col, Row } from 'antd';
import { useRouter } from 'next/router';
import ServiceCard from '~/components/blocks/cards/serviceCard';

const items = [
    {
        label: 'Ilmiy va Akademik Xizmatlar',
        content_type: 'file',
        images: {
            left: '/static/img/land-design.png',
            rightTop: '/static/img/land-dev.png',
            rightBot: '/static/img/land-file.png',
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
        <div>
            <div className={styles.freelance_section}>
                <div className={styles.freelance_text}>
                    <div className={styles.titleWrapper}>
                        <img
                            src="/static/img/HomePage/icon.png"
                            alt="badge"
                            className={styles.badge}
                        />
                        <span>
                            <h1>Xizmatni tanlang – Buyurtma bering</h1>

                            <p>
                                Tajribali frilanserlar bilan ishlang va sifatli
                                natijaga erishing.
                            </p>
                        </span>
                    </div>
                </div>
                <button
                    className={styles.freelance_button}
                    size="large"
                    onClick={() => push('/orders')}>
                    <span>Barcha xizmatlar</span>

                    <img
                        src={'/static/img/arrowfig.png'}
                        width={45}
                        height={5}
                        alt="arrow"
                    />
                </button>
            </div>

            {/* Cardlar */}
            <Row className="py-5 justify-content-center" gutter={[16, 16]}>
                {items.map(item => (
                    <Col md={12} xs={24} lg={8} xl={6}>
                        <ServiceCard content_type="file" items={item.images} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default FreelanceSection;
