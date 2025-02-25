import { useRouter } from 'next/router';
import React from 'react';

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
        title: 'Ilmiy ishlar',
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

    return (
        <div className='container p-0 my-4 '>
            <h2 className='product-list-title'>
                Bizning Xizmatlar Katalogimiz!{' '}
            </h2>
            <div className='d-flex justify-content-center flex-wrap gap-5 product-list-card-box p-0'>
                {parentCategoriesData.map((item, index) => (
                    <div
                        key={index}
                        className='p-5'
                        style={{
                            backgroundImage: `url(${item.imgUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            cursor: 'pointer',
                            width: item.width,
                            height: '268px',
                        }}
                        onClick={() => router.push(item.path)}>
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
