import React from 'react';
import { Button, Steps } from 'antd';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import { soffiaIconSVG3 } from '~/widgets/header/HeaderActions/HeaderAIIcon';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function SoffiaPage() {
    const { t } = useTranslation('soffia');

    const steps = [
        {
            emoji: '🤖',
            title: t('steps.step1.title'),
            description: t('steps.step1.description'),
        },
        {
            emoji: '💳',
            title: t('steps.step2.title'),
            description: t('steps.step2.description'),
        },
        {
            emoji: '📝',
            title: t('steps.step3.title'),
            description: t('steps.step3.description'),
        },
        {
            emoji: '⬇️',
            title: t('steps.step4.title'),
            description: t('steps.step4.description'),
        },
    ];

    return (
        <PageContainer>
            <Meta
                title={t('meta.title')}
                image={'https://soff.uz/static/img/soff/logo-dark.png'}
                description={t('meta.description')}
                keywords={[
                    { name: 'prezentatsiya yaratish' },
                    { name: 'Soffia AI' },
                    { name: "sun'iy intellekt prezentatsiya" },
                    { name: 'AI prezentatsiya generator' },
                    { name: 'avtomatik slayd tayyorlash' },
                    { name: 'taqdimot tayyorlash' },
                    { name: 'powerpoint yaratish' },
                    { name: 'tez prezentatsiya' },
                    { name: 'raqamli taqdimot' },
                    { name: 'Soff uz' },
                ]}
                author="Soff.uz"
            />
            <div className="container py-5">
                {/* Hero section */}
                <div
                    className="text-center mb-5"
                    style={{
                        background:
                            'linear-gradient(135deg, rgb(0 164 79 / 32%), rgb(49 47 48 / 0%))',
                        borderRadius: '10px',
                        padding: '50px 20px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                        color: '#fff',
                    }}>
                    <h1
                        className="display-5 mb-4"
                        style={{ fontFamily: 'Roboto, sans-serif' }}>
                        <strong>{t('hero.title')}</strong>
                    </h1>
                    <p className=" mb-4 mx-auto" style={{ maxWidth: '800px' }}>
                        {t('hero.description')}
                    </p>
                    <a
                        href="https://t.me/soffia_ai_bot"
                        target="_blank"
                        rel="noopener noreferrer">
                        <Button
                            type="primary"
                            size="large"
                            className="btn btn-light btn-lg text-white rounded-3 px-5"
                            style={{
                                background: 'rgb(0, 164, 79)',
                                border: 'none',
                                fontSize: '16px',
                                letterSpacing: '1px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            }}>
                            {soffiaIconSVG3} {t('hero.button')}
                        </Button>
                    </a>
                </div>

                {/* Steps section with creative styling */}
                <div className="row justify-content-center mb-5">
                    {steps.map((step, index) => (
                        <div className="col-md-6 col-lg-3 mb-4" key={index}>
                            <div
                                className="card shadow-lg border-0"
                                style={{
                                    borderRadius: '20px',
                                    padding: '30px 20px',
                                    backgroundColor: '#f9f9f9',
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                                    transition:
                                        'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                    margin: '10px 0',
                                    textAlign: 'center',
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'scale(1)';
                                }}>
                                {/* Step Icon */}
                                <div
                                    style={{
                                        // backgroundColor: 'rgb(0, 164, 79)',
                                        color: '#fff',
                                        borderRadius: '50%',
                                        width: '50px',
                                        height: '50px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 20px',
                                    }}>
                                    <span style={{ fontSize: '28px' }}>
                                        {step.emoji}
                                    </span>
                                </div>

                                {/* Step Title */}
                                <h4
                                    style={{
                                        color: 'rgb(0, 164, 79)',
                                        fontWeight: '600',
                                        fontSize: '18px',
                                    }}>
                                    {step.title}
                                </h4>

                                {/* Step Description */}
                                <p
                                    style={{
                                        color: '#312f30',
                                        fontSize: '14px',
                                        fontWeight: '400',
                                    }}>
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA with hover effect */}
                <div className="text-center">
                    <a
                        href="https://soffia.uz"
                        target="_blank"
                        rel="noopener noreferrer">
                        <Button
                            type="primary"
                            size="large"
                            className="btn btn-success btn-lg rounded-3 py-3 px-5"
                            style={{
                                backgroundColor: 'rgb(0, 164, 79)',
                                border: 'none',
                                fontSize: '16px',
                                letterSpacing: '1px',
                                transition: 'transform 0.3s ease-in-out',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            }}
                            onMouseEnter={(e) =>
                                (e.target.style.transform = 'scale(1.05)')
                            }
                            onMouseLeave={(e) =>
                                (e.target.style.transform = 'scale(1)')
                            }>
                            {t('cta.button')}
                        </Button>
                    </a>
                </div>
            </div>
        </PageContainer>
    );
}

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'header',
                'footer',
                'common',
                'soffia',
                'modals',
            ])),
        },
    };
}
