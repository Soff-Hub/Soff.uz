import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import Orders from '~/components/partials/account/Orders';
import Page404 from '../page/page-404';
import { useSelector } from 'react-redux';
import LoginPage from './login';

const AccountOrdersPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Buyurtmalar',
        },
    ];
    const { user } = useSelector(state => state.auth)
    return (
        user?.role === 'admin' || user?.role === 'seller' ?
            <PageContainer footer={<FooterDefault />} title="Notifications">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <Orders />
                </div>
                <Newletters layout="container" />
            </PageContainer> : user?.access ? <Page404/> : <LoginPage /> 

    );
};

export default AccountOrdersPage;
