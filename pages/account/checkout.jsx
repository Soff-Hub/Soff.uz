import React from 'react';
import Checkout from '~/features/account/ui/Checkout';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CheckoutPage = () => {
    const { t } = useTranslation('account');
    return (
        <PageContainer>
            <Meta
                title={t('checkout.title')}
                description={t('checkout.description')}
            />
            <Checkout />
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

export default CheckoutPage;
