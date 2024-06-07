import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import ApplyForDeal from '~/components/partials/account/applyForDeal';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Meta from '~/components/shared/headers/Meta';

const DealList = () => {
    const breadCrumb = [
        {
            text: 'Bosh sahifa',
            url: '/',
        },
        {
            text: 'Barcha buyurtmalar',
            url: '/account/all-orders',
        },
        {
            text: 'Buyurtma bajarish uchun taklif yuborish',
        },
    ];
    return (
        <PageContainer footer={<FooterDefault />} title="Notifications">
            <div className="ps-page--my-account">
                <Meta title={'Buyurtma bajarish uchun taklif yuborish'} />
                <BreadCrumb breacrumb={breadCrumb} />
                <ApplyForDeal />
            </div>
        </PageContainer>
    );
};

export default DealList;
