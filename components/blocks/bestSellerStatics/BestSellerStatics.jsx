import React from 'react';
import ActiveSellers from './typeStatice/activeSellers';
import BestSeller from './typeStatice/bestSeller';
import TopProduct from './typeStatice/topProduct';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function BestSellerStatics () {
    const { asPath } = useRouter();
    const activeIndex = asPath.slice(asPath.indexOf('#') + 1, asPath.length);

    const sellerTabItems = {
        ActiveSellers: <ActiveSellers />,
        BestSeller: <BestSeller />,
        TopProduct: <TopProduct />,
    };

    const menuItems = [
        {
            title: 'Faol sotuvchilar',
            path: 'ActiveSellers',
        },
        {
            title: 'Best seller mualliflar',
            path: 'BestSeller',
        },
        {
            title: 'Top mahsulotlar',
            path: 'TopProduct',
        },
    ];
    return (
        <div className='BestSellerStaticsTable'>
            <div className=' BestSellerStaticsTableTab '>
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
            <div className='BestSellerStaticsTableWrap container'>
                <ActiveSellers />
                <BestSeller />
                <TopProduct />
            </div>
        </div>
    );
}
