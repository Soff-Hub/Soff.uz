import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const itServicesCategoriesData = [
    {
        title: 'Rivojlanish & IT',
        imgUrl: '/static/img/Rivojlanish-&-IT.png',
        bgColor: '#ff7641',
        path: '/scientific-resources/all',
    },
    {
        title: 'Dizayn',
        imgUrl: '/static/img/Dizayn.png',
        bgColor: '#4d1727',
        path: '#',
    },
    {
        title: 'Biznes & Hayot',
        imgUrl: '/static/img/Biznes-&-Hayot.png',
        bgColor: '#697200',
        path: '#',
    },
    {
        title: 'Social Media & Reklama',
        imgUrl: '/static/img/Social-Media-Reklama.png',
        bgColor: '#02732f',
        path: '#',
    },
    {
        title: 'SEO & Traffics',
        imgUrl: '/static/img/SEO-&-Traffics.png',
        bgColor: '#421300',
        path: '#',
    },
    {
        title: 'Matnlar & Tarjimalar',
        imgUrl: '/static/img/Matnlar-&-Tarjimalar.png',
        bgColor: '#421300',
        path: '#',
    },
];

export default function ItServicesCategories () {
    const router = useRouter();

    return (
        <div className='container ItServicesCategories p-xl-0'>
            <h2 className='product-list-title '>Bizning IT servislarimiz</h2>
            <div className=' row ItServicesCardWrap'>
                {itServicesCategoriesData.map((item, index) => {
                    return (
                        <div
                            className='ItServicesCard col-lg-4 col-md-6 col-sm-6 col-6'
                            key={index}
                            style={{ cursor: 'pointer', width: '450px' }}
                            onClick={() => router.push(item.path)}>
                            <div className=''>
                                <img
                                    src={item.imgUrl}
                                    className=''
                                    alt={item.title}
                                    width={'450px'}
                                />
                                <div className='ItServicesCategories-card-title-box'>
                                    <h3 className='ItServicesCategories-card-title m-0 '>
                                        {item.title}
                                    </h3>
                                    <img
                                        className='ItServicesCategories-card-img'
                                        src='/static/img/ArrowRight.svg'
                                        alt=''
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
