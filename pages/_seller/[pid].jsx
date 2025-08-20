import { useQuery } from '@tanstack/react-query';
import { Modal } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import SellerCollapseMenu from '~/components/shared/seller-profile/sellerCollapseMenu';
import SellerComments from '~/components/shared/seller-profile/sellerComments';
import SellerInfo from '~/components/shared/seller-profile/sellerInfo';
import SellerPortfolio from '~/components/shared/seller-profile/sellerPortfolio';
import SellerProduct from '~/components/shared/seller-profile/sellerProduct';
import SellerServices from '~/components/shared/seller-profile/sellerServices';
import SellerShortInfo from '~/components/shared/seller-profile/sellerShortInfo';
import { api } from '~/repositories/api';
import { authAxios } from '~/repositories/authApi';

export default function SellersPage() {
    const router = useRouter();
    const { query, asPath, isReady } = router;
    const activeIndex = asPath.slice(asPath.indexOf('#') + 1, asPath.length);

    const pid = query.pid;
    console.log('pid', pid);

    const menuItems = [
        {
            title: 'Muallif Haqida',
            path: 'about_author',
        },
        {
            title: 'Portfolio',
            path: 'portfolio',
        },
        {
            title: 'Xizmatlar',
            path: 'services',
        },
        {
            title: 'Mahsulotlar',
            path: 'products',
        },
        // {
        //     title: 'Kamentariyalar',
        //     path: 'comments',
        // },
    ];
    const { data, isLoading: getDetailsLoading } = useQuery({
        queryKey: ['getSellerDetails'],
        queryFn: async () => {
            const response = await authAxios.get(
                `/auth/freelance-profile/${pid}/`
            );

            return response.data;
        },
        enabled: !!pid,
    });
    console.log('data', data);

    const sellerTabItems = {
        about_author: <SellerInfo pid={pid} sellerInfo={data} />,
        portfolio: <SellerPortfolio pid={pid} />,
        services: <SellerServices pid={pid} />,
        products: <SellerProduct pid={pid} />,
        // comments: <SellerComments pid={pid} />,
    };

    return (
        <PageContainer>
            <div className="container bg-gray-999 ">
                <div className="SellersPageWrap">
                    <div className="SellerShortInfo">
                        <SellerShortInfo sellerInfo={data} />
                    </div>
                    <div className="SellerCollapseMenu">
                        <SellerCollapseMenu pid={pid} />
                    </div>
                    <div className="sellerProduct ">
                        <div className="shadow-sm">
                            <div className="sellerProductMenu">
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
        </PageContainer>
    );
}
