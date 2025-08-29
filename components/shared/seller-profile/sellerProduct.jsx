import React, { useEffect, useState } from 'react';
import ScientificResources from '../seller-products-types/scientific-resources';
import ModelAndDesign from '../seller-products-types/model-and-design';
import DesignDevelopment from '../seller-products-types/design-development';
import WebSites from '../seller-products-types/webSites';
import Templates from '../seller-products-types/templates';
import VideoLessons from '../seller-products-types/video-lessons';
import { Skeleton } from 'antd';
import { baseURL } from '~/repositories/api';

export default function SellerProduct({ pid }) {
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [categoryValue, setCategoryValue] = useState('file');
    const [selectedOption, setSelectedOption] = useState('file');

    const names = {
        file: 'Ilmiy ishlar',
        '3d': '3D moddellar va Interier dizaynlar',
        design: 'Dizayn shablonlari',
        websites: 'Veb saytlar',
        templates: 'Tayyor shablonlar',
        video: 'Video darsliklar',
    };

    const menuItems = [
        // { title: 'Barchasi', path: '' },
        { title: 'Ilmiy ishlar', path: 'file' },
        { title: '3D moddellar va Interier dizaynlar', path: '3d' },
        { title: 'Dizayn shablonlari', path: 'design' },
        { title: 'Veb saytlar', path: 'websites' },
        { title: 'Tayyor shablonlar', path: 'templates' },
        { title: 'Video darsliklar', path: 'video' },
    ];

    useEffect(() => {
        if (!pid || categoryValue === null) return;

        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                let url = `${baseURL}customer/seller-products/${pid}/`;
                if (categoryValue) {
                    url += `?direction=${categoryValue}`;
                }

                const res = await fetch(url);
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                console.error('Error fetching products:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [pid, categoryValue]);

    const renderComponent = () => {
        switch (selectedOption) {
            case 'file':
                return (
                    <ScientificResources
                        data={product}
                        pid={pid}
                        categoryValue={setCategoryValue}
                    />
                );
            case '3d':
                return (
                    <ModelAndDesign
                        data={product}
                        pid={pid}
                        categoryValue={categoryValue}
                    />
                );
            case 'design':
                return (
                    <DesignDevelopment
                        data={product}
                        pid={pid}
                        categoryValue={categoryValue}
                    />
                );
            case 'websites':
                return (
                    <WebSites
                        pid={pid}
                        data={product}
                        categoryValue={categoryValue}
                    />
                );
            case 'templates':
                return (
                    <Templates
                        pid={pid}
                        data={product}
                        categoryValue={categoryValue}
                    />
                );
            case 'video':
                return (
                    <VideoLessons
                        data={product}
                        pid={pid}
                        categoryValue={categoryValue}
                    />
                );
                return (
                    <div>
                        <ScientificResources
                            data={product}
                            pid={pid}
                            categoryValue={categoryValue}
                        />
                        <ModelAndDesign
                            data={product}
                            pid={pid}
                            categoryValue={categoryValue}
                        />
                        <DesignDevelopment
                            data={product}
                            pid={pid}
                            categoryValue={categoryValue}
                        />
                        <WebSites
                            data={product}
                            pid={pid}
                            categoryValue={categoryValue}
                        />
                        <Templates
                            data={product}
                            pid={pid}
                            categoryValue={categoryValue}
                        />
                        <VideoLessons
                            data={product}
                            pid={pid}
                            categoryValue={categoryValue}
                        />
                    </div>
                );
        }
    };

    return (
        <div className="SellerProduct">
            <form className="SellerProductForm">
                {/* <div className='SellerProductInputBox'>
                    <input
                        type='text'
                        placeholder='Xizmat turini izlang'
                        className='SellerProductInput'
                    />
                    <img src='/static/img/searchIcon.png' alt='' />
                </div> */}
                <div className="sellerpageTitleBox">
                    <p className="sellerpageTitle">{names[selectedOption]}</p>
                </div>
                <select
                    className="SellerProductSelect"
                    onChange={e => {
                        const value = e.target.value;
                        setSelectedOption(value);
                        setCategoryValue(value);
                    }}>
                    <option value="" hidden>
                        Xizmat turlari
                    </option>
                    {menuItems.map((item, index) => (
                        <option value={item.path} key={index}>
                            {item.title}
                        </option>
                    ))}
                </select>
            </form>

            <div className="sellerProductSkeletonWrap">
                {isLoading &&
                    Array(16)
                        .fill(0)
                        .map((_, i) => (
                            <Skeleton.Image
                                key={i}
                                active
                                className="sellerProductSkeleton shadow"
                                style={{ width: '100%' }}
                            />
                        ))}
            </div>

            <div>{renderComponent(selectedOption)}</div>
        </div>
    );
}
