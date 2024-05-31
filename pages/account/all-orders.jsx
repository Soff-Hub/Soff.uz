import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import DealCart from '~/components/partials/account/modules/AllOrders';
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
        },
    ];
    return (
        <PageContainer footer={<FooterDefault />} title="Notifications">
            <div className="ps-page--my-account">
                <Meta title={'Barcha buyurtmalar'} />
                <BreadCrumb breacrumb={breadCrumb} />
                <DealCart />
            </div>
        </PageContainer>
    );
};

export default DealList;
