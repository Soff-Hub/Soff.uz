import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';


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
        <div className='container ItServicesCategories p-5'>
            <h2 className='product-list-title pl-0'>Bizning IT servislarimiz</h2>
            {/* <div className='d-flex justify-content-center flex-wrap gap-4 mt-5 pt-4'>
                {itServicesCategoriesData.map((item, index) => {
                    return (
                        <div
                            className='IT-Services-card-box'
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
                                        src='/static/img/ArrowRight.svg'
                                        alt=''
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div> */}
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
            <img
              src="/static/img/ArrowRight.svg"
              alt="Arrow Right"
              className="it-services-card-arrow"
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
