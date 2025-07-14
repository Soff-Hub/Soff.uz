import React, { useEffect, useState } from 'react';
import ScientificResources from '../seller-products-types/scientific-resources';
import ModelAndDesign from '../seller-products-types/model-and-design';
import DesignDevelopment from '../seller-products-types/design-development';
import WebSites from '../seller-products-types/webSites';
import Templates from '../seller-products-types/templates';
import VideoLessons from '../seller-products-types/video-lessons';
import { Skeleton } from 'antd';
import { useRouter } from 'next/router';
import { baseURL } from '~/repositories/api';

export default function SellerProduct (pid) {
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    console.log('product=>>>>', product);

    useEffect(() => {
        if (!pid) return;
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(
                    // `${baseURL}customer/seller-products/10889/?direction=file&category=${menuItems.path}`
                    `${baseURL}customer/seller-products/10889`
                    // `http://176.96.241.219:8006/api/v1/customer/seller-products/${pid}`
                    // `${baseUrlUseApi}customer/products/?direction=file&category=${categoryParam}&page=${page}&page_size=48`;
                );
                const text = await res.text();
                const data = JSON.parse(text);
                setProduct(data);
            } catch (err) {
                console.error('Error fetching seller:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [pid]);
    const [selectedOption, setSelectedOption] = useState('All');

    const renderComponent = () => {
        switch (selectedOption) {
            case 'All':
                return (
                    <div>
                        <ScientificResources data={product} />
                        <ModelAndDesign data={product} />
                        <DesignDevelopment data={product} />
                        <WebSites data={product} />
                        <Templates data={product} />
                        <VideoLessons data={product} />
                    </div>
                );
            case 'ScientificResources':
                return <ScientificResources data={product} />;
            case 'ModelAndDesign':
                return <ModelAndDesign data={product} />;
            case 'DesignDevelopment':
                return <DesignDevelopment data={product} />;
            case 'WebSites':
                return <WebSites data={product} />;
            case 'Templates':
                return <Templates data={product} />;
            case 'VideoLessons':
                return <VideoLessons data={product} />;
            default:
                return null;
        }
    };
    const menuItems = [
        {
            title: 'Barchasi',
            path: 'All',
        },
        {
            title: 'Ilmiy ishlar',
            path: `${product.file}`,
        },
        {
            title: '3D moddellar va Interier dizaynlar',
            path: `${product['3d']}`,
        },
        {
            title: 'Dizayn shablonlari',
            path: `${product.design}`,
        },
        {
            title: 'Veb saytlar',
            path: `${product.webSites}`,
        },
        {
            title: 'Tayyor shablonlar',
            path: `${product.templates}`,
        },
        {
            title: 'Video darsliklar',
            path: `${product.video}`,
        },
    ];
    return (
        <div className='SellerProduct'>
            <form action='' className='SellerProductForm'>
                <div className='SellerProductInputBox '>
                    <input
                        type='text'
                        placeholder='Xizmat turini izlang'
                        name=''
                        id=''
                        className='SellerProductInput'
                    />
                    <img src='/static/img/searchIcon.png' alt='' />
                </div>
                <select
                    className='SellerProductSelect '
                    value={selectedOption}
                    onChange={e => setSelectedOption(e.target.value)}
                    name=''
                    id=''>
                    <option value='' selected hidden>
                        Xizmat turlari
                    </option>
                    {menuItems.map((item, index) => (
                        <option value={item.path} key={index}>
                            {item.title}
                        </option>
                    ))}
                </select>
                <select className='SellerProductSelect ' name='' id=''>
                    <option value='' selected hidden>
                        Xizmat turlari
                    </option>
                </select>
            </form>

            <div className='sellerProductSkeletonWrap'>
                {isLoading && (
                    <>
                        {Array(16)
                            .fill(0)
                            .map((d, i) => (
                                <Skeleton.Image
                                    key={i}
                                    active
                                    className='sellerProductSkeleton shadow'
                                    style={{ width: '100%' }}
                                />
                            ))}
                    </>
                )}
            </div>
            <div className=''>{renderComponent()}</div>
        </div>
    );
}
