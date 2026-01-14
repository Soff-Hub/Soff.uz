import React from 'react';
import styles from './style.module.scss';
import { useTranslation } from 'next-i18next';

const Info = () => {
    const { t } = useTranslation('index');
    
    const steps = [
        {
            id: 1,
            title: t('info.steps.step1.title'),
            description: t('info.steps.step1.description'),
        },
        {
            id: 2,
            title: t('info.steps.step2.title'),
            description: t('info.steps.step2.description'),
        },
        {
            id: 3,
            title: t('info.steps.step3.title'),
            description: t('info.steps.step3.description'),
        },
        {
            id: 4,
            title: t('info.steps.step4.title'),
            description: t('info.steps.step4.description'),
        },
    ];

    return (
        <div>
            <div className={styles.titleWrapper}>
                <img src="/static/img/HomePage/icon.png" alt="" />
                <h2>{t('info.title')}</h2>
                <h3>{t('info.subtitle')}</h3>
            </div>
            <div className={styles.stepsSection}>
                {steps.map((step) => (
                    <InfoCard
                        key={step.title}
                        id={step.id}
                        title={step.title}
                        subtitle={step.description}
                    />
                ))}
            </div>
        </div>
    );
};

export default Info;

const InfoCard = ({ id, title, subtitle }) => {
    return (
        <div className={styles.stepCard}>
            <div className="d-flex align-items-center gap-2 flex-column">
                <div className={styles.icon}>
                    <span className="d-inline">0{id}</span>
                </div>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.subtitle}>{subtitle}</p>
            </div>
            {id == 2 && (
                <img
                    className={styles.two}
                    src={`/static/img/2line.png`}
                    alt="line"
                />
            )}
            {id == 3 && (
                <img
                    className={styles.three}
                    src={`/static/img/3line.png`}
                    alt="line"
                />
            )}
            {id == 4 && (
                <img
                    className={styles.two}
                    src={`/static/img/4line.png`}
                    alt="line"
                />
            )}
        </div>
    );
};
