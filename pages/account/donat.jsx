import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import SiteDonateForm from '~/entities/seller/ui/SiteDonateForm';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Donat = () => {
    const { t } = useTranslation('account');
    return (
        <PageContainer title={t('donat.title')}>
            <Meta
                title={t('donat.title')}
                description={t('donat.description')}
            />
            <div className="container my-5 ">
                <h2 className="text-center mb-5">
                    {t('donat.heading')}
                </h2>

                <SiteDonateForm />
            </div>
        </PageContainer>
    );
};

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'header',
                'footer',
                'common',
                'account',
                'modals',
            ])),
        },
    };
}

export default Donat;
