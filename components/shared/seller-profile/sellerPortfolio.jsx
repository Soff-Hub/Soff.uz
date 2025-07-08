'use client';

import { Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import VideoLessons from '../seller-products-types/video-lessons';
import ServiceIsUnavailable from './ServiceIsUnavailable';

const dataOptions = [
    {
        type: 'type1',
        title: 'Title Title Title Title Title ... ',
        price: '$10',
        image: '/static/img/type1.png',
        hoverImage: '/static/img/typeHover.png',
    },
    {
        type: 'type1',
        title: 'Title Title Title Title Title ... ',
        price: '$12',
        image: '/static/img/type1.png',
        hoverImage: '/static/img/typeHover.png',
    },
    {
        type: 'type2',
        title: 'Title Title Title Title Title ... ',
        price: '$15',
        image: '/static/img/type2.png',
        hoverImage: '/static/img/type2Hover.png',
    },
    {
        type: 'type2',
        title: 'Title Title Title Title Title ... ',
        price: '$18',
        image: '/static/img/type2.png',
        hoverImage: '/static/img/type2Hover.png',
    },
    {
        type: 'type3',
        title: 'Title Title Title Title Title ... ',
        price: '$20',
        image: '/static/img/type3.png',
        hoverImage: '/static/img/type3Hover.png',
    },
    {
        type: 'type3',
        title: 'Title Title Title Title Title ... ',
        price: '$22',
        image: '/static/img/type3.png',
        hoverImage: '/static/img/type3Hover.png',
    },
    {
        type: 'type1',
        title: 'Title Title Title Title Title ... ',
        price: '$10',
        image: '/static/img/type1.png',
        hoverImage: '/static/img/typeHover.png',
    },
    {
        type: 'type1',
        title: 'Title Title Title Title Title ... ',
        price: '$12',
        image: '/static/img/type1.png',
        hoverImage: '/static/img/typeHover.png',
    },
    {
        type: 'type2',
        title: 'Title Title Title Title Title ... ',
        price: '$15',
        image: '/static/img/type2.png',
        hoverImage: '/static/img/type2Hover.png',
    },
    {
        type: 'type2',
        title: 'Title Title Title Title Title ... ',
        price: '$18',
        image: '/static/img/type2.png',
        hoverImage: '/static/img/type2Hover.png',
    },
    {
        type: 'type3',
        title: 'Title Title Title Title Title ... ',
        price: '$20',
        image: '/static/img/type3.png',
        hoverImage: '/static/img/type3Hover.png',
    },
    {
        type: 'type3',
        title: 'Title Title Title Title Title ... ',
        price: '$22',
        image: '/static/img/type3.png',
        hoverImage: '/static/img/type3Hover.png',
    },
    {
        type: 'type1',
        title: 'Title Title Title Title Title ... ',
        price: '$10',
        image: '/static/img/type1.png',
        hoverImage: '/static/img/typeHover.png',
    },
    {
        type: 'type1',
        title: 'Title Title Title Title Title ... ',
        price: '$12',
        image: '/static/img/type1.png',
        hoverImage: '/static/img/typeHover.png',
    },
    {
        type: 'type2',
        title: 'Title Title Title Title Title ... ',
        price: '$15',
        image: '/static/img/type2.png',
        hoverImage: '/static/img/type2Hover.png',
    },
    {
        type: 'type2',
        title: 'Title Title Title Title Title ... ',
        price: '$18',
        image: '/static/img/type2.png',
        hoverImage: '/static/img/type2Hover.png',
    },
    {
        type: 'type3',
        title: 'Title Title Title Title Title ... ',
        price: '$20',
        image: '/static/img/type3.png',
        hoverImage: '/static/img/type3Hover.png',
    },
    {
        type: 'type3',
        title: 'Title Title Title Title Title ... ',
        price: '$22',
        image: '/static/img/type3.png',
        hoverImage: '/static/img/type3Hover.png',
    },
    {
        type: 'type1',
        title: 'Title Title Title Title Title ... ',
        price: '$10',
        image: '/static/img/type1.png',
        hoverImage: '/static/img/typeHover.png',
    },
    {
        type: 'type1',
        title: 'Title Title Title Title Title ... ',
        price: '$12',
        image: '/static/img/type1.png',
        hoverImage: '/static/img/typeHover.png',
    },
    {
        type: 'type2',
        title: 'Title Title Title Title Title ... ',
        price: '$15',
        image: '/static/img/type2.png',
        hoverImage: '/static/img/type2Hover.png',
    },
    {
        type: 'type2',
        title: 'Title Title Title Title Title ... ',
        price: '$18',
        image: '/static/img/type2.png',
        hoverImage: '/static/img/type2Hover.png',
    },
    {
        type: 'type3',
        title: 'Title Title Title Title Title ... ',
        price: '$20',
        image: '/static/img/type3.png',
        hoverImage: '/static/img/type3Hover.png',
    },
    {
        type: 'type3',
        title: 'Title Title Title Title Title ... ',
        price: '$22',
        image: '/static/img/type3.png',
        hoverImage: '/static/img/type3Hover.png',
    },
    {
        type: 'type1',
        title: 'Title Title Title Title Title ... ',
        price: '$10',
        image: '/static/img/type1.png',
        hoverImage: '/static/img/typeHover.png',
    },
    {
        type: 'type1',
        title: 'Title Title Title Title Title ... ',
        price: '$12',
        image: '/static/img/type1.png',
        hoverImage: '/static/img/typeHover.png',
    },
    {
        type: 'type2',
        title: 'Title Title Title Title Title ... ',
        price: '$15',
        image: '/static/img/type2.png',
        hoverImage: '/static/img/type2Hover.png',
    },
    {
        type: 'type2',
        title: 'Title Title Title Title Title ... ',
        price: '$18',
        image: '/static/img/type2.png',
        hoverImage: '/static/img/type2Hover.png',
    },
    {
        type: 'type3',
        title: 'Title Title Title Title Title ... ',
        price: '$20',
        image: '/static/img/type3.png',
        hoverImage: '/static/img/type3Hover.png',
    },
    {
        type: 'type3',
        title: 'Title Title Title Title Title ... ',
        price: '$22',
        image: '/static/img/type3.png',
        hoverImage: '/static/img/type3Hover.png',
    },
    {
        type: 'type1',
        title: 'Title Title Title Title Title ... ',
        price: '$10',
        image: '/static/img/type1.png',
        hoverImage: '/static/img/typeHover.png',
    },
    {
        type: 'type1',
        title: 'Title Title Title Title Title ... ',
        price: '$12',
        image: '/static/img/type1.png',
        hoverImage: '/static/img/typeHover.png',
    },
    {
        type: 'type2',
        title: 'Title Title Title Title Title ... ',
        price: '$15',
        image: '/static/img/type2.png',
        hoverImage: '/static/img/type2Hover.png',
    },
    {
        type: 'type2',
        title: 'Title Title Title Title Title ... ',
        price: '$18',
        image: '/static/img/type2.png',
        hoverImage: '/static/img/type2Hover.png',
    },
    {
        type: 'type3',
        title: 'Title Title Title Title Title ... ',
        price: '$20',
        image: '/static/img/type3.png',
        hoverImage: '/static/img/type3Hover.png',
    },
    {
        type: 'type3',
        title: 'Title Title Title Title Title ... ',
        price: '$22',
        image: '/static/img/type3.png',
        hoverImage: '/static/img/type3Hover.png',
    },
    {
        type: 'type1',
        title: 'Title Title Title Title Title ... ',
        price: '$10',
        image: '/static/img/type1.png',
        hoverImage: '/static/img/typeHover.png',
    },
    {
        type: 'type1',
        title: 'Title Title Title Title Title ... ',
        price: '$12',
        image: '/static/img/type1.png',
        hoverImage: '/static/img/typeHover.png',
    },
    {
        type: 'type2',
        title: 'Title Title Title Title Title ... ',
        price: '$15',
        image: '/static/img/type2.png',
        hoverImage: '/static/img/type2Hover.png',
    },
    {
        type: 'type2',
        title: 'Title Title Title Title Title ... ',
        price: '$18',
        image: '/static/img/type2.png',
        hoverImage: '/static/img/type2Hover.png',
    },
    {
        type: 'type3',
        title: 'Title Title Title Title Title ... ',
        price: '$20',
        image: '/static/img/type3.png',
        hoverImage: '/static/img/type3Hover.png',
    },
    {
        type: 'type3',
        title: 'Title Title Title Title Title ... ',
        price: '$22',
        image: '/static/img/type3.png',
        hoverImage: '/static/img/type3Hover.png',
    },
];

export default function SellerPortfolio ({ pid }) {
    const [parentCategory, setParentCategory] = useState('type1');
    const [childCategory, setChildCategory] = useState('type1');
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [portfolioData, setPortfolioData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    console.log('portfolioData', portfolioData);

    const filteredItems = dataOptions.filter(
        item => item.type === parentCategory
    );

    console.log('filteredItems', filteredItems);

    useEffect(() => {
        if (!pid) return;

        setIsLoading(true);

        fetch(`http://176.96.241.219:8005/api/v1/categories/portfolio/1`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                setPortfolioData(data);
            })
            .catch(error => {
                console.error('Error fetching seller:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [pid]);

    return (
        <div className='SellerPortfolio'>
            <form action='' className='SellerPortfolioForm'>
                <select
                    className='SellerPortfolioSelect'
                    onChange={e => setParentCategory(e.target.value)}>
                    <option value='type1'>Type 1</option>
                    <option value='type2'>Type 2</option>
                    <option value='type3'>Type 3</option>
                </select>
                <select
                    className='SellerPortfolioSelect '
                    name=''
                    id=''
                    onChange={e => setChildCategory(e.target.value)}>
                    <option value='' selected hidden>
                        Xizmat turlari
                    </option>
                </select>
            </form>
            <div className='SellerPortfolioWrap'>
                {isLoading && (
                    <>
                        {Array(32)
                            .fill(0)
                            .map((d, i) => (
                                <Skeleton.Image
                                    key={i}
                                    active
                                    className='SellerPortfolioSkeleton shadow'
                                />
                            ))}
                    </>
                )}
                {filteredItems.map((item, index) => (
                    <div
                        key={index}
                        className='SellerPortfolioCard'
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}>
                        <img
                            src={
                                hoveredIndex === index
                                    ? item.hoverImage
                                    : item.image
                            }
                            alt={item.title}
                            className='SellerPortfolioCardImg'
                        />
                        <div className='SellerPortfolioCardbody'>
                            <p className='SellerPortfolioCardTitle'>
                                {item.title}
                            </p>
                            <div className='SellerPortfolioCardEnd d-flex justify-content-between'>
                                <p className=''>Sub Category</p>
                                <div className='d-flex align-items-center gap-2'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='18'
                                        height='10'
                                        viewBox='0 0 18 10'
                                        fill='none'>
                                        <path
                                            d='M0.798557 4.09724C0.599203 4.35429 0.5 4.67471 0.5 5C0.5 5.32529 0.599204 5.64571 0.798558 5.90276C5.03539 11.3657 12.9646 11.3657 17.2014 5.90276C17.4008 5.64571 17.5 5.32529 17.5 5C17.5 4.67471 17.4008 4.35429 17.2014 4.09724C12.9646 -1.36575 5.03539 -1.36575 0.798557 4.09724ZM9 9C6.65254 9 4.75 7.20937 4.75 5C4.75 2.79063 6.65254 1 9 1C11.3475 1 13.25 2.79063 13.25 5C13.25 7.20937 11.3475 9 9 9ZM9 2.75C9 2.54031 9.03689 2.34082 9.09664 2.14825C9.11783 2.07996 9.0715 2 9 2C7.24023 2 5.8125 3.34375 5.8125 5C5.8125 6.65625 7.24023 8 9 8C10.7598 8 12.1875 6.65625 12.1875 5C12.1875 4.93343 12.1091 4.88717 12.045 4.9052C11.8372 4.96369 11.6184 5 11.3906 5C10.0691 5 9 3.99375 9 2.75Z'
                                            fill='white'
                                        />
                                    </svg>
                                    <p className='text-white p-0 m-0'>8</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='showMoreBox'>
                <p className='showMore'> Yana ko’rsatish</p>
            </div>
        </div>
    );
}
