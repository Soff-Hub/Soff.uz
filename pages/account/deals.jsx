import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import DealsList from '~/components/partials/account/DealsList';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Meta from '~/components/shared/headers/Meta';

const Deals = () => {
    const breadCrumb = [
        {
            text: 'Bosh sahifa',
            url: '/',
        },
        {
            text: 'Bitimlar',
        },
    ];
    return (
            <PageContainer footer={<FooterDefault />} title="Notifications">
                <div className="ps-page--my-account">
                    <Meta
                        title={"Bitimlar"}
                    />
                    <BreadCrumb breacrumb={breadCrumb} />
                    <DealsList/>
                </div>
            </PageContainer> 

    );
};

export default Deals;
