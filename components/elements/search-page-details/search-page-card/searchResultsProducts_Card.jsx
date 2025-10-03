import React from 'react';
import { Breadcrumb } from 'antd';
import { fileColors } from '~/components/details-components/details-actions/file-actions';
import { addPeriodToThousands } from '~/components/partials/account/price-formatter';

const paths = {
    file: 'scientific-resources',
    '3d': '3d-models-and-interior-designs',
    design: 'design-developments',
    website: 'websites',
    template: 'templates',
    video: 'video-lessons',
};

export default function SearchResultsProducts_Card({ product }) {
    const handleCardClick = () => {
        window.open(`/product/${product.slug}`, '_blank');
    };

    return (
        <div
            onClick={handleCardClick}
            className="Search_Results_Products_card"
            style={{ cursor: 'pointer' }}
        >
            <div className="Search_Results_Products_card_body">
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
                                        fileColors[product?.file_type] || '#007DFF',
                                }}
                                className="Search_Results_Products_card_boldtype"
                            >
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

            {/* Image */}
            <img
                className="Search_Results_Products_card_img"
                src={product.poster}
                alt={product.title}
            />
        </div>
    );
}
