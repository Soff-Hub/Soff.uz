import { useRouter } from 'next/router';
import React, { useState } from 'react';

const parentCategoriesData = [
    {
        title: 'Ilmiy ishlar',
        imgUrl: '/static/img/Ilmiy-ishlar.png',
        path: '/scientific-resources/all',
        width: '401px',
    },
    {
        title: '3D moddellar va Interier dizaynlar',
        imgUrl: '/static/img/3D-moddellar-va-Interier-dizaynlar.png',
        width: '401px',
        path: '/3d-models-and-interior-designs/all',
    },
    {
        title: 'Dizayn shablonlari',
        imgUrl: '/static/img/Dizayn-shablonlari.png',
        width: '531px',
        path: '/design-developments/all',
    },
    {
        title: 'Veb saytlar',
        imgUrl: '/static/img/Veb-saytlar.png',
        width: '531px',
        path: '/websites/all',
    },
    {
        title: 'Tayyor shablonlar',
        imgUrl: '/static/img/Ilmiy-ishlar.png',
        path: '/scientific-resources/all',
        width: '401px',
    },
    {
        title: 'Video darsliklar',
        imgUrl: '/static/img/Video-darsliklar.png',
        width: '401px',
        path: '/videoLessons/all',
    },
];

export default function ParentCategories () {
    const router = useRouter();
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <div className='my-4 '>
            <h2 className='product-list-title'>
                Bizning Xizmatlar Katalogimiz!{' '}
            </h2>
            <div className=' product-list-card-box p-0'>
                {parentCategoriesData.map((item, index) => (
                    <div
                        key={index}
                        className=' product_list_item'
                        style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, ${
                                hoveredId === item.title ? '0.4' : '0.1'
                            }), rgba(0, 0, 0,${
                                hoveredId === item.title ? '0.4' : '0.1'
                            })),url(${item.imgUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            cursor: 'pointer',
                            width: item.width,
                            height: '268px',
                            borderRadius: '12px',
                        }}
                        onClick={() => router.push(item.path)}
                        onMouseEnter={() => setHoveredId(item.title)}
                        onMouseLeave={() => setHoveredId(null)}>
                        <h3 className='product-list-card-title h-75'>
                            {item.title}
                        </h3>
                        <a
                            className='product-list-card-btn text-white bg-success'
                            href='#'>
                            Ko'rib chiqish
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
