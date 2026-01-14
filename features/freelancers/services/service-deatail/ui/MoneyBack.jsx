import React from 'react';
import { useTranslation } from 'next-i18next';
import { Collapse } from 'antd';
import styles from '../styles/detail.module.scss';

const { Panel } = Collapse;

const MoneyBack = () => {
    const { t } = useTranslation('orders');
    return (
        <div
            className="card shadow-sm border-0 my-4"
            style={{
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#fff',
            }}>
            <div
                className={`${styles.moneyBox} d-flex align-items-center p-3`}
                style={{
                    gap: '16px',
                }}>
                <img
                    src="/static/img/services_images/garant.png"
                    alt={t('serviceDetail.moneyBack.imageAlt')}
                    style={{
                        width: '70px',
                        height: '70px',
                        objectFit: 'contain',
                    }}
                />
                <div>
                    <h3
                        className="mb-1"
                        style={{ fontSize: '18px', fontWeight: '600' }}>
                        {t('serviceDetail.moneyBack.title')}
                    </h3>
                    <p className="mb-0 text-muted" style={{ fontSize: '14px' }}>
                        {t('serviceDetail.moneyBack.description')}
                    </p>
                </div>
            </div>

            {/* accordion umumiy divning tagida */}
            <Collapse
                ghost
                expandIconPosition="end"
                className="border-top"
                style={{
                    padding: '0 16px 12px',
                    backgroundColor: '#fff',
                }}>
                <Panel
                    header={
                        <span
                            className="text-success"
                            style={{ fontWeight: 500 }}>
                            {t('serviceDetail.moneyBack.moreInfo')}
                        </span>
                    }
                    key="1">
                    <div
                        style={{
                            fontSize: '14px',
                            color: '#555',
                            lineHeight: '1.6',
                        }}>
                        <p>
                            {t('serviceDetail.moneyBack.detailedDescription')}
                        </p>
                    </div>
                </Panel>
            </Collapse>
        </div>
    );
};

export default MoneyBack;
