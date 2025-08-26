import React from 'react';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { fileColors } from '~/components/details-components/details-actions/file-actions';
import { useRouter } from 'next/router';
import { addPeriodToThousands } from '~/components/partials/account/price-formatter';

export default function SearchResultsProducts_Card({ product }) {
    const paths = {
        file: 'scientific-resources',
        '3d': '3d-models-and-interior-designs',
        design: 'design-developments',
        website: 'websites',
        template: 'templates',
        video: 'video-lessons',
    };

    const router = useRouter();
    return (
        <div onClick={() => router.push(`product/${product.slug}`)} className='Search_Results_Products_card'>
            <div className='Search_Results_Products_card_body'>
                {/* Breadcrumb with Links */}
                <Breadcrumb
                    className='Breadcrumb'
                    items={[
                        {
                            title: (
                                <Link
                                    href={{
                                        pathname: `/${paths[product.content_type]
                                            }/${product?.category_data?.parent
                                                ?.replace(/\s+/g, '-')
                                                .toLowerCase() || ''
                                            }/`,
                                        query: `parentCategory=${product?.category_data?.parent
                                            ?.replace(/\s+/g, '-')
                                            .toLowerCase() || ''
                                            }`,
                                    }}
                                    onClick={e => e.stopPropagation()}>
                                    <span style={{ cursor: 'pointer' }}>
                                        {product?.category_data?.parent || ''}
                                    </span>
                                </Link>
                            ),
                        },
                        {
                            title: (
                                <Link
                                    href={{
                                        pathname: `/${paths[product.content_type]
                                            }/${product?.category_data?.slug || ''
                                            }/`,
                                        query: `parentCategory=${product?.category_data?.parent
                                            ?.replace(/\s+/g, '-')
                                            .toLowerCase() || ''
                                            }&childCategory=${product?.category_data?.slug?.toLowerCase() ||
                                            ''
                                            }`,
                                    }}
                                    onClick={e => e.stopPropagation()}>
                                    <span style={{ cursor: 'pointer' }}>
                                        {product?.category_data?.category || ''}
                                    </span>
                                </Link>
                            ),
                        },
                    ]}
                />

                {/* Title */}
                <p className='Search_Results_Products_card_title'>
                    <Link
                        href={`/product/${product.slug}`}
                        onClick={e => e.stopPropagation()}>
                        {product.title}
                    </Link>
                </p>

                <div
                    onClick={() =>
                        router.push({ pathname: `/product/${product.slug}` })
                    }
                    style={{ cursor: 'pointer' }}
                    className='Search_Results_Products_card_info'>
                        <div>
                            <p className='Search_Results_Products_card_price'>
                                <i className="fas fa-money-bill price_icon"></i>
                                <span className='Search_Results_Products_card_price_boldspan'>
                                    {addPeriodToThousands(product.discount_price)}
                                </span>
                            </p>
                        </div>
                        <div className='search_main_info'>
                            <p className='Search_Results_Products_card_type'>
                                <span
                                    style={{
                                        color: 'white',
                                        padding: '2px 7px',
                                        borderRadius: '4px',
                                        backgroundColor:
                                            fileColors[product?.file_type] || '#007DFF',
                                    }}
                                    className='Search_Results_Products_card_boldtype'>
                                    {product.file_type}
                                </span>
                            </p>
                            <p className='Search_Results_Products_card_price '>
                                <i className="fas fa-copy file_icon "></i>
                                <span className='Search_Results_Products_card_price_boldspan'>
                                    {product?.page_count}
                                </span>
                            </p>
                            <p className='Search_Results_Products_card_price '>
                                    <i className="fas fa-database price_icon "></i>
                                <span className='Search_Results_Products_card_price_boldspan'>
                                    {product?.file_size}
                                </span>
                            </p>
                        </div>
                </div>
            </div>

            {/* Image */}
            <img
                style={{ cursor: 'pointer' }}
                onClick={() =>
                    router.push({ pathname: `/product/${product.slug}` })
                }
                className='Search_Results_Products_card_img'
                src={product.poster}
                alt={product.title}
            />
        </div>
    );
}
