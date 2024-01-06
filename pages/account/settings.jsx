import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Settings from '~/components/partials/account/Settings';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Page404 from '../page/page-404';
import { useSelector } from 'react-redux';
import Selection from './selection';

const AccountSettingsPage = () => {
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/main',
        },
        {
            text: 'Sozlamalar',
        },
    ];
    const { user } = useSelector(state => state.auth)
    return (

        user?.role === 'admin' || user?.role === 'seller' || user?.role==="customer" ?
            <PageContainer footer={<FooterDefault />} title="Notifications">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <Settings />
                </div>
            </PageContainer> : user?.access ? <Page404/> : <Selection /> 

    );
};

export default AccountSettingsPage;
