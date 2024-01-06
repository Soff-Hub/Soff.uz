import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Page404 from '../page/page-404';
import { useSelector } from 'react-redux';
import TegLists from '~/components/partials/account/TegLists ';
import Selection from './selection';

const AccountTegPage = () => {
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/main',
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
            </PageContainer> :  user?.access ? <Page404/> : <Selection /> 
      
    );
};

export default AccountTegPage;
