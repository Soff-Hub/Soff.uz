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
                    className="row"
                    style={{
                        minHeight: isFewProducts ? '50vh' : 'auto',
                        alignItems: isFewProducts ? 'center' : 'stretch',
                        display: 'flex',
                        padding: '0px 10px',
                    }}>
                    {hasProducts ? (
                        <div className={styles.serviceCardSections}>
                            {services.items.map((service, index) => (
                                <div key={index} className="h-100">
                                    <LastOpenedCard
                                        title={service.title}
                                        image={service.poster}
                                        author={service.user.full_name}
                                        price={service.price}
                                        slug={service.slug}
                                        userImage={service.user.photo_url}
                                    />
                                </div>
                            ))}
                            {/*  className="col-6  col-md-4 col-lg-3 px-1 custom-col-5 mb-4" */}
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
