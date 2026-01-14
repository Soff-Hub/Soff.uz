import { NextPageContext } from 'next';
import React from 'react';
import PageLayout from '~/widgets/layouts/PageLayout';
import Meta from '~/shared/ui/meta';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Faq() {
    const { t } = useTranslation('faq');

    const customersFaqs = t('customersFaqs', { returnObjects: true });
    const sellersFaqs = t('sellersFaqs', { returnObjects: true });

    const customersFaqsWithIds = customersFaqs.map((faq, index) => ({
        ...faq,
        id: String(index + 1),
    }));

    const sellersFaqsWithIds = sellersFaqs.map((faq, index) => ({
        ...faq,
        id: `s${index + 1}`,
    }));

    return (
        <PageLayout>
            <Meta
                title={t('meta.title')}
                description={t('meta.description')}
                keywords={[
                    { name: t('meta.keywords.frequentlyAskedQuestions') },
                    { name: t('meta.keywords.faqSoffUz') },
                    { name: t('meta.keywords.soffUzQuestions') },
                    { name: t('meta.keywords.digitalProductsQuestions') },
                    { name: t('meta.keywords.onlineServicesFaq') },
                    { name: t('meta.keywords.productSellingQuestions') },
                    { name: t('meta.keywords.purchaseQuestions') },
                    { name: t('meta.keywords.usageQuestions') },
                ]}
                author={t('meta.author')}
            />

            <div className="container my-5">
                <h3 className="mb-4">{t('sections.customersTitle')}</h3>
                {customersFaqsWithIds.map((item, index) => {
                    return (
                        <div key={index}>
                            <h4>
                                <a
                                    data-bs-toggle="collapse"
                                    href={`#${item.id}`}
                                    role="button"
                                    aria-expanded="false"
                                    aria-controls={item.id}>
                                    {item.question}
                                </a>
                            </h4>
                            <div
                                className="collapse multi-collapse mb-5"
                                id={item.id}>
                                <div className="card card-body">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    );
                })}

                <h3 className="mb-4 mt-5">{t('sections.sellersTitle')}</h3>
                {sellersFaqsWithIds.map((item, index) => {
                    return (
                        <div key={index}>
                            <h4>
                                <a
                                    data-bs-toggle="collapse"
                                    href={`#${item.id}`}
                                    role="button"
                                    aria-expanded="false"
                                    aria-controls={item.id}>
                                    {item.question}
                                </a>
                            </h4>
                            <div
                                className="collapse multi-collapse mb-5"
                                id={item.id}>
                                <div className="card card-body">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </PageLayout>
    );
}

export async function getServerSideProps({ locale }: NextPageContext) {
    return {
        props: {
            ...(await serverSideTranslations(locale!, [
                'header',
                'footer',
                'common',
                'faq',
                'modals',
            ])),
        },
    };
}
