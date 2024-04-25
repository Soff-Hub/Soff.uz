import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ContextList from '~/components/partials/account/ContextList';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Page404 from '../page/page-404';
import { useSelector } from 'react-redux';
import Selection from './selection';
import Meta from '~/components/shared/headers/Meta';

const AccountNotificationsPage = () => {
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: "Bannerlarni o'zgartirish ",
        },
    ];
    const { user } = useSelector(state => state.auth)
    return (

        user?.role === 'admin' ?
            <PageContainer footer={<FooterDefault />} title="Notifications">
                <div className="ps-page--my-account">
                    <Meta
                        title={"Bannerlarni o'zgartirish"}
                    />
                    <BreadCrumb breacrumb={breadCrumb} />
                    <ContextList />
                </div>
            </PageContainer> : user?.access ? <Page404 /> : <Selection />

    );
};

export default AccountNotificationsPage;
