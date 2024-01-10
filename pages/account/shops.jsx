import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Notifications from '~/components/partials/account/ShopList';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Page404 from '../page/page-404';
import { useSelector } from 'react-redux';
import Selection from './selection';
import Meta from '~/components/shared/headers/Meta';

const AccountShopsPage = () => {
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: 'Sotuchilar',
        },
    ];
    const { user } = useSelector(state => state.auth)

    return (
        user?.role === 'admin' ?
            <PageContainer footer={<FooterDefault />} title="Notifications">
                <div className="ps-page--my-account">
                    <Meta
                        title={"Sotuchilar"}
                    />
                    <BreadCrumb breacrumb={breadCrumb} />
                    <Notifications />
                </div>
            </PageContainer> : user?.access ? <Page404 /> : <Selection />
    );
};

export default AccountShopsPage;
