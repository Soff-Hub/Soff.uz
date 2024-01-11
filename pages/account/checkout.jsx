import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import Checkout from '~/components/partials/account/Checkout';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';

const CheckoutPage = () => {
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
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
                <Meta
                    title={"Soff | Hisob - kitob ma\'lumotlari"}
                />
                <BreadCrumb breacrumb={breadCrumb} />
                <Checkout />
            </div>
        </PageContainer>
    );
};

export default CheckoutPage;
