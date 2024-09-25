import React from 'react';

import MyProducts_listSeller from '~/components/partials/account/MyProducts_listSeller'
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import { useSelector } from 'react-redux';
import Page404 from '../page/page-404';
import Selection from './selection';
import Meta from '~/components/shared/headers/Meta';
import { BdCrumb } from '~/components/elements/BreadCrumb';

const SellerProducts = () => {

    const { user } = useSelector(state => state.auth)
    return (
        user?.role === 'seller' || user?.role === 'customer' ?
            <PageContainer
                footer={<FooterDefault />}
                title="Recent Viewed Products">
                <div className="ps-page--my-account ">
                    <Meta
                        title={"Sotib olinganlar"}
                    />
                    <BdCrumb title={'Sotib olgan mahsulotlarim'} />
                    <MyProducts_listSeller />
                </div>
            </PageContainer> : user?.access ? <Page404 /> : <Selection />

    );
};

export default SellerProducts;
