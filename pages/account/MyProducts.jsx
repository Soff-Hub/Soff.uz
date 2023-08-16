import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import MyProducts_list from '~/components/partials/account/MyProducts_list';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';

const RecentViewedProductsPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Mening mahsulotlarim',
        },
    ];
    return (
        <>
            <PageContainer
                footer={<FooterDefault />}
                title="Recent Viewed Products">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <MyProducts_list />
                </div>
                <Newletters layout="container" />
            </PageContainer>
        </>
    );
};

export default RecentViewedProductsPage;
