import React from 'react';
import { Breadcrumb } from 'antd';

export default function SearchResultsProducts_Card ({product}) {
    console.log('product =>', product);

    return (
        <div className='Search_Results_Products_card'>
            <div className='Search_Results_Products_card_body'>
                <Breadcrumb
                    className='Breadcrumb '
                    items={[
                        {
                            title: 'Home',
                        },
                        {
                            title: <a href=''>Application Center</a>,
                        },
                        {
                            title: <a href=''>Application List</a>,
                        },
                        {
                            title: 'An Application',
                        },
                    ]}
                />
                <p className='Search_Results_Products_card_title'>
                    {product.title}
                </p>
                <p className='Search_Results_Products_card_description'>
                    {product.description}
                </p>
                <div className='Search_Results_Products_card_info'>
                    <p className='Search_Results_Products_card_type'>
                        Fayl turi:{' '}
                        <span className='Search_Results_Products_card_boldtype'>
                            {product.type}
                        </span>
                    </p>
                    <p className='Search_Results_Products_card_price'>
                        Narxi:{' '}
                        <span className='Search_Results_Products_card_price_boldspan'>
                            {product.price} so'm
                        </span>
                    </p>
                </div>
            </div>
            <img
                className='Search_Results_Products_card_img'
                src={product.img}
                alt=''
            />
        </div>
    );
}
