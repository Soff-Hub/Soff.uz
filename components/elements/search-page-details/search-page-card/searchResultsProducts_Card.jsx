import React from 'react';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { fileColors } from '~/components/details-components/details-actions/file-actions';


export default function SearchResultsProducts_Card ({ product }) {

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
                            title: (
                                <a href=''>{product?.category_data?.parent}</a>
                            ),
                        },
                        {
                            title: (
                                <a href=''>
                                    {product?.category_data?.category}
                                </a>
                            ),
                        },
                        {
                            title: product.slug,
                        },
                    ]}
                />
                <p className='Search_Results_Products_card_title'>
                    <Link  href='/product/[pid]' as={`/product/${product.slug}`}>
                        {product.title}
                    </Link>
                </p>
                <p className='Search_Results_Products_card_description'>
                    {product.description}
                </p>
                <div className='Search_Results_Products_card_info'>
                    <p className='Search_Results_Products_card_type'>
                        Fayl turi:{' '}
                        <span 
                        style={{
                                color: "white",
                                padding: "4px 9px",
                                borderRadius: "4px",
                                backgroundColor: fileColors[product?.file_type] || "#007DFF"
                            }}
                        className='Search_Results_Products_card_boldtype'>
                            {product.file_type}
                        </span>
                    </p>
                    <p className='Search_Results_Products_card_price'>
                        Narxi:{' '}
                        <span className='Search_Results_Products_card_price_boldspan'>
                            {product.discount_price} so'm
                        </span>
                    </p>
                </div>
            </div>
            <img
                className='Search_Results_Products_card_img'
                src={product.poster}
                alt=''
            />
        </div>
    );
}
