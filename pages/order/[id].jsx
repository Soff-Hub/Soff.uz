import React from 'react';
import PageLayout from '~/widgets/layouts/PageLayout';
import OrderDetailMain from '~/features/freelancers/myorders/order-detail/OrderDetailMain';
import BreadCrumb from '~/shared/ui/breadcrumb';
import { useSafeBack } from '~/shared/hooks/useSafeBack';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const OrderDatail = () => {
    const safeBack = useSafeBack();
    const { t } = useTranslation('order-detail');

    const breadCrumbItems = [
        {
            url: '/',
            text: t('previous_page'),
            action: safeBack,
        },
        {
            key: 'current',
            text: t('my_orders'),
        },
    ];

    return (
        <PageLayout>
            <BreadCrumb
                breacrumb={breadCrumbItems}
                layout="fullwidth"
                fixedToHeader
            />
            <div className="container">
                <OrderDetailMain />
            </div>
        </PageLayout>
    );
};

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'header',
                'footer',
                'common',
                'order-detail',
                'card',
                'modals',
            ])),
        },
    };
}

export default OrderDatail;
