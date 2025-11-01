import React from 'react';
import PageLayout from '~/widgets/layouts/PageLayout';
import MyOrdersMain from '~/components/freeleance/myorders/MyOrdersMain';

const MyOrders = () => {
    return (
        <PageLayout title={'Mening buyurtmalarim'}>
            <MyOrdersMain />
        </PageLayout>
    );
};

export default MyOrders;
