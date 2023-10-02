import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import Page404 from '../page/page-404';
import { useSelector } from 'react-redux';
import LoginPage from './login';
import TegLists from '~/components/partials/account/TegLists ';

const AccountTegPage = () => {
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: 'Teglar',
        },
    ];
    const { user } = useSelector(state => state.auth)
    return (
        
        user?.role === 'admin' ?
            <PageContainer footer={<FooterDefault />} title="   s">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <TegLists/>
                </div>
                <Newletters layout="container" />
            </PageContainer> :  user?.access ? <Page404/> : <LoginPage /> 
      
    );
};

export default AccountTegPage;
