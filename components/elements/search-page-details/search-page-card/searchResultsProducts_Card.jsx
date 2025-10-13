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
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageDimensions, setImageDimensions] = useState({
        width: 0,
        height: 0,
    });

    const handleCardClick = (e) => {
        // Prevent navigation when hovering/interacting with magnifier
        if (e.target.closest('.magnifier-container')) {
            return;
        }
        window.open(`/product/${product.slug}`, '_blank');
    };

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    };

    const handleImageLoad = (e) => {
        setImageLoaded(true);
        setImageDimensions({
            width: e.target.naturalWidth,
            height: e.target.naturalHeight,
        });
    };

    // Calculate zoom level based on image dimensions
    const getZoomLevel = () => {
        if (!imageLoaded) return 2;

        const aspectRatio = imageDimensions.width / imageDimensions.height;

        // For very wide images (landscape)
        if (aspectRatio > 2) return 3;
        // For very tall images (portrait)
        if (aspectRatio < 0.5) return 3;
        // For square or normal aspect ratios
        return 2.5;
    };

    // Calculate background size for consistent magnification
    const getMagnifierBackgroundSize = () => {
        if (!imageLoaded) return 'cover';

        const zoomLevel = getZoomLevel();
        const aspectRatio = imageDimensions.width / imageDimensions.height;

        // Calculate size to ensure the magnified area fills the 400px container properly
        if (aspectRatio > 1) {
            // Landscape image
            return `${400 * zoomLevel}px ${(400 * zoomLevel) / aspectRatio}px`;
        } else {
            // Portrait or square image
            return `${400 * zoomLevel * aspectRatio}px ${400 * zoomLevel}px`;
        }
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

            {/* Image with custom magnifier */}
            <div
                className="Search_Results_Products_card_img_container magnifier-container"
                style={{ position: 'relative' }}>
                <img
                    src={product.poster}
                    alt={product.title}
                    className="Search_Results_Products_card_img"
                    style={{
                        width: '100px',
                        height: '100px',
                        display: 'block',
                        cursor: 'crosshair',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        border: '1px solid #e0e0e0',
                    }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onMouseMove={handleMouseMove}
                    onLoad={handleImageLoad}
                />

                {/* Magnified preview */}
                {isHovering && imageLoaded && isDesktop && (
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
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                backgroundImage: `url(${product.poster})`,
                                backgroundSize: getMagnifierBackgroundSize(),
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                                imageRendering: 'crisp-edges',
                            }}
                        />
                    </div>
                )}

                {/* Overlay indicator */}
                {isHovering && isDesktop && (
                    <div
                        style={{
                            position: 'absolute',
                            width: '60px',
                            height: '60px',
                            border: '3px solid rgba(255, 255, 255, 0.9)',
                            borderRadius: '6px',
                            pointerEvents: 'none',
                            transform: 'translate(-50%, -50%)',
                            left: `${mousePosition.x}%`,
                            top: `${mousePosition.y}%`,
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                        }}
                    />
                )}
            </div>
        </div>
    );
}
