import Link from 'next/link';
import React from 'react';
import { fileColors } from '~/features/product-details/ui/actions/file-actions';
import { addPeriodToThousands } from '~/features/account/ui/price-formatter';

const LastAddedProductCard = ({ product }) => {
    return (
        <Link href={`/product/${product.slug}`}>
            <a>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        cursor: 'pointer',
                        border: '1px solid #f0f0f0',
                        borderRadius: '12px',
                        padding: '12px',
                        transition: 'box-shadow 0.3s ease',
                        boxShadow: '0 0 6px rgba(0, 0, 0, 0.05)',
                        backgroundColor: '#fff',
                    }}
                    onMouseEnter={e =>
                        (e.currentTarget.style.boxShadow =
                            '0 4px 12px rgba(0,0,0,0.1)')
                    }
                    onMouseLeave={e =>
                        (e.currentTarget.style.boxShadow =
                            '0 0 6px rgba(0, 0, 0, 0.05)')
                    }>
                    <img
                        style={{
                            width: '70px',
                            height: '70px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            flexShrink: 0,
                            backgroundColor: '#f5f5f5',
                        }}
                        src={product.poster_url}
                        alt={product.slug}
                    />
                    <div style={{ flex: 1 }}>
                        <h2
                            style={{
                                fontSize: '16px',
                                fontWeight: 600,
                                color: '#333',
                                margin: '0 0 8px 0',
                                overflowWrap: 'anywhere',
                            }}>
                            {product.title}
                        </h2>
                        <p>
                            <span
                                style={{
                                    color: 'white',
                                    padding: '4px 9px',
                                    borderRadius: '4px',
                                    backgroundColor:
                                        fileColors[
                                            product?.document?.file_type
                                        ] || '#007DFF',
                                }}
                                className="Search_Results_Products_card_boldtype">
                                {product?.document?.file_type}
                            </span>
                            {'     '}Narxi:{' '}
                            <span style={{ fontWeight: 600, color: '#00a44f' }}>
                                {addPeriodToThousands(product.discount_price)}{' '}
                                so'm
                            </span>
                        </p>
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default LastAddedProductCard;
