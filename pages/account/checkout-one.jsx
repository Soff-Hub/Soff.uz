import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import CheckoutOne from '~/components/partials/account/Chekout-one';
import { useSelector } from 'react-redux';

const CheckoutOnePage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Hisob - kitob ma\'lumotlari',
        },
    ];
    const state = useSelector(state => state)
    console.log('state|', state);

    return (
        <PageContainer footer={<FooterDefault />} title="Checkout">
            <div className="ps-page--simple">
                <BreadCrumb breacrumb={breadCrumb} />
                <CheckoutOne  />
            </div>
        </PageContainer>
    );
};

export default CheckoutOnePage;
