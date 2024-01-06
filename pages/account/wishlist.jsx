import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Wishlist from '~/components/partials/account/Wishlist';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';

const WishlistPage = () => {
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/main',
        },
        {
            text: 'Tanlanganlar',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Wishlist">
            <div className="ps-page--simple">
                <BreadCrumb breacrumb={breadCrumb} />
                <Wishlist />
            </div>
        </PageContainer>
    );
};

export default WishlistPage;
