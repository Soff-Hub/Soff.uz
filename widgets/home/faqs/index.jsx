import React from 'react';
import styles from './style.module.scss';
import { Collapse } from 'antd';
import { useTranslation } from 'next-i18next';

const { Panel } = Collapse;

const Faqs = () => {
    const { t } = useTranslation('index');
    
    const faqs = [
        {
            question: t('faqs.questions.q1.question'),
            answer: t('faqs.questions.q1.answer'),
        },
        {
            question: t('faqs.questions.q2.question'),
            answer: t('faqs.questions.q2.answer'),
        },
        {
            question: t('faqs.questions.q3.question'),
            answer: t('faqs.questions.q3.answer'),
        },
        {
            question: t('faqs.questions.q4.question'),
            answer: t('faqs.questions.q4.answer'),
        },
        {
            question: t('faqs.questions.q5.question'),
            answer: t('faqs.questions.q5.answer'),
        },
        {
            question: t('faqs.questions.q6.question'),
            answer: t('faqs.questions.q6.answer'),
        },
        {
            question: t('faqs.questions.q7.question'),
            answer: t('faqs.questions.q7.answer'),
        },
        {
            question: t('faqs.questions.q8.question'),
            answer: t('faqs.questions.q8.answer'),
        },
        {
            question: t('faqs.questions.q9.question'),
            answer: t('faqs.questions.q9.answer'),
        },
        {
            question: t('faqs.questions.q10.question'),
            answer: t('faqs.questions.q10.answer'),
        },
        {
            question: t('faqs.questions.q11.question'),
            answer: t('faqs.questions.q11.answer'),
        },
    ];
    const panelStyle = {
        marginBottom: 24,
        background: 'rgba(254, 254, 254, 1)',
        borderRadius: 10,
        border: 'none',
        boxShadow: '5px 10px 30px 0px rgba(0, 0, 0, 0.05)',
    };

    return (
        <div className={styles.faqWrapper}>
            <img
                src="/static/img/star.svg"
                alt="icon"
                style={{ marginBottom: '48px' }}
            />
            <h3 className={styles.subtitle}>{t('faqs.subtitle')}</h3>
            <h2 className={styles.title}>{t('faqs.title')}</h2>

            <Collapse
                accordion
                bordered={false}
                expandIcon={({ isActive }) => (
                    <img
                        src="/static/img/star.svg"
                        alt="badge"
                        className={`${styles.custom_expand_icon} ${
                            isActive ? styles.active : ''
                        }`}
                    />
                )}
                style={{ background: 'transparent' }}>
                {faqs.map((item, idx) => (
                    <Panel
                        className={styles.accordion}
                        header={
                            <h1 className={styles.accordionTitle}>
                                {item.question}
                            </h1>
                        }
                        key={idx}
                        style={panelStyle}>
                        <p className={styles.accordionText}>{item.answer}</p>
                    </Panel>
                ))}
            </Collapse>
        </div>
    );
};

export default Faqs;
