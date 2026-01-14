import React from 'react';
import Meta from '~/shared/ui/meta';
import BreadCrumb from '~/shared/ui/breadcrumb';
import PageContainer from '~/widgets/layouts/PageContainer';
import TelegramConfigmForm from '~/features/account/ui/auth/TelegramConfirmForm';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const CodeVerifyPage = () => {
    const { t } = useTranslation('login');

    const breadCrumb = [
        {
            text: t('breadcrumb.home'),
            url: '/',
        },
        {
            text: t('breadcrumb.login'),
            url: '/auth/login',
        },
        {
            text: t('telegram.breadcrumb'),
        },
    ];

    return (
        <PageContainer>
            <div className="ps-page--my-account">
                <Meta
                    title={t('telegram.meta.title')}
                    description={t('telegram.meta.description')}
                />
                <BreadCrumb breacrumb={breadCrumb} />
                <TelegramConfigmForm />
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
                'login',
                'modals',
            ])),
        },
    };
}

export default CodeVerifyPage;
