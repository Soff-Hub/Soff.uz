import React, { useState } from 'react';
import { Breadcrumb } from 'antd';
import { fileColors } from '~/components/details-components/details-actions/file-actions';
import { addPeriodToThousands } from '~/components/partials/account/price-formatter';
import useResponsive from '~/shared/utilities/useResponsive';

const paths = {
    file: 'scientific-resources',
    '3d': '3d-models-and-interior-designs',
    design: 'design-developments',
    website: 'websites',
    template: 'templates',
    video: 'video-lessons',
};

export default function SearchResultsProducts_Card({ product }) {
    const { isDesktop } = useResponsive();
    const [isHovering, setIsHovering] = useState(false);

    const handleCardClick = e => {
        // Prevent navigation when hovering/interacting with preview
        if (e.target.closest('.preview-container')) {
            return;
        }
        window.open(`/product/${product.slug}`, '_blank');
    };

    return (
        <div className="Search_Results_Products_card">
            <div
                onClick={handleCardClick}
                className="Search_Results_Products_card_body"
                style={{ cursor: 'pointer' }}>
                <Breadcrumb
                    className="Breadcrumb"
                    items={[
                        {
                            title: (
                                <span>
                                    {product?.category_data?.parent || ''}
                                </span>
                            ),
                        },
                        {
                            title: (
                                <span>
                                    {product?.category_data?.category || ''}
                                </span>
                            ),
                        },
                    ]}
                />

                {/* Title */}
                <p className="Search_Results_Products_card_title">
                    {product.title}
                </p>

                <div className="Search_Results_Products_card_info">
                    <div>
                        <p className="Search_Results_Products_card_price">
                            <i className="fas fa-money-bill price_icon"></i>
                            <span className="Search_Results_Products_card_price_boldspan">
                                {addPeriodToThousands(product.discount_price)}
                            </span>
                        </p>
                    </div>
                    <div className="search_main_info">
                        <p className="Search_Results_Products_card_type">
                            <span
                                style={{
                                    color: 'white',
                                    padding: '2px 7px',
                                    borderRadius: '4px',
                                    backgroundColor:
                                        fileColors[product?.file_type] ||
                                        '#007DFF',
                                }}
                                className="Search_Results_Products_card_boldtype">
                                {product.file_type}
                            </span>
                        </p>
                        <p className="Search_Results_Products_card_price">
                            <i className="fas fa-copy file_icon "></i>
                            <span className="Search_Results_Products_card_price_boldspan">
                                {product?.page_count}
                            </span>
                        </p>
                        <p className="Search_Results_Products_card_price">
                            <i className="fas fa-database price_icon "></i>
                            <span className="Search_Results_Products_card_price_boldspan">
                                {product?.file_size}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Image with preview */}
            <div
                className="Search_Results_Products_card_img_container preview-container"
                style={{ position: 'relative' }}>
                <img
                    src={product.poster}
                    alt={product.title}
                    className="Search_Results_Products_card_img"
                    style={{
                        width: '100px',
                        height: '100px',
                        display: 'block',
                        cursor: 'pointer',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        border: '1px solid #e0e0e0',
                    }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                />

                {/* Full size preview */}
                {isHovering && isDesktop && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '0',
                            right: '-420px',
                            width: '400px',
                            height: '400px',
                            border: '2px solid rgba(255, 255, 255, 0.8)',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            backgroundColor: 'white',
                            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
                            zIndex: 1000,
                            pointerEvents: 'none',
                        }}>
                        <img
                            src={product.poster}
                            alt={product.title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                display: 'block',
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
