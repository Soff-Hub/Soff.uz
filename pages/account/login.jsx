import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import Login from '~/components/partials/account/Login';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import { useSelector } from 'react-redux';
import Page404 from '../page/page-404';

const LoginPage = () => {
    
    const { user } = useSelector(state => state.auth)
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: 'Kirish',
        },
    ];
    return (
        user?.access ?
        <Page404/>  :
            <PageContainer footer={<FooterDefault />} title="Login">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <Login />
                </div>
            </PageContainer> 
            
    );
};

export default LoginPage;
