import { useRouter } from 'next/router';
import React from 'react';

const itServicesCategoriesData = [
    {
        title: 'Ilmiy va Akademik Xizmatlar',
        imgUrl: '/static/img/Biznes-&-Hayot.webp',
        bgColor: '#697200',
        path: '/orders?direction=scientific_work',
    },
    {
        title: '3D Dizayn va Vizualizatsiya',
        imgUrl: '/static/img/3d-design.webp',
        bgColor: '#02732f',
        path: '/orders?direction=three_d',
    },
    {
        title: 'Grafik Dizayn va Shablonlar',
        imgUrl: '/static/img/dizayn-2.webp',
        bgColor: '#4d1727',
        path: '/orders?direction=dizayn',
    },
    {
        title: 'Veb Dasturlash va IT Xizmatlari',
        imgUrl: '/static/img/Rivojlanish-&-IT.webp',
        bgColor: '#ff7641',
        path: '/orders?direction=web',
    },
    {
        title: 'Hujjatlar va Professional Shablonlar',
        imgUrl: '/static/img/Matnlar-&-Tarjimalar.webp',
        bgColor: '#421300',
        path: '/orders?direction=document',
    },
];
export default function ItServicesCategories() {
    const router = useRouter();
    return (
        <div className="container p-md-0 mt-3">
            <h2 className="product-list-title">
                Xizmatni Tanlang – Buyurtma Bering
            </h2>
            <div className="it-services-grid-container">
                {itServicesCategoriesData.map((item, index) => {
                    return (
                        <div
                            className="it-services-card"
                            key={index}
                            onClick={() => router.push(item.path)}>
                            <div className="it-services-card-inner">
                                <img
                                    src={item.imgUrl}
                                    className="it-services-card-image"
                                    alt={item.title}
                                />
                                <div className="it-services-card-title-box">
                                    <h3 className="it-services-card-title">
                                        {item.title}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
