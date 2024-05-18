import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import DealListPage from '~/components/partials/account/DealListPage';
import DealsList from '~/components/partials/account/DealsList';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Meta from '~/components/shared/headers/Meta';

const DealList = () => {
    const breadCrumb = [
        {
            text: 'Bosh sahifa',
            url: '/',
        },
        {
            text: 'Qabul qilinadigan takliflar',
        },
    ];
    return (
        <PageContainer footer={<FooterDefault />} title="Notifications">
            <div className="ps-page--my-account">
                <Meta title={'Qabul qilinadigan takliflar'} />
                <BreadCrumb breacrumb={breadCrumb} />
                <DealListPage />
            </div>
        </PageContainer>
    );
};

export default DealList;
