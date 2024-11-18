import React from 'react';

import MyProducts_list from '~/components/partials/account/MyProducts_list';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import { useSelector } from 'react-redux';
import Page404 from '../page/page-404';
import Selection from './selection';
import Meta from '~/components/shared/headers/Meta';
import { BdCrumb } from '~/components/elements/BreadCrumb';
import SellerProductsMain from '~/components/partials/products/SellerProductsMain';

const MyProducts = () => {
    const { user } = useSelector(state => state.auth)
    return (
        user?.role === 'seller' ?
            <PageContainer
                footer={<FooterDefault />}
                title="Recent Viewed Products">
                <div className="ps-page--my-account">
                    <Meta
                        title={"Mening mahsulotlarim"}
                    />
                    <BdCrumb title={'Mening mahsulotlarim'} />
                    {/* <MyProducts_list /> */}
                    <SellerProductsMain />
                </div>
            </PageContainer> : user?.access ? <Page404 /> : <Selection />

    );
};

export default MyProducts;
