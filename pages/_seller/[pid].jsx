import { useRouter } from 'next/router';
import React from 'react';
import FooterComponents from '~/components/blocks/footer/FooterComponents';
import PageContainer from '~/components/layouts/PageContainer';
import SellerInfo from '~/components/shared/seller-profile/sellerInfo';
import SellerProduct from '~/components/shared/seller-profile/sellerProduct';
import { useGet } from '~/repositories/https';
import { baseUrl } from '~/repositories/Repository';

export default function SellersPage () {

    return (
        <PageContainer>
            <div className='container bg-gray-999 p-xl-0'>
                <div className='SellersPageWrap'>
                    <div className='bg-white rounded-1 shadow-sm'>
                        <SellerInfo />
                    </div>
                    <div className='sellerProduct '>
                        <SellerProduct />
                    </div>
                </div>
            </div>
            <FooterComponents />
        </PageContainer>
    );
}
