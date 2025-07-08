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
import { soffApi } from '~/service/soffApi';

export default function SellersPage () {
    const router = useRouter();
    const { query, asPath, isReady } = router;
    const activeIndex = asPath.slice(asPath.indexOf('#') + 1, asPath.length);
    const [seller, setSeller] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const pid = 8;
    // const pid = query.pid;

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
        {
            title: 'Kamentariyalar',
            path: 'comments',
        },
    ];

    useEffect(() => {
        if (!isReady || !pid) return;

        setIsLoading(true);

        fetch(
            `http://176.96.241.219:8006/api/v1/customer/freelance-profile/${pid}`
        )
            .then(res => res.json())
            .then(data => {
                setSeller(data);
            })
            .catch(error => {
                console.error('Error fetching seller:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [isReady, pid]);

    const sellerTabItems = {
        about_author: <SellerInfo pid={seller} />,
        services: <SellerServices pid={pid} />,
        portfolio: <SellerPortfolio pid={pid} />,
        comments: <SellerComments pid={pid} />,
        products: <SellerProduct pid={pid} />,
    };

    return (
        <PageContainer>
            <div className='container bg-gray-999 '>
                <div className='SellersPageWrap'>
                    <div className=''>
                        <SellerShortInfo sellerInfo={seller} />
                    </div>
                    <div className='SellerCollapseMenu'>
                        <SellerCollapseMenu />
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
        </PageContainer>
    );
}
