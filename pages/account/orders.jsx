import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Orders from '~/components/partials/account/Orders';
import Page404 from '../page/page-404';
import { useSelector } from 'react-redux';
import Selection from './selection';
import Meta from '~/components/shared/headers/Meta';

const AccountOrdersPage = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Buyurtmalar',
        },
    ];
    const { user } = useSelector(state => state.auth)
    return (
        user?.role === 'admin' || user?.role === 'seller' ?
            <PageContainer footer={<FooterDefault />} title="Notifications">
                <div className="ps-page--my-account">
                    <Meta
                        title={"Soff | Buyurtmalar"}
                    />
                    <BreadCrumb breacrumb={breadCrumb} />
                    <Orders />
                </div>
            </PageContainer> : user?.access ? <Page404 /> : <Selection />

    );
};

export default AccountOrdersPage;
