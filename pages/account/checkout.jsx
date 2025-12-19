import React from 'react';
import Checkout from '~/features/account/ui/Checkout';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';

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
