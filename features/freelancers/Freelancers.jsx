import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import styles from './styles/freelancers.module.scss';
import dynamic from 'next/dynamic';
import FreelancersFilterHeader from './elements/FreelancersFilterHeader';
import FreelancersFilterMenu from './elements/FreelancersFilterMenu';
import FreelancersFilterDrawer from './elements/FreelancersFilterDrawer';
import FreelancersFilterResult from './elements/FreelancersFilterResult';
import useResponsive from '~/shared/utilities/useResponsive';

const FreelancerSearchInput = dynamic(
    () => import('./elements/FreelancerSearchInput'),
    {
        ssr: false,
    }
);

function Freelancers({ data }) {
    const { t } = useTranslation('freelancers');
    const { isDesktop } = useResponsive();
    const [collapsed, setCollapsed] = useState(false);
    const [viewType, setViewType] = useState('horizontal');

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const handleViewChange = (value) => {
        setViewType(value);
    };

    useLayoutEffect(() => {
        if (isDesktop) {
            setCollapsed(true);
        }
    }, [isDesktop]);

    return (
        <div className={`${styles.freelancers} container`}>
            <div className={styles.freelancersWrapper}>
                <h1 className={styles.headline}>
                    {t('hero.title')}
                </h1>
                <p className={styles.heroParagraph}>
                    {t('hero.description')}
                </p>
                <FreelancerSearchInput />
            </div>
            <div className={styles.freelancersFilter}>
                <FreelancersFilterHeader
                    toggleCollapsed={toggleCollapsed}
                    collapsed={collapsed}
                    viewType={viewType}
                    onViewChange={handleViewChange}
                />
                <div className={styles.freelancersFilterResult}>
                    {isDesktop ? (
                        <FreelancersFilterMenu collapsed={collapsed} />
                    ) : (
                        <FreelancersFilterDrawer
                            collapsed={collapsed}
                            toggleCollapsed={toggleCollapsed}
                        />
                    )}
                    <FreelancersFilterResult
                        collapsed={collapsed}
                        data={data}
                        viewType={viewType}
                    />
                </div>
            </div>
        </div>
    );
}

export default Freelancers;
