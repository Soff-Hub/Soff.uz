import React from 'react';
import ModelAndDesignProduct from '~/components/elements/products/ModelAndDesignProduct';

export default function ModelAndDesign () {
    const data = [
        {
            content_type: 'file',
            demo_link: null,
            discount: 0,
            discount_price: 12000,
            file_url: null,
            id: 175054,
            poster_url: 'https://picsum.photos/200/300',
            price: 12000,
            seller: { fullname: 'Azizbek Ubaydullayev', id: '112428' },
            slug: 'tibbiyot-132-oriental-contributions-and-discoveries-taqdimot-12-bet',
            title: '13.2. Oriental Contributions and Discoveries. Taqdimot 12 bet',
        },
        {
            content_type: 'file',
            demo_link: null,
            discount: 0,
            discount_price: 12000,
            file_url: null,
            id: 175054,
            poster_url: 'https://picsum.photos/200/300',
            price: 12000,
            seller: { fullname: 'Azizbek Ubaydullayev', id: '112428' },
            slug: 'tibbiyot-132-oriental-contributions-and-discoveries-taqdimot-12-bet',
            title: '13.2. Oriental Contributions and Discoveries. Taqdimot 12 bet',
        },
        {
            content_type: 'file',
            demo_link: null,
            discount: 0,
            discount_price: 12000,
            file_url: null,
            id: 175054,
            poster_url: 'https://picsum.photos/200/300',
            price: 12000,
            seller: { fullname: 'Azizbek Ubaydullayev', id: '112428' },
            slug: 'tibbiyot-132-oriental-contributions-and-discoveries-taqdimot-12-bet',
            title: '13.2. Oriental Contributions and Discoveries. Taqdimot 12 bet',
        },
        {
            content_type: 'file',
            demo_link: null,
            discount: 0,
            discount_price: 12000,
            file_url: null,
            id: 175054,
            poster_url: 'https://picsum.photos/200/300',
            price: 12000,
            seller: { fullname: 'Azizbek Ubaydullayev', id: '112428' },
            slug: 'tibbiyot-132-oriental-contributions-and-discoveries-taqdimot-12-bet',
            title: '13.2. Oriental Contributions and Discoveries. Taqdimot 12 bet',
        },
        {
            content_type: 'file',
            demo_link: null,
            discount: 0,
            discount_price: 12000,
            file_url: null,
            id: 175054,
            poster_url: 'https://picsum.photos/200/300',
            price: 12000,
            seller: { fullname: 'Azizbek Ubaydullayev', id: '112428' },
            slug: 'tibbiyot-132-oriental-contributions-and-discoveries-taqdimot-12-bet',
            title: '13.2. Oriental Contributions and Discoveries. Taqdimot 12 bet',
        },
        {
            content_type: 'file',
            demo_link: null,
            discount: 0,
            discount_price: 12000,
            file_url: null,
            id: 175054,
            poster_url: 'https://picsum.photos/200/300',
            price: 12000,
            seller: { fullname: 'Azizbek Ubaydullayev', id: '112428' },
            slug: 'tibbiyot-132-oriental-contributions-and-discoveries-taqdimot-12-bet',
            title: '13.2. Oriental Contributions and Discoveries. Taqdimot 12 bet',
        },
        {
            content_type: 'file',
            demo_link: null,
            discount: 0,
            discount_price: 12000,
            file_url: null,
            id: 175054,
            poster_url: 'https://picsum.photos/200/300',
            price: 12000,
            seller: { fullname: 'Azizbek Ubaydullayev', id: '112428' },
            slug: 'tibbiyot-132-oriental-contributions-and-discoveries-taqdimot-12-bet',
            title: '13.2. Oriental Contributions and Discoveries. Taqdimot 12 bet',
        },
        {
            content_type: 'file',
            demo_link: null,
            discount: 0,
            discount_price: 12000,
            file_url: null,
            id: 175054,
            poster_url: 'https://picsum.photos/200/300',
            price: 12000,
            seller: { fullname: 'Azizbek Ubaydullayev', id: '112428' },
            slug: 'tibbiyot-132-oriental-contributions-and-discoveries-taqdimot-12-bet',
            title: '13.2. Oriental Contributions and Discoveries. Taqdimot 12 bet',
        },
    ];

    return (
        <div className='sellerpage'>
            <div className='sellerpageTitleBox'>
                <p className='sellerpageTitle'>
                    3D modellar va interier dizaynlar
                </p>
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
            <div className='ModelAndDesignCardWrap'>
                {data.map((item, index) => (
                    <div className='card_container' key={index}>
                        <ModelAndDesignProduct product={item} />
                    </div>
                ))}
            </div>
            <div className='showMoreBox'>
                <p className='showMore'> Yana ko’rsatish</p>
            </div>
        </div>
    );
}
