import React from 'react';
import { useTranslation } from 'next-i18next';
import { Button } from 'antd';
import {
    soffiaIconSVG2,
    soffiaIconSVG3,
} from '~/widgets/header/HeaderActions/HeaderAIIcon';

export default function AISoffiaPresentation() {
    const { t } = useTranslation('product-pages');
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '24px',
                background: 'rgba(0, 164, 79, 0.05)',
                borderRadius: '16px',
                border: '1px solid rgba(0, 164, 79, 0.2)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                flexWrap: 'wrap',
                gap: '16px',
                flexDirection: 'row',
            }}>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    flex: 1,
                    minWidth: '250px',
                }}>
                <div
                    style={{
                        background: 'rgb(0, 164, 79)',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        color: '#fff',
                        fontSize: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                    }}>
                    {soffiaIconSVG3}
                </div>
                <div>
                    <a
                        href="https://soffia.uz"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none' }}>
                        <h3
                            style={{
                                margin: 0,
                                color: '#312f30',
                                fontSize: '18px',
                            }}>
                            {t('productDetail.aiSoffia.title')}
                        </h3>
                        <p
                            className="d-md-block d-none"
                            style={{
                                margin: 0,
                                color: '#312f30a0',
                                fontSize: '14px',
                            }}>
                            {t('productDetail.aiSoffia.description')}
                        </p>
                    </a>
                </div>
            </div>

            <div style={{ flexShrink: 0 }} className="d-md-block d-none">
                <a
                    href="https://soffia.uz"
                    target="_blank"
                    rel="noopener noreferrer">
                    <Button
                        type="primary"
                        size="large"
                        style={{
                            borderRadius: '10px',
                            padding: '0 24px',
                            backgroundColor: 'rgb(0, 164, 79)',
                            border: 'none',
                            width: '100%',
                        }}>
                        {soffiaIconSVG3} {t('productDetail.aiSoffia.button')}
                    </Button>
                </a>
            </div>
        </div>
    );
}

export const AISoffiaPresentationNotFoundProduct = () => {
    const { t } = useTranslation('product-pages');
    return (
        <>
            <div className="bg-white p-5 rounded vh-100">
                <div className="container">
                    <div className="text-center">
                        <img
                            src="/static/img/noinfo.svg"
                            className="mb-5"
                            alt={t('productDetail.aiSoffia.notFound.alt')}
                        />
                        <p className="display-6">
                            {t('productDetail.aiSoffia.notFound.message')}
                        </p>
                    </div>
                    <div
                        className="mt-5"
                        style={{
                            // display: 'flex',
                            padding: '44px 10px',
                            background: 'rgba(0, 164, 79, 0.05)',
                            borderRadius: '16px',
                            border: '1px solid rgba(0, 164, 79, 0.2)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                        }}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                flex: 1,
                                minWidth: '250px',
                                justifyContent: 'center',
                            }}>
                            <div
                                style={{
                                    background: 'rgb(0, 164, 79)',
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    color: '#fff',
                                    fontSize: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                }}>
                                ✨
                            </div>
                            <div className="d-flex">
                                <a
                                    href="https://soffia.uz"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'none' }}>
                                    <h3
                                        style={{
                                            margin: 0,
                                            color: '#312f30',
                                            fontSize: '18px',
                                        }}>
                                        {t('productDetail.aiSoffia.title')}
                                    </h3>
                                    <p
                                        style={{
                                            margin: 0,
                                            color: '#312f30a0',
                                            fontSize: '14px',
                                        }}>
                                        {t(
                                            'productDetail.aiSoffia.description'
                                        )}
                                    </p>
                                </a>
                            </div>
                        </div>

                        {/* <div style={{ flexShrink: 0 }} className='d-md-block d-none mt-5 text-center'>
                            <a
                                href="https://soffia.uz"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    type="primary"
                                    size="large"
                                    style={{
                                        borderRadius: '10px',
                                        padding: '0 24px',
                                        backgroundColor: 'rgb(0, 164, 79)',
                                        border: 'none',
                                        width: '200px',
                                    }}
                                >
                                    ✨ Boshlash
                                </Button>
                            </a>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};
