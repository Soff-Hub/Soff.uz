import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Wishlist from '~/components/partials/account/Wishlist';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
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
        <PageContainer footer={<FooterDefault />} title="Wishlist">
            <div className="ps-page--simple">
                <Meta
                    title={"Soff | Tanlanganlar"}
                />
                <BreadCrumb breacrumb={breadCrumb} />
                <Wishlist />
            </div>
        </PageContainer>
    );
};

export default WishlistPage;
