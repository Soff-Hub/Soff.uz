import React from 'react';
import PageLayout from '~/widgets/layouts/PageLayout';
import OrderDetailMain from '~/features/freelancers/myorders/order-detail/OrderDetailMain';
import BreadCrumb from '~/shared/ui/breadcrumb';
import { useSafeBack } from '~/shared/hooks/useSafeBack';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const OrderDatail = ({ orderData }) => {
    const safeBack = useSafeBack();

    const breadCrumbItems = [
        {
            url: '/',
            text: 'Oldingi sahifa',
            action: safeBack,
        },
        {
            key: 'current',
            text: 'Mening buyurtmalarim',
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
                <OrderDetailMain orderData={orderData} />
            </div>
        </PageLayout>
    );
};

export async function getServerSideProps({ locale }) {
    return {
        props: {
            orderData: null,
            ...(await serverSideTranslations(locale, [
                'header',
                'footer',
                'common',
                'orders',
                'modals',
            ])),
        },
    };
}

export default OrderDatail;
