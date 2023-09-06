import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import CategoryLists from '~/components/partials/account/categoryLists';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import { useSelector } from 'react-redux';
import Page404 from '../page/page-404';
import LoginPage from './login';

const MyAccountPage = () => {
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: 'Kategoriyalar',
        },
    ];
    const { user } = useSelector(state => state.auth)
    return (
        user?.role === 'admin' ?
        <PageContainer footer={<FooterDefault />} title="Address">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <CategoryLists />
            </div>
            <Newletters layout="container" />
        </PageContainer> : user?.access ? <Page404/> : <LoginPage /> 
    );
};

export default MyAccountPage;
