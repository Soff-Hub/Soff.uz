import React from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Orders from '~/components/partials/account/Orders';
import Page404 from '../page/page-404';
import { useSelector } from 'react-redux';
import Selection from './selection';
import Meta from '~/components/shared/headers/Meta';
import { BdCrumb } from '~/components/elements/BreadCrumb';

const AccountOrdersPage = () => {
    const { user } = useSelector(state => state.auth)
    return (
        user?.role === 'admin' || user?.role === 'seller' ?
            <PageContainer footer={<FooterDefault />} title="Notifications">
                <div className="ps-page--my-account">
                    <Meta
                        title={"Buyurtmalar"}
                    />
                    <BdCrumb title={'Sotilgan mahsulotlar'} />
                    <Orders />
                </div>
            </PageContainer> : user?.access ? <Page404 /> : <Selection />

    );
};

export default AccountOrdersPage;
