import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/widgets/layouts/PageContainer';
import CheckoutOne from '~/components/partials/account/Chekout-one';
import Meta from '~/components/shared/headers/Meta';

const CheckoutOnePage = () => {
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: 'Xarid savati',
        },
    ];

    return (
        <PageContainer>
            <div className="ps-page--simple">
                <Meta
                    title={'Xarid savati'}
                    description={
                        'Xaridni yakunlash va xizmatlardan foydalanish uchun Soff.uz xarid savatiga tashrif buyuring — qulay, tez va xavfsiz to‘lov tizimi. '
                    }
                />
                <BreadCrumb breacrumb={breadCrumb} />
                <CheckoutOne />
            </div>
        </PageContainer>
    );
};

export default CheckoutOnePage;
