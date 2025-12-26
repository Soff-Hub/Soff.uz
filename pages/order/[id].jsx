import React from 'react';
import PageLayout from '~/widgets/layouts/PageLayout';
import OrderDetailMain from '~/features/freelancers/myorders/order-detail/OrderDetailMain';
import BreadCrumb from '~/shared/ui/breadcrumb';
import { useSafeBack } from '~/shared/hooks/useSafeBack';

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

export default OrderDatail;
