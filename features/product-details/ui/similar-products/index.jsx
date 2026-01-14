import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { useQuery } from '@tanstack/react-query';
import { baseUrl } from '~/repositories/Repository';
import { useRouter } from 'next/router';
import ProductCard from '~/entities/product/product-card';
import { Skeleton } from 'antd';
import useResponsive from '~/shared/utilities/useResponsive';
import Image from 'next/image';

function SimilarProducts() {
    const { t } = useTranslation('product-pages');
    const router = useRouter();
    const { isMobile } = useResponsive();
    const { query } = router;
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    // Intersection Observer for lazy loading
    useEffect(() => {
        if (!containerRef.current || typeof window === 'undefined') return;

        const observer = new IntersectionObserver(
            entries => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: '200px', // Start loading 200px before visible
                threshold: 0.1,
            }
        );

        observer.observe(containerRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    const { data: similarProducts, isLoading: similarProductsLoading } =
        useQuery({
            queryKey: ['similar-products', query.pid],
            queryFn: async () => {
                const similarProductsRequest = await fetch(
                    `${baseUrl}customer/similar/${query.pid}/`
                );

                if (!similarProductsRequest.ok) {
                    throw new Error('Failed to fetch similar products');
                }

                return await similarProductsRequest.json();
            },
            enabled: isVisible && !!query.pid, // Only fetch when visible
            staleTime: 1000 * 60 * 5, // 5 minutes
            cacheTime: 1000 * 60 * 10, // 10 minutes
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        });

    // Memoize displayed products
    const displayedProducts = useMemo(() => {
        if (!similarProducts?.length) return [];
        return similarProducts.slice(0, isMobile ? 12 : 10);
    }, [similarProducts, isMobile]);

    // Always render wrapper with ref for Intersection Observer
    return (
        <div ref={containerRef}>
            {!isVisible ? (
                // Placeholder to maintain layout while waiting for visibility
                <div style={{ minHeight: '200px' }} />
            ) : similarProductsLoading ? (
                <div className="row g-5 py-3 justify-content-center">
                    {Array.from({ length: isMobile ? 12 : 10 }).map((_, index) => (
                        <div
                            key={index}
                            className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3 d-flex justify-content-center">
                            <Skeleton.Input
                                active
                                style={{
                                    width: '100%',
                                    maxWidth: 170,
                                    height: '38vw',
                                    maxHeight: 230,
                                    minHeight: 120,
                                    borderRadius: 8,
                                }}
                            />
                        </div>
                    ))}
                </div>
            ) : displayedProducts.length > 0 ? (
                <div className="row px-1 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-gap-4">
                    {displayedProducts.map((item, index) => (
                        <div className="col px-3" key={item?.id || index}>
                            <ProductCard product={item} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center">
                    <Image
                        src="/static/img/noinfo.svg"
                        alt={t('productDetail.similarProducts.noInfoAlt')}
                        width={200}
                        height={200}
                    />
                    <p
                        style={{
                            fontSize: '18px',
                            marginTop: '16px',
                        }}>
                        {t('productDetail.similarProducts.notFound')}
                    </p>
                </div>
            )}
        </div>
    );
}

export default React.memo(SimilarProducts);
