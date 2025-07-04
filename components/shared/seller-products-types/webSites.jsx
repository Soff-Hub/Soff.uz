import React from 'react';
import WebsitesProduct from '~/components/elements/products/WebsitesProduct';

export default function WebSites (product) {
    const data = product?.data?.website;

    return (
        <div className='sellerpage'>
            <div className='sellerpageTitleBox'>
                <p className='sellerpageTitle'>Veb saytlar</p>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='8'
                    height='10'
                    viewBox='0 0 8 10'
                    fill='none'>
                    <path
                        d='M1.875 1.5L6.12488 4.63195L2 8.5'
                        stroke='#312F30'
                        stroke-width='2'
                        stroke-linecap='round'
                    />
                </svg>
            </div>
            <div className='WebSitesCardWrap'>
                {data?.map((item, index) => (
                    <div className='' key={index}>
                        <WebsitesProduct product={item} />
                    </div>
                ))}
            </div>
            <div className='showMoreBox'>
                <p className='showMore'> Yana ko’rsatish</p>
            </div>
        </div>
    );
}
