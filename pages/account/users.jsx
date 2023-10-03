import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import UsersLists from '~/components/partials/account/UsersLists';
import Page404 from '../page/page-404';
import { useSelector } from 'react-redux';
import LoginPage from './login';

const AccountUsersPage = () => {
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: 'Xaridorlar',
        },
    ];
    const { user } = useSelector(state => state.auth)
    return (
        
        user?.role === 'admin' ?
            <PageContainer footer={<FooterDefault />} title="   s">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <UsersLists/>
                </div>
            </PageContainer> :  user?.access ? <Page404/> : <LoginPage /> 
      
    );
};

export default AccountUsersPage;
