import React from 'react';
import styles from '../styles/LastOpened.module.scss';
import LastOpenedCard from '../ui/LastOpenedCard';
import { Col, Row } from 'antd';
import useLastOpened from '../../chat/api/useLastOpened';
import { useRouter } from 'next/router';
const LastOpened = () => {
    const { push } = useRouter();
    const { data } = useLastOpened();
    console.log('data', data);

    return (
        <div className="px-5">
            <div className={styles.freelance_section}>
                <div className={styles.freelance_text}>
                    <div className={styles.titleWrapper}>
                        <span>
                            <h1>So’ngi ochilgan xizmatlar</h1>
                            <p>Xizmatni tanlang – Buyurtma bering</p>
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
            <Row className="py-5 justify-content-center" gutter={[15, 15]}>
                {data &&
                    data.map(item => (
                        <Col md={12} xs={24} lg={8} xl={6}>
                            <LastOpenedCard
                                title={item.title}
                                image={item.poster}
                                author={item.user.full_name}
                                price={item.price}
                                slug={item.slug}
                                userImage={item.user.photo_url}
                            />
                        </Col>
                    ))}
            </Row>
        </div>
    );
};

export default LastOpened;
