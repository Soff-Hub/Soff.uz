import React from 'react';
import Checkout from '~/components/partials/account/Checkout';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';

const CheckoutPage = () => {
    return (
        <PageContainer>
            <Meta
                title={'Xarid savati'}
                description={
                    'Xaridni yakunlash va xizmatlardan foydalanish uchun Soff.uz xarid savatiga tashrif buyuring — qulay, tez va xavfsiz to‘lov tizimi.'
                }
            />
            <div className="ps-page--simple">
                <Checkout />
            </div>
        </PageContainer>
    );
};

export default CheckoutPage;
