import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import MyProducts_list from '~/components/partials/account/MyProducts_list';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import { useSelector } from 'react-redux';
import Page404 from '../page/page-404';
import Selection from './selection';
import Meta from '~/components/shared/headers/Meta';

const MyProducts = () => {
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: 'Mening mahsulotlarim',
        },
    ];
    const { user } = useSelector(state => state.auth)
    return (
        user?.role === 'seller' ?
            <PageContainer
                footer={<FooterDefault />}
                title="Recent Viewed Products">
                <div className="ps-page--my-account">
                    <Meta
                        title={"Soff | Mening mahsulotlarim"}
                    />
                    <BreadCrumb breacrumb={breadCrumb} />
                    <MyProducts_list />
                </div>
            </PageContainer> : user?.access ? <Page404 /> : <Selection />

    );
};

export default MyProducts;
