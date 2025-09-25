import React from 'react';

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
            text: 'Savat',
            url: '/account/shopping-cart',
        },
        {
            text: 'Xarid savati',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title='Checkout'>
            <div className='ps-page--simple'>
                <Meta title={'Xarid savati'} />
                {/* <BreadCrumb breacrumb={breadCrumb} /> */}
                <Checkout />
            </div>
        </PageContainer>
    );
};

export default CheckoutPage;
