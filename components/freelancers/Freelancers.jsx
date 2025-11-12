import React, { useState } from 'react';
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
    const [collapsed, setCollapsed] = useState(false);
    const { isMobile, isTablet, isDesktop } = useResponsive();

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className={`${styles.freelancers} container`}>
            <div className={styles.freelancersWrapper}>
                <h1 className={styles.headline}>
                    Loyihangiz uchun eng yaxshi mutaxassislar
                </h1>
                <p className={styles.heroParagraph}>
                    O‘z loyihangizni boshlash uchun tajribali va ishonchli
                    frilanserlarni shu yerdan toping.
                </p>
                <FreelancerSearchInput />
            </div>
            <div className={styles.freelancersFilter}>
                <FreelancersFilterHeader
                    toggleCollapsed={toggleCollapsed}
                    collapsed={collapsed}
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
                    />
                </div>
            </div>
        </div>
    );
}

export default Freelancers;
