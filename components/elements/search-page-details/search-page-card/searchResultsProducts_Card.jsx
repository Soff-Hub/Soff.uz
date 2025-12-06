import React, { useState, useRef, useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { fileColors } from '~/components/details-components/details-actions/file-actions';
import { addPeriodToThousands } from '~/components/partials/account/price-formatter';
import useResponsive from '~/shared/utilities/useResponsive';
import Link from 'next/link';
import { formatFileSize } from '~/shared/utilities/utils';

export default function SearchResultsProducts_Card({ product }) {
    const { isDesktop } = useResponsive();
    const [isHovering, setIsHovering] = useState(false);
    const [previewPosition, setPreviewPosition] = useState({
        top: '0',
        right: '-420px',
    });
    const imgRef = useRef(null);
    const previewRef = useRef(null);

    const updatePreviewPosition = () => {
        if (!imgRef.current || !previewRef.current || !isHovering) return;

        const imgRect = imgRef.current.getBoundingClientRect();
        const previewWidth = 400;
        const previewHeight = 400;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const padding = 20;

        let top = 0;

        let horizontalPosition = imgRect.width + 10;

        if (imgRect.right + previewWidth + 10 > windowWidth - padding) {
            horizontalPosition = -(previewWidth + 10);
        }

        if (imgRect.top + previewHeight > windowHeight - padding) {
            const spaceBelow = windowHeight - imgRect.top - padding;
            const spaceAbove = imgRect.bottom - padding;

            if (spaceBelow >= previewHeight) {
                top = 0;
            } else if (spaceAbove >= previewHeight) {
                top = Math.max(
                    -(previewHeight - imgRect.height),
                    -(imgRect.top - padding)
                );
            } else {
                if (spaceBelow > spaceAbove) {
                    top = windowHeight - imgRect.top - previewHeight - padding;
                } else {
                    top = -imgRect.top + padding;
                }
            }
        }

        setPreviewPosition({
            top: `${top}px`,
            left: `${horizontalPosition}px`,
            right: 'auto',
        });
    };

    useEffect(() => {
        if (isHovering && isDesktop) {
            updatePreviewPosition();
            window.addEventListener('scroll', updatePreviewPosition);
            window.addEventListener('resize', updatePreviewPosition);

            return () => {
                window.removeEventListener('scroll', updatePreviewPosition);
                window.removeEventListener('resize', updatePreviewPosition);
            };
        }
    }, [isHovering, isDesktop]);

    return (
        <Link href={`/product/${product.slug}`}>
            <a target="_blank">
                <div className="Search_Results_Products_card">
                    <div
                        className="Search_Results_Products_card_body"
                        style={{ cursor: 'pointer' }}>
                        <Breadcrumb
                            className="Breadcrumb"
                            items={[
                                {
                                    title: (
                                        <span>
                                            {product?.category_data?.parent ||
                                                ''}
                                        </span>
                                    ),
                                },
                                {
                                    title: (
                                        <span>
                                            {product?.category_data?.category ||
                                                ''}
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
                                        {addPeriodToThousands(
                                            product.discount_price
                                        )}
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
                                                fileColors[
                                                    product?.file_type
                                                ] || '#007DFF',
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
                                        {formatFileSize(product?.file_size)}
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
                            ref={imgRef}
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
                                ref={previewRef}
                                style={{
                                    position: 'absolute',
                                    top: previewPosition.top,
                                    right: previewPosition.right,
                                    left: previewPosition.left,
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
            </a>
        </Link>
    );
}
