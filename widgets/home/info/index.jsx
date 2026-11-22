import React from 'react';
import styles from './style.module.scss';

const steps = [
    {
        id: 1,
        title: 'Xizmatni tanlang',
        description:
            'Katalogdan yoki qidiruv orqali kerakli xizmat va frilanserni toping.',
    },
    {
        id: 2,
        title: 'Tafsilot bilan tanishing',
        description: 'Tavsif, narx va frilanser reytingini ko‘rib chiqing.',
    },
    {
        id: 3,
        title: 'To‘lov qiling — xavfsiz',
        description:
            'To‘lov buyurtma bajarilgunga qadar platformada saqlanadi.',
    },
    {
        id: 4,
        title: 'Natijani oling',
        description:
            'Ishni qabul qiling va natijadan mamnun bo‘lsangiz, to‘lovni tasdiqlang.',
    },
];

const Info = () => {
    return (
        <div className={styles.infoSection}>
            <h2 className={styles.title}>Juda oson ishlaydi</h2>
            <div className={styles.timeline}>
                {steps.map((step) => (
                    <StepRow key={step.id} {...step} />
                ))}
            </div>
        </div>
    );
};

export default Info;

const StepRow = ({ id, title, description }) => {
    return (
        <div className={styles.stepRow}>
            <span className={styles.stepNumber}>0{id}</span>
            <span className={styles.dot} />
            <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{title}</h3>
                <p className={styles.stepSubtitle}>{description}</p>
            </div>
        </div>
    );
};
