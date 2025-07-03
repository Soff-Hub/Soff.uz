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
import { useGet } from '~/repositories/https';
import { baseUrl } from '~/repositories/Repository';
import { testApi } from '~/service/testApi';

export default function SellersPage () {
    const router = useRouter();
    const { query, asPath } = router;
    const activeIndex = asPath.slice(asPath.indexOf('#') + 1, asPath.length);
    const [seller, setSeller] = useState(null);
    const [selleserviceDatar, setServiceData] = useState(null);

    async function getData () {
        await testApi
            .get('services/')
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

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
        if (query.pid) {
            fetch(`${baseUrl}customer/top-sellers/${query.pid}`)
                .then(res => res.json())
                .then(data => {
                    setSeller(data);
                })
                .catch(error => {
                    console.error('Error fetching seller:', error);
                });
        }
        getData();
    }, [query.pid]);

    const sellerTabItems = {
        about_author: <SellerInfo sellerInfo={seller} />,
        services: <SellerServices />,
        portfolio: <SellerPortfolio />,
        comments: <SellerComments />,
        products: <SellerProduct />,
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
