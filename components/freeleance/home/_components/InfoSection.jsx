import React from 'react';
import styles from '../styles/Steps.module.scss';

const steps = [
    {
        id: 1,
        title: 'Xizmatni tanlang',
        description:
            'Katalogdan yoki qidiruv orqali sizga kerakli xizmat yoki frilanserni toping.',
    },
    {
        id: 2,
        title: 'Xizmat tafsilotibilan tanishing',
        description:
            'Talablaringizga mos xizmat ekanligiga amin bo’ling va kerak bo’lsa frilanser bilan muloqot qilib kelishib oling',
    },
    {
        id: 3,
        title: 'To‘lov qiling - xavfsiz',
        description:
            'To‘lov faqat ish yakunlangandan so‘ng ijrochiga o‘tkaziladi.Sizning pulingiz platforma kafolati ostida saqlanadi.',
    },
    {
        id: 4,
        title: 'Sifatli natijani oling',
        description:
            'Ishni qabul qiling va kerak bo‘lsa tuzatishlar so‘rang.100% qoniqish kafolati.',
    },
];

const InfoSection = () => {
    return (
        <div>
            <div className={styles.titleWrapper}>
                <img src="/static/img/HomePage/icon.png" alt="" />
                <h3>Xizmatlardan foydalanish juda oson</h3>
                <h1>SOFF.UZ</h1>
            </div>
            <div className={styles.stepsSection}>
                {steps.map(step => (
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

export default InfoSection;

export const InfoCard = ({ id, title, subtitle }) => {
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
