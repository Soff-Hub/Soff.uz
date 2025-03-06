import { useRouter } from 'next/router';
import React, { useState } from 'react';

const parentCategoriesData = [
    {
        title: 'Ilmiy ishlar',
        imgUrl: '/static/img/Ilmiy-ishlar.png',
        path: '/scientific-resources/all',
    },
    {
        title: '3D moddellar va Interier dizaynlar',
        imgUrl: '/static/img/3D-moddellar-va-Interier-dizaynlar.png',
        path: '/3d-models-and-interior-designs/all',
    },
    {
        title: 'Dizayn shablonlari',
        imgUrl: '/static/img/Dizayn-shablonlari.png',
        path: '/design-developments/all',
    },
    {
        title: 'Veb saytlar',
        imgUrl: '/static/img/Veb-saytlar.png',
        path: '/websites/all',
    },
    {
        title: 'Tayyor shablonlar',
        imgUrl: '/static/img/Ilmiy-ishlar.png',
        path: '/scientific-resources/all',
    },
    {
        title: 'Video darsliklar',
        imgUrl: '/static/img/Video-darsliklar.png',
        path: '/videoLessons/all',
    },
];

export default function ParentCategories() {
    const router = useRouter();
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <div className='container p-0 my-4'>
            <h2 className='product-list-title'>
                Bizning Xizmatlar Katalogimiz!
            </h2>
            <div className='product-list-card-box'>
                {parentCategoriesData.map((item, index) => (
                    <div
                        key={index}
                        className='product-card'
                        style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, ${
                                hoveredId === item.title ? "0.4" : "0.1"
                            }), rgba(0, 0, 0,${
                                hoveredId === item.title ? "0.4" : "0.1"
                            })),url(${item.imgUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                        onClick={() => router.push(item.path)}
                        onMouseEnter={() => setHoveredId(item.title)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <div className="d-flex flex-column justify-content-between h-100">
                            <h3 className='product-list-card-title'>
                                {item.title}
                            </h3>
                            <a
                                className='product-list-card-btn'
                                href='#'
                                onClick={(e) => e.preventDefault()}
                            >
                                Ko'rib chiqish
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}