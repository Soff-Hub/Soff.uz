import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ContextList from '~/components/partials/account/ContextList';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import Page404 from '../page/page-404';
import { useSelector } from 'react-redux';

const AccountNotificationsPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Context',
        },
    ];
    const { user } = useSelector(state => state.auth)
    return (

        user?.role === 'admin' ?
            <PageContainer footer={<FooterDefault />} title="Notifications">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <ContextList />
                </div>
                <Newletters layout="container" />
            </PageContainer> : <Page404 />

    );
};

export default AccountNotificationsPage;
