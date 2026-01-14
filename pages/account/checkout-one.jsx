import React from 'react';
import BreadCrumb from '~/shared/ui/breadcrumb';
import PageContainer from '~/widgets/layouts/PageContainer';
import CheckoutOne from '~/features/account/ui/Chekout-one';
import Meta from '~/shared/ui/meta';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CheckoutOnePage = () => {
    const { t } = useTranslation('account');
    const breadCrumb = [
        {
            text: t('breadcrumbs.home'),
            url: '/',
        },
        {
            text: t('breadcrumbs.cart'),
        },
    ];

    return (
        <PageContainer>
            <div className="ps-page--simple">
                <Meta
                    title={t('checkout.title')}
                    description={t('checkout.description')}
                />
                <BreadCrumb breacrumb={breadCrumb} />
                <CheckoutOne />
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

export default CheckoutOnePage;
