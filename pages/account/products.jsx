import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import Invoices from '~/components/partials/account/ProductsLists';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import PageContainer from '~/components/layouts/PageContainer';
import { useSelector } from 'react-redux';
import Page404 from '../page/page-404';

const InvoicePage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Mahsulotlar',
        },
    ];
    const { user } = useSelector(state => state.auth)


    return (
        user?.role === 'admin'  || user?.role === "customer" ?
        <PageContainer footer={<FooterDefault />} title="Invoices">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <Invoices />
            </div>
            <Newletters layout="container" />
        </PageContainer> : <Page404/>

    );
};

export default InvoicePage;
