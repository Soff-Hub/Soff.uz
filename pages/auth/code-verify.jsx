import React from 'react';
import Meta from '~/shared/ui/meta';
import BreadCrumb from '~/shared/ui/breadcrumb';
import PageContainer from '~/widgets/layouts/PageContainer';
import CodeVerifyForm from '~/features/account/ui/auth/CodeVerifyForm';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CodeVerifyPage = () => {
    const { t } = useTranslation('code-verify');

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
            text: t('breadcrumb.verify'),
        },
    ];

    const metaTitle = t('meta.title');
    const metaDescription = t('meta.description');

    return (
        <PageContainer title={metaTitle}>
            <div className="ps-page--my-account">
                <Meta title={metaTitle} description={metaDescription} />
                <BreadCrumb breacrumb={breadCrumb} />
                <CodeVerifyForm />
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
                'login',
                'common',
                'code-verify',
                'modals',
            ])),
        },
    };
}

export default CodeVerifyPage;
