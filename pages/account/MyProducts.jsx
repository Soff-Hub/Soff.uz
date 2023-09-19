import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import MyProducts_list from '~/components/partials/account/MyProducts_list';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import { useSelector } from 'react-redux';
import Page404 from '../page/page-404';
import LoginPage from './login';

const RecentViewedProductsPage = () => {
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: 'Mening mahsulotlarim',
        },
    ];
    const { user } = useSelector(state => state.auth)
    return (
         user?.role === 'seller' || user?.role === 'customer'  ?
            <PageContainer
                footer={<FooterDefault />}
                title="Recent Viewed Products">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <MyProducts_list />
                </div>
                <Newletters layout="container" />
            </PageContainer> : user?.access ? <Page404/> : <LoginPage /> 
    
    );
};

export default RecentViewedProductsPage;
