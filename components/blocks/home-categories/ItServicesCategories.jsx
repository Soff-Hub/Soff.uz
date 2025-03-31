import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';


const itServicesCategoriesData = [
    {
        title: 'Ilmiy va Akademik Xizmatlar',
        imgUrl: '/static/img/Biznes-&-Hayot.png',
        bgColor: '#697200',
        path: '/orders',
    },
    {
        title: '3D Dizayn va Vizualizatsiya',
        imgUrl: '/static/img/Social-Media-Reklama.png',
        bgColor: '#02732f',
        path: '/orders',
    },
    {
        title: 'Grafik Dizayn va Shablonlar',
        imgUrl: '/static/img/Dizayn.png',
        bgColor: '#4d1727',
        path: '/orders',
    },
    {
        title: 'Veb Dasturlash va IT Xizmatlari',
        imgUrl: '/static/img/Rivojlanish-&-IT.png',
        bgColor: '#ff7641',
        path: '/scientific-resources/all',
    },
    {
        title: 'Hujjatlar va Professional Shablonlar',
        imgUrl: '/static/img/Matnlar-&-Tarjimalar.png',
        bgColor: '#421300',
        path: '/orders',
    },
];

export default function ItServicesCategories () {
    const router = useRouter();

    return (
        <div className='container p-md-0 mt-3'>
            <h2 className='product-list-title'>Xizmatni Tanlang – Buyurtma Bering</h2>
            <div className="it-services-grid-container">
              {itServicesCategoriesData.map((item, index) => {
                return (
                  <div
                    className="it-services-card"
                    key={index}
                    onClick={() => router.push(item.path)}
                  >
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
