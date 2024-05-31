import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import MyDealCart from '~/components/partials/account/modules/DealAplication';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Meta from '~/components/shared/headers/Meta';

const DealList = () => {
    const breadCrumb = [
        {
            text: 'Bosh sahifa',
            url: '/',
        },
    
        {
            text: 'Men yuborgan arizlar',
        },
    ];
    return (
        <PageContainer footer={<FooterDefault />} title="Notifications">
            <div className="ps-page--my-account">
                <Meta title={'Men yuborgan arizlar'} />
                <BreadCrumb breacrumb={breadCrumb} />
                <MyDealCart /> 
            </div>
        </PageContainer>
    );
};

export default DealList;
