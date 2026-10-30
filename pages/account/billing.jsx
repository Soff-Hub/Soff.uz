import React from 'react';
import BreadCrumb from '~/shared/ui/breadcrumb';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import BillingPage from '~/features/account/ui/billing/BillingPage';

const AccountBilling = () => {
    const breadCrumb = [
        { text: 'Bosh sahifa', url: '/' },
        { text: "To'lov ma'lumotlari" },
    ];
    return (
        <PageContainer>
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <Meta
                    title={"To'lov ma'lumotlari"}
                    description={'Soff.uz obunasi uchun saqlangan kartalaringizni boshqaring.'}
                />
                <BillingPage />
            </div>
        </PageContainer>
    );
};

export default AccountBilling;
