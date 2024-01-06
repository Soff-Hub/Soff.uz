import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import ProductsLists from '~/components/partials/account/ProductsLists';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import { useSelector } from 'react-redux';
import Page404 from '../page/page-404';
import Selection from './selection';

const Products = () => {
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/main',
        },
        {
            text: 'Mahsulotlar',
        },
    ];
    const { user } = useSelector(state => state.auth)


    return (
        user?.role === 'admin' ?
        <PageContainer footer={<FooterDefault />} title="Invoices">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <ProductsLists />
            </div>
        </PageContainer> : user?.access ? <Page404/> : <Selection /> 
    );
};

export default Products;
