import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Wishlist from '~/components/partials/account/Wishlist';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';

const WishlistPage = () => {
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: 'Tanlanganlar',
        },
    ];

    return (
        <PageContainer>
            <div className="ps-page--simple">
                <Meta
                    title={'Tanlanganlar'}
                    description="Soff.uz - Saytida harid savatiga saqlab qo'ygan mahsuloatlaringizni sotib olishni unutmang"
                />
                <BreadCrumb breacrumb={breadCrumb} />
                <Wishlist />
            </div>
        </PageContainer>
    );
};

export default WishlistPage;
