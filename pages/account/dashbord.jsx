import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import DashbordList from '~/components/partials/account/dashbordList';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import { useSelector } from 'react-redux';
import Page404 from '../page/page-404';
import LoginPage from './login';

const MyAccountPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Bosh panel',
        },
    ];

    const { user } = useSelector(state => state.auth)

    return (
       user?.role === 'admin' || user?.role === 'seller' ? <PageContainer footer={<FooterDefault />} title="Address">
        <div className="ps-page--my-account">
            <BreadCrumb breacrumb={breadCrumb} />
            <DashbordList />
        </div>
        <Newletters layout="container" />
    </PageContainer> : user?.access ? <Page404/> : <LoginPage /> 
    );
};

export default MyAccountPage;
