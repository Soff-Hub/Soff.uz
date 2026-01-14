import Image from 'next/image';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import {
    InfoCircleOutlined,
    UpOutlined,
    DownOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import ImageLightBox from './image-lightbox';

function FileImagesScroll({ product }) {
    const { t } = useTranslation('product-pages');
    const containerRef = useRef(null);
    const buttonsRef = useRef(null);
    const fullscreenButtonRef = useRef(null);
    const [isScrolledDown, setIsScrolledDown] = useState(false);
    const [canScrollUp, setCanScrollUp] = useState(false);
    const [canScrollDown, setCanScrollDown] = useState(false);

    useLayoutEffect(() => {
        const scrollContainer = containerRef.current;

        if (scrollContainer) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
            scrollContainer.scrollTo({ top: 0 });

            const updateButtonPosition = () => {
                if (!scrollContainer) return;

                const rect = scrollContainer.getBoundingClientRect();
                const scrollTop = scrollContainer.scrollTop;
                const scrollHeight = scrollContainer.scrollHeight;
                const clientHeight = scrollContainer.clientHeight;

                // Calculate center position of visible container area
                const containerTop = rect.top;
                const containerHeight = rect.height;
                const centerY = containerTop + containerHeight / 2;

                // Update scroll buttons position
                if (buttonsRef.current) {
                    buttonsRef.current.style.top = `${centerY}px`;
                    buttonsRef.current.style.right = `${
                        window.innerWidth - rect.right + 16
                    }px`;
                }

                // Update fullscreen button position
                if (fullscreenButtonRef.current) {
                    fullscreenButtonRef.current.style.top = `${
                        rect.top + 10
                    }px`;
                    fullscreenButtonRef.current.style.right = `${
                        window.innerWidth - rect.right + 10
                    }px`;
                }

                // More precise check for top - account for small rounding differences
                const isAtTop = scrollTop <= 5;
                // More precise check for bottom - account for small rounding differences
                const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;

                const scrolledDown = scrollTop > 0;
                const canUp = !isAtTop && scrollTop > 0;
                const canDown =
                    !isAtBottom && scrollTop < scrollHeight - clientHeight;

                setIsScrolledDown(scrolledDown);
                setCanScrollUp(canUp);
                setCanScrollDown(canDown);
            };

            const handleScroll = () => {
                updateButtonPosition();
            };

            const handleResize = () => {
                updateButtonPosition();
            };

            const handleWindowScroll = () => {
                updateButtonPosition();
            };

            // Initial check with a small delay to ensure DOM is ready
            const initTimeout = setTimeout(() => {
                updateButtonPosition();
            }, 100);

            scrollContainer.addEventListener('scroll', handleScroll);
            window.addEventListener('resize', handleResize);
            window.addEventListener('scroll', handleWindowScroll);

            return () => {
                clearTimeout(initTimeout);
                scrollContainer.removeEventListener('scroll', handleScroll);
                window.removeEventListener('resize', handleResize);
                window.removeEventListener('scroll', handleWindowScroll);
            };
        }
    }, [product?.document?.images]);

    const onClickUp = () => {
        const scrollContainer = containerRef.current;
        if (scrollContainer) {
            scrollContainer.scrollBy({ top: -200, behavior: 'smooth' });
        }
    };

    const onClickDown = () => {
        const scrollContainer = containerRef.current;
        if (scrollContainer) {
            scrollContainer.scrollBy({ top: 200, behavior: 'smooth' });
        }
    };

    return (
        <>
            <style>{`
                .scroll-buttons {
                    position: fixed;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    z-index: 100;
                    transform: translateY(-50%);
                }
                .scroll-button {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.7);
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                    opacity: 0.6;
                }
                .scroll-button:hover {
                    background: rgba(255, 255, 255, 1);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                    transform: scale(1.05);
                    opacity: 1;
                }
                .scroll-button:active {
                    transform: scale(0.95);
                }
                .scroll-button:disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                    pointer-events: none;
                }
            `}</style>
            <div className="ps-product__thumbnail_seller product-short-view">
                <figure className="figuree">
                    <div className="figuree_content">
                        <div
                            className="ps-wrapper_seller product-poster "
                            ref={containerRef}
                            style={{
                                paddingBottom: 0,
                                marginBottom: 0,
                                position: 'relative',
                            }}>
                            {/* Fullscreen button */}
                            {product?.document?.images?.length > 0 && (
                                <div
                                    ref={fullscreenButtonRef}
                                    style={{
                                        position: 'fixed',
                                        zIndex: 99,
                                    }}>
                                    <ImageLightBox
                                        gallery={product.document.images}
                                    />
                                </div>
                            )}
                            {product?.document?.images?.length > 0 ? (
                                product?.document?.images?.map(
                                    (item, i) =>
                                        (item?.image_url ||
                                            item?.thumbUrl ||
                                            item?.url) && (
                                            <Image
                                                key={i}
                                                src={
                                                    item?.image_url ||
                                                    item?.thumbUrl ||
                                                    item?.url ||
                                                    'https://placehold.co/600x400'
                                                }
                                                width={785}
                                                height={614}
                                                alt={t(
                                                    'productDetail.fileImagesScroll.sellerImage'
                                                )}
                                                className={` seller_image_conatiner`}
                                                objectFit="contain"
                                                style={{
                                                    flexShrink: 0,
                                                    objectFit: 'contain',
                                                }}
                                            />
                                        )
                                )
                            ) : (
                                <Image
                                    src={'https://placehold.co/600x400'}
                                    width={1000}
                                    height={614}
                                    alt={t(
                                        'productDetail.fileImagesScroll.sellerImage'
                                    )}
                                    className={` seller_image_conatiner`}
                                    objectFit="contain"
                                />
                            )}
                            {/* Top gradient - shows when scrolled down (can scroll up) */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    width: '100%',
                                    height: '40px',
                                    background:
                                        'linear-gradient(rgba(80, 80, 80, 0.6) 0%, rgba(0, 0, 0, 0) 100%)',
                                    pointerEvents: 'none',
                                    transition: 'all 0.3s ease',
                                    opacity: canScrollUp ? 1 : 0,
                                    transform: canScrollUp
                                        ? 'translateY(0)'
                                        : 'translateY(-100%)',
                                    visibility: canScrollUp
                                        ? 'visible'
                                        : 'hidden',
                                    zIndex: 1,
                                }}
                            />
                            {/* Bottom gradient - shows when at top (can scroll down) */}
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    width: '100%',
                                    height: '40px',
                                    background:
                                        'linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(80, 80, 80, 0.6) 100%)',
                                    pointerEvents: 'none',
                                    transition: 'all 0.3s ease',
                                    opacity:
                                        !isScrolledDown && canScrollDown
                                            ? 1
                                            : 0,
                                    transform:
                                        !isScrolledDown && canScrollDown
                                            ? 'translateY(0)'
                                            : 'translateY(100%)',
                                    zIndex: 1,
                                }}
                            />
                        </div>
                        {/* Scroll buttons - outside scrollable container */}
                        <div
                            ref={buttonsRef}
                            className="scroll-buttons"
                            style={{
                                display:
                                    canScrollUp || canScrollDown
                                        ? 'flex'
                                        : 'none',
                            }}>
                            <button
                                className="scroll-button"
                                onClick={onClickUp}
                                disabled={!canScrollUp}
                                aria-label={t(
                                    'productDetail.fileActions.scrollUp'
                                )}>
                                <UpOutlined
                                    style={{
                                        fontSize: '16px',
                                        color: '#333',
                                    }}
                                />
                            </button>
                            <button
                                className="scroll-button"
                                onClick={onClickDown}
                                disabled={!canScrollDown}
                                aria-label={t(
                                    'productDetail.fileActions.scrollDown'
                                )}>
                                <DownOutlined
                                    style={{
                                        fontSize: '16px',
                                        color: '#333',
                                    }}
                                />
                            </button>
                        </div>
                        <div className="views">
                            {' '}
                            <i className="fa-solid fa-eye"></i>{' '}
                            <span>{product?.view_count}</span>
                        </div>
                    </div>
                    <div className="title_support">
                        <InfoCircleOutlined
                            className="fs-2 "
                            style={{ cursor: 'pointer' }}
                            aria-label={t(
                                'productDetail.fileImagesScroll.copyrightViolation'
                            )}
                        />
                        <span>
                            {t(
                                'productDetail.fileImagesScroll.copyrightViolation'
                            )}
                        </span>
                        <Link href={`/report/${product.slug}`}>
                            <a>
                                <strong
                                    className="text-success"
                                    style={{ cursor: 'pointer' }}
                                    aria-label={t(
                                        'productDetail.fileImagesScroll.report'
                                    )}>
                                    {t('productDetail.fileImagesScroll.report')}
                                </strong>
                            </a>
                        </Link>
                    </div>
                </figure>
            </div>
        </>
    );
}

export default FileImagesScroll;
