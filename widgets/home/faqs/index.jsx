import React, { useState } from 'react';
import styles from './style.module.scss';
import { Collapse } from 'antd';
import { faqs } from '~/shared/constants';
import { DownOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const Faqs = () => {
    const [activeKey, setActiveKey] = useState(null);
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
                activeKey={activeKey}
                onChange={(key) => setActiveKey(key)}
                expandIcon={({ isActive }) => (
                    <img
                        src="/static/img/star.svg"
                        alt="badge"
                        className={`${styles.custom_expand_icon} ${isActive ? styles.active : ''
                            }`}
                    />
                )}
                style={{ background: 'transparent' }}>
                {faqs.map((item, idx) => (
                    <Panel
                        className={styles.accordion}
                        header={
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                <h1 className={styles.accordionTitle}>
                                    {item.question}
                                </h1>
                                <DownOutlined
                                    style={{
                                        transition: 'transform 0.3s ease',
                                        transform: (Array.isArray(activeKey) ? activeKey.includes(String(idx)) : activeKey === String(idx) || activeKey === idx) ? 'rotate(180deg)' : 'rotate(0deg)',
                                        color: 'rgba(36, 40, 43, 1)',
                                        fontSize: '18px'
                                    }}
                                />
                            </div>
                        }
                        key={String(idx)}
                        style={panelStyle}>
                        <p className={styles.accordionText}>{item.answer}</p>
                    </Panel>
                ))}
            </Collapse>
        </div>
    );
};

export default Faqs;
