import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import CheckoutOne from '~/components/partials/account/Chekout-one';
import Meta from '~/components/shared/headers/Meta';

const CheckoutOnePage = () => {
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: 'Hisob - kitob ma\'lumotlari',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Checkout">
            <div className="ps-page--simple">
                <Meta
                    title={"Hisob - kitob ma\'lumotlari"}
                />
                <BreadCrumb breacrumb={breadCrumb} />
                <CheckoutOne />
            </div>
        </PageContainer>
    );
};

export default CheckoutOnePage;
