import React from 'react';
import styles from './style.module.scss';
import { Collapse } from 'antd';
import { faqs } from '~/shared/constants';

const { Panel } = Collapse;

const Faqs = () => {
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
            <h3 className={styles.subtitle}>Ko‘p so‘raladigan savollar</h3>
            <h2 className={styles.title}>SAVOLLAR</h2>

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
