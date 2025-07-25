import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const parentCategoriesData = [
    {
        title: 'Ilmiy ishlar',
        imgUrl: '/static/img/ilmiy-ishlar-2.webp',
        path: '/category/all',
    },
    {
        title: '3D moddellar va Interier dizaynlar',
        imgUrl: '/static/img/3D-moddellar-va-Interier-dizaynlar-2.webp',
        path: '/3d-models-and-interior-designs/all',
        width: '401px',
    },
    {
        title: 'Dizayn shablonlari',
        imgUrl: '/static/img/dizayn-shablonlari-2.webp',
        path: '/design-developments/all',
        width: '531px',
    },
    {
        title: 'Veb saytlar',
        imgUrl: '/static/img/veb-saytlar-2.webp',
        path: '/websites/all',
        width: '531px',
    },
    {
        title: 'Turli sohalar uchun shablonlar',
        imgUrl: '/static/img/shablonlar-3.webp',
        path: '/templates/all',
    },
    {
        title: 'Video darsliklar',
        imgUrl: '/static/img/video-darsliklar-2.webp',
        path: '/video-lessons/all',
    },
];

export default function ParentCategories () {
    const router = useRouter();
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <div className='container p-0 my-0'>
            <h2 className='product-list-title'>Tayyor Materiallar Bo‘limi</h2>
            <div className='product-list-card-box'>
                {parentCategoriesData.map((item, index) => (
                    <Link href={item.path} key={index}>
                        <a>
                            <div
                                className='product-card'
                                style={{
                                    backgroundImage: `linear-gradient(rgba(0, 0, 0, ${
                                        hoveredId === item.title ? '0.4' : '0.1'
                                    }), rgba(0, 0, 0,${
                                        hoveredId === item.title ? '0.4' : '0.1'
                                    })),url(${item.imgUrl})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                }}
                                onMouseEnter={() => setHoveredId(item.title)}
                                onMouseLeave={() => setHoveredId(null)}>
                                <div className='d-flex flex-column justify-content-between h-100'>
                                    <h3 className='product-list-card-title'>
                                        {item.title}
                                    </h3>
                                    {/* <p
                                        className='product-list-card-btn'>
                                        Ko'rib chiqish
                                    </p> */}
                                </div>
                            </div>
                        </a>
                    </Link>
                ))}
            </div>
        </div>
    );
}
