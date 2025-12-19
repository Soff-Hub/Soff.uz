import React from 'react';
import styles from './ServiceFilterSection.module.scss';
import ServiceCard from '../../../entities/service/service-card';
import ServiceFirstCard from './service-first-card';
import Search_Results_NotFound from '~/widgets/search-results/notFound';
const ServicesCardSection = ({ services }) => {
    const hasProducts = services?.items?.length > 0;
    return (
        <div className={styles.servicesSection}>
            <div>
                <div>
                    {hasProducts && (
                        <div className="row px-1 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-gap-4">
                            <div className="col px-md-3 px-1">
                                <ServiceFirstCard />
                            </div>
                            {services.items.map((service, index) => (
                                <div key={index} className="col px-md-3 px-1">
                                    <ServiceCard service={service} />
                                </div>
                            ))}
                        </div>
                    )}
                    {!hasProducts && (
                        <div>
                            <div
                                style={{
                                    paddingBottom: '30px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    backgroundColor: '#fafafa',
                                    borderRadius: '8px',
                                    minHeight: '50vh',
                                }}>
                                <Search_Results_NotFound isSearchPage={false} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ServicesCardSection;
