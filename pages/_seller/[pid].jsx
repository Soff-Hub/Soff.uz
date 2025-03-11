import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import FooterComponents from '~/components/blocks/footer/FooterComponents';
import PageContainer from '~/components/layouts/PageContainer';
import SellerComments from '~/components/shared/seller-profile/sellerComments';
import SellerInfo from '~/components/shared/seller-profile/sellerInfo';
import SellerServices from '~/components/shared/seller-profile/sellerServices';
import SellerShortInfo from '~/components/shared/seller-profile/sellerShortInfo';

export default function SellersPage () {
    const { asPath } = useRouter();
    const activeIndex = asPath.slice(asPath.indexOf('#') + 1, asPath.length);

    const sellerTabItems = {
        about_author: <SellerInfo />,
        services: <SellerServices />,
        comments: <SellerComments />,
    };

    const menuItems = [
        {
            title: 'Muallif Haqimizda',
            path: 'about_author',
        },
        {
            title: 'Xizmatlar',
            path: 'services',
        },
        {
            title: 'Mahsulotlar',
            path: 'products',
        },
        {
            title: 'Kamentariyalar',
            path: 'comments',
        },
    ];
    return (
        <PageContainer>
            <div className='container bg-gray-999 p-xl-0'>
                <div className='SellersPageWrap'>
                    <div className='bg-white rounded-1 shadow-sm'>
                        <SellerShortInfo />
                    </div>
                    <div className='sellerProduct '>
                        <div className='shadow-sm'>
                            <div className='sellerProductMenu'>
                                {menuItems.map((item, index) => (
                                    <Link href={`#${item.path}`} key={index}>
                                        <a
                                            className={`activeTab ${
                                                activeIndex === item.path
                                                    ? 'active'
                                                    : ''
                                            }`}>
                                            {item.title}
                                        </a>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        {sellerTabItems[activeIndex]}
                    </div>
                </div>
            </div>
            <FooterComponents />
        </PageContainer>
    );
}
