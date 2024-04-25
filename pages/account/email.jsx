import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PremiumSellers from '~/components/partials/account/PremiumSellers';
import Page404 from '../page/page-404';
import { useSelector } from 'react-redux';
import Selection from './selection';
import Meta from '~/components/shared/headers/Meta';
import EmailLists from '~/components/partials/account/EmailLists';

const AccountEmail = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Pochtaga Xabar Yuborish',
        },
    ];
    const { user } = useSelector(state => state.auth)
    return (
        user?.role === 'admin'?
            <PageContainer footer={<FooterDefault />} title="Notifications">
                <div className="ps-page--my-account">
                    <Meta
                        title={"Pochtaga Xabar Yuborish"}
                    />
                    <BreadCrumb breacrumb={breadCrumb} />
                    <EmailLists />
                </div>
            </PageContainer> : user?.access ? <Page404 /> : <Selection />

    );
};

export default AccountEmail;
