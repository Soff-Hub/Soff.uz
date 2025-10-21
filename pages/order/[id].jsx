import React from 'react';
import PageLayout from '~/widgets/layouts/PageLayout';
import OrderDetailMain from '~/components/freeleance/myorders/order-detail/OrderDetailMain';
import BreadCrumb from '~/components/elements/BreadCrumb';
import { useSafeBack } from '~/shared/hooks/useSafeBack';

const OrderDatail = () => {
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
                <OrderDetailMain />
            </div>
        </PageLayout>
    );
};

export default OrderDatail;
