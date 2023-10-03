import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import Checkout from '~/components/partials/account/Checkout';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';

const CheckoutPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Xarid savati',
            url: '/account/shopping-cart',
        },
        {
            text: 'Hisob - kitob ma\'lumotlari',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Checkout">
            <div className="ps-page--simple">
                <BreadCrumb breacrumb={breadCrumb} />
                <Checkout />
            </div>
        </PageContainer>
    );
};

export default CheckoutPage;
