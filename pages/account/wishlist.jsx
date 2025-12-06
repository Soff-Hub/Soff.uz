import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';
import Wishlist from '~/components/account/wishlist';

const WishlistPage = () => {
    return (
        <PageContainer>
            <Meta
                title={'Tanlanganlar'}
                description="Soff.uz - Saytida harid savatiga saqlab qo'ygan mahsuloatlaringizni sotib olishni unutmang"
            />
            <Wishlist />
        </PageContainer>
    );
};

export default WishlistPage;
