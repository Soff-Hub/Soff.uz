'use client';

import { Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import ServiceIsUnavailable from './ServiceIsUnavailable';
import ProtfolioModal from './porfolioModal';

export default function SellerPortfolio ({ pid }) {
    const [parentCategory, setParentCategory] = useState('all');
    const [childCategory, setChildCategory] = useState('all');
    const [portfolioData, setPortfolioData] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // start as true
    const [showUnavailable, setShowUnavailable] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [cardId, setCardId] = useState(null);

    const uniqueCategories = Array.from(
        new Map(
            (portfolioData?.items || [])
                .filter(
                    item => item?.category?.id != null && item?.category?.title
                )
                .map(item => [
                    item.category.id,
                    { id: item.category.id, name: item.category.title },
                ])
        ).values()
    );

    const uniqueSubCategories = Array.from(
        new Map(
            (portfolioData?.items || [])
                .filter(
                    item =>
                        item?.sub_category?.id != null &&
                        item?.sub_category?.title
                )
                .map(item => [
                    item.sub_category.id,
                    { id: item.sub_category.id, name: item.sub_category.title },
                ])
        ).values()
    );

    useEffect(() => {
        if (!pid) return;

        setIsLoading(true);
        setShowUnavailable(false);

        const timer = setTimeout(() => {
            setIsLoading(false);
            if (!portfolioData || portfolioData?.items?.length === 0) {
                setShowUnavailable(true);
            }
        }, 2000); // 2 seconds timeout

        const query = new URLSearchParams();
        query.append('soff_seller_id', pid);
        if (parentCategory !== 'all')
            query.append('category_id', parentCategory);
        if (childCategory !== 'all')
            query.append('subcategory_id', childCategory);

        fetch(
            `http://176.96.241.219:8005/api/v1/categories/portfolio?${query.toString()}`
        )
            .then(res => res.json())
            .then(data => {
                setPortfolioData(data);
                clearTimeout(timer);
                setIsLoading(false);
                setShowUnavailable(data?.items?.length === 0);
            })
            .catch(error => {
                console.error('Error fetching seller:', error);
                clearTimeout(timer);
                setIsLoading(false);
                setShowUnavailable(true);
            });

        return () => clearTimeout(timer);
    }, [pid, parentCategory, childCategory]);

    useEffect(() => {
        setChildCategory('all');
    }, [parentCategory]);

    useEffect(() => {
        if (openModal) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [openModal]);
    return (
        <div>
            {isLoading ? (
                <div className='sellerProductSkeletonWrap'>
                    {Array(16)
                        .fill(0)
                        .map((_, i) => (
                            <Skeleton.Image
                                key={i}
                                active
                                className='sellerProductSkeleton shadow'
                                style={{ width: '100%' }}
                            />
                        ))}
                </div>
            ) : showUnavailable ? (
                <ServiceIsUnavailable />
            ) : (
                <div className='SellerPortfolio'>
                    <form className='SellerPortfolioForm'>
                        {uniqueCategories.length > 0 && (
                            <select
                                className='SellerPortfolioSelect'
                                value={parentCategory}
                                onChange={e =>
                                    setParentCategory(e.target.value)
                                }>
                                <option value='all'>Barchasi</option>
                                {uniqueCategories.map(cat => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        )}
                        {uniqueSubCategories.length > 0 && (
                            <select
                                className='SellerPortfolioSelect'
                                value={childCategory}
                                onChange={e =>
                                    setChildCategory(e.target.value)
                                }>
                                <option value='all'>Barchasi</option>
                                {uniqueSubCategories.map(sub => (
                                    <option key={sub.id} value={sub.id}>
                                        {sub.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </form>
                    <div className='SellerPortfolioWrap'>
                        {portfolioData.items.map((item, index) => (
                            <div
                                key={index}
                                className='SellerPortfolioCard'
                                onClick={() => {
                                    setOpenModal(true);
                                    setCardId(item.id);
                                }}>
                                <img
                                    src={item?.cover_image?.[0]}
                                    alt={item?.title}
                                    className='SellerPortfolioCardImg'
                                />
                                <div className='SellerPortfolioCardbody'>
                                    <p className='SellerPortfolioCardTitle'>
                                        {item?.title}
                                    </p>
                                    <div className='SellerPortfolioCardEnd d-flex justify-content-between'>
                                        <p className='SellerPortfolioCardEndTitle'>
                                            {item?.sub_category?.title}
                                        </p>

                                        <div className='SellerPortfolioCard_view_count'>
                                            <img
                                                src='/static/img/eye.png'
                                                width={'20px'}
                                            />

                                            <p className='text-white p-0 m-0'>
                                                {item?.view_count}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {openModal === true && (
                <div className='modal-overlay'>
                    {' '}
                    <ProtfolioModal
                        data={portfolioData?.items.find(
                            item => item.id === cardId
                        )}
                        setOpenModal={setOpenModal}
                    />
                </div>
            )}
        </div>
    );
}
