import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import MyOrders from '~/components/partials/account/MyOrders';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Meta from '~/components/shared/headers/Meta';

const DealList = () => {
    const breadCrumb = [
        {
            text: 'Bosh sahifa',
            url: '/',
        },
        {
            text: 'Mening buyurtmalarim',
        },
    ];
    return (
        <PageContainer footer={<FooterDefault />} title="Notifications">
            <div className="ps-page--my-account">
                <Meta title={'Mening buyurtmalarim'} />
                <BreadCrumb breacrumb={breadCrumb} />
                <MyOrders />
            </div>
        </PageContainer>
    );
};

export default DealList;
