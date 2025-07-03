import React from 'react';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { fileColors } from '~/components/details-components/details-actions/file-actions';
import { useRouter } from 'next/router';

export default function SearchResultsProducts_Card({ product }) {
    const paths = {
        file: 'scientific-resources',
        d: '3d-models-and-interior-designs',
        design: 'design-developments',
        website: 'websites',
        template: 'templates',
        video: 'video-lessons'
    };

    const router = useRouter();
    const parentSlug = product?.category_data?.parent_slug || '';
    const categoryId = product?.category_data?.category_id || '';

    return (
        <div
            className='Search_Results_Products_card'
            
        >
            <div  className='Search_Results_Products_card_body'>

                {/* Breadcrumb with Links */}
                <Breadcrumb
                    className='Breadcrumb'
                    items={[
                        {
                            title: (
                                <Link
                                    href={{
                                        pathname: `/${paths[product.content_type]}/${product?.category_data?.parent ||''}/`,
                                        query: `parentCategory=${product?.category_data?.parent || ''}`
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <span style={{ cursor: 'pointer' }}>{product?.category_data?.parent || ''}</span>
                                    
                                </Link>
                            )
                        },
                        {
                            title: (
                                <Link
                                    href={{
                                        pathname: `/${paths[product.content_type]}/${product?.category_data?.parent || ''}/`,
                                        query: `childCategory=${product?.category_data?.category || ''}`
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <span style={{ cursor: 'pointer' }}>{product?.category_data?.category || ''}</span>
                                </Link>
                            )
                        },
                        {
                            title: product.slug
                        }
                    ]}
                />

                {/* Title */}
                <p className='Search_Results_Products_card_title'>
                    <Link href={`/product/${product.slug}`} onClick={(e) => e.stopPropagation()}>
                        {product.title}
                    </Link>
                </p>

                {/* Description */}
                <p className='Search_Results_Products_card_description'>
                    {product.description}
                </p>

                {/* Extra info */}
                <div onClick={() => router.push({ pathname: `/product/${product.slug}` })} style={{ cursor: 'pointer' }} className='Search_Results_Products_card_info'>
                    <p className='Search_Results_Products_card_type'>
                        Fayl turi:{' '}
                        <span
                            style={{
                                color: 'white',
                                padding: '4px 9px',
                                borderRadius: '4px',
                                backgroundColor: fileColors[product?.file_type] || '#007DFF'
                            }}
                            className='Search_Results_Products_card_boldtype'
                        >
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

            {/* Image */}
            <img style={{ cursor: 'pointer' }} onClick={() => router.push({ pathname: `/product/${product.slug}` })}
                className='Search_Results_Products_card_img'
                src={product.poster}
                alt={product.title}
            />
        </div>
    );
}

