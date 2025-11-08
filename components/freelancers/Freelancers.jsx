import React from 'react';
import styles from './styles/freelancers.module.scss';
import dynamic from 'next/dynamic';

const FreelancerSearchInput = dynamic(
    () => import('./elements/FreelancerSearchInput'),
    {
        ssr: false,
    }
);

function Freelancers({ data }) {
    console.log('Freelancers component data:', data);

    return (
        <div className={styles.freelancers}>
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
        </div>
    );
}

export default Freelancers;
