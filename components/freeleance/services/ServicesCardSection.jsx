import React from 'react';
import { Empty } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import styles from './ServiceFilterSection.module.scss';
import ServiceCard from '../../../entities/cards/service-card';
import ServiceFirstCard from './service-first-card';
const ServicesCardSection = ({ services }) => {
    const hasProducts = services?.items?.length > 0;
    return (
        <div className={styles.servicesSection}>
            <div>
                <div>
                    {hasProducts ? (
                        <div className='row px-1 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-gap-4'>
                            <div className="col px-md-3 px-1">
                                <ServiceFirstCard />
                            </div>
                            {services.items.map((service, index) => (
                                <div key={index} className="col px-md-3 px-1">
                                    <ServiceCard service={service} />
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
