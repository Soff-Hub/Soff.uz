import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import OrderProductListPage from '~/components/partials/account/OrderProductListPage';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Meta from '~/components/shared/headers/Meta';

const OrderProduct = () => {
    const breadCrumb = [
        {
            text: 'Bosh sahifa',
            url: '/',
        },
        {
            text: 'Taklif yuborganlar',
        },
    ];
    return (
        <PageContainer footer={<FooterDefault />} title="Notifications">
            <div className="ps-page--my-account">
                <Meta title={'Qabul qilinadigan takliflar'} />
                <BreadCrumb breacrumb={breadCrumb} />
                <OrderProductListPage/>
            </div>
        </PageContainer>
    );
};

export default OrderProduct;
