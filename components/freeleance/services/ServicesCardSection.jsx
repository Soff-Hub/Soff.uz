import React from 'react';
import { Empty } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import styles from './ServiceFilterSection.module.scss';
import LastOpenedCard from '../home/ui/LastOpenedCard';
const ServicesCardSection = ({ services }) => {
    const hasProducts = services?.items?.length > 0;
    const isFewProducts = services?.items?.length < 4; // Kam bo‘lsa ham 100vh qilamiz

    return (
        <div className={styles.servicesSection}>
            <div className="">
                <div
                    className="">
                    {hasProducts ? (
                        <div className='row px-1 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-gap-4'>
                            {services.items.map((service, index) => (
                                <div key={index} className="col px-2">
                                    <LastOpenedCard
                                        title={service.title}
                                        image={service.poster}
                                        author={service.user}
                                        price={service.price}
                                        slug={service.slug}
                                        userImage={service.user.photo_url}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="col-12">
                            <div
                                style={{
                                    padding: '50px 0',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    backgroundColor: '#fafafa',
                                    borderRadius: '8px',
                                    height: '50vh',
                                }}>
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    description={
                                        <span
                                            style={{
                                                fontSize: '16px',
                                                color: '#666',
                                            }}>
                                            Hozircha hech qanday xizmat
                                            topilmadi
                                        </span>
                                    }
                                />
                                <p
                                    style={{
                                        color: '#999',
                                        marginTop: '10px',
                                    }}>
                                    Qidiruv yoki filtrlarni o‘zgartirib ko‘ring{' '}
                                    <SmileOutlined />
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ServicesCardSection;
