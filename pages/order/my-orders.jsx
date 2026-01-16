import React from 'react';
import PageLayout from '~/widgets/layouts/PageLayout';
import MyOrdersMain from '~/features/freelancers/myorders/MyOrdersMain';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const MyOrders = () => {
    const { t } = useTranslation('my-orders');
    return (
        <PageLayout title={t('pageTitle')}>
            <MyOrdersMain />
        </PageLayout>
    );
};

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'my-orders',
                'header',
                'card',
                'footer',
                'common',
                'account',
                'modals',
                'chat',
            ])),
        },
    };
}

export default MyOrders;
