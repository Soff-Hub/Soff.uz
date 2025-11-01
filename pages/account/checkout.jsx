import React from 'react';
import Checkout from '~/components/partials/account/Checkout';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';

const CheckoutPage = () => {
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: 'Savat',
            url: '/account/shopping-cart',
        },
        {
            text: 'Xarid savati',
        },
    ];

    return (
        <PageContainer title="Xarid savati">
            <div className="ps-page--simple">
                <Meta title={'Xarid savati'} />
                <Checkout />
            </div>
        </PageContainer>
    );
};

export default CheckoutPage;
