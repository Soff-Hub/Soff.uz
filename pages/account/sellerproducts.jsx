import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import MyProducts_listSeller from '~/components/partials/account/MyProducts_listSeller'
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import { useSelector } from 'react-redux';
import Page404 from '../page/page-404';
import Selection from './selection';
import Meta from '~/components/shared/headers/Meta';

const SellerProducts = () => {
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: 'Sotib olinganlar',
        },
    ];
    const { user } = useSelector(state => state.auth)
    console.log(user);

    return (
        <PageContainer
            footer={<FooterDefault />}
            title="Recent Viewed Products">
            <div className="ps-page--my-account ">
                <Meta
                    title={"Sotib olinganlar"}
                />
                <BreadCrumb breacrumb={breadCrumb} />
                <MyProducts_listSeller />
            </div>
        </PageContainer> 

    );
};

export default SellerProducts;
