import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/widgets/layouts/PageContainer';
import CheckoutOne from '~/components/partials/account/Chekout-one';
import Meta from '~/components/shared/headers/Meta';

const CheckoutOnePage = () => {
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: 'Xarid savati',
        },
    ];

    return (
        <PageContainer title="Checkout">
            <div className="ps-page--simple">
                <Meta
                    title={"Xarid savati"}
                />
                <BreadCrumb breacrumb={breadCrumb} />
                <CheckoutOne />
            </div>
        </PageContainer>
    );
};

export default CheckoutOnePage;
