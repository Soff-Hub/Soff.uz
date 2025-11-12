import React, { useState } from 'react';
import styles from './styles/freelancers.module.scss';
import dynamic from 'next/dynamic';
import FreelancersFilterHeader from './elements/FreelancersFilterHeader';
import FreelancersFilterMenu from './elements/FreelancersFilterMenu';
import FreelancersFilterResult from './elements/FreelancersFilterResult';

const FreelancerSearchInput = dynamic(
    () => import('./elements/FreelancerSearchInput'),
    {
        ssr: false,
    }
);

function Freelancers({ data }) {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    console.log('Freelancers component data:', data);

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
                <FreelancersFilterHeader toggleCollapsed={toggleCollapsed} />
                <div className={styles.freelancersFilterResult}>
                    <FreelancersFilterMenu collapsed={collapsed} />
                    <FreelancersFilterResult data={data} />
                </div>
            </div>
        </div>
    );
}

export default Freelancers;
