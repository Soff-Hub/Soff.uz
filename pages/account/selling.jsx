import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import { useSelector } from 'react-redux';
import Page404 from '../page/page-404';
import Selection from './selection';
import Meta from '~/components/shared/headers/Meta';
import SellingsLists from '~/components/partials/account/SellingLists';

const Sellings = () => {
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: 'Joyida sotish',
        },
    ];
    const { user } = useSelector(state => state.auth)
    return (
        user?.role === 'admin' || user?.role === 'seller' ?
            <PageContainer
                footer={<FooterDefault />}
                title="Recent Viewed Products">
                <div className="ps-page--my-account">
                    <Meta
                        title={"Joyida sotish"}
                    />
                    <BreadCrumb breacrumb={breadCrumb} />
                    <SellingsLists />
                </div>
            </PageContainer> : user?.access ? <Page404 /> : <Selection />

    );
};

export default Sellings;
