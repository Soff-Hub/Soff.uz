import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { useQuery } from '@tanstack/react-query';
import { baseUrl } from '~/repositories/Repository';
import useResponsive from '~/shared/utilities/useResponsive';
import ProductCard from '~/entities/product/product-card';
import { Skeleton } from 'antd';
import Image from 'next/image';

function LastAddedProducts({ contentType }) {
    const { t } = useTranslation('product-pages');
    const { isMobile } = useResponsive();
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

    // Memoize limit based on contentType
    const limit = useMemo(() => {
        return contentType === '3d' ? 4 : 6;
    }, [contentType]);

    const { data: lastAdded, isLoading: lastLoading } = useQuery({
        queryKey: ['last-products', contentType],
        queryFn: async () => {
            const res = await fetch(
                `${baseUrl}customer/last-added?direction=${contentType}&limit=${limit}`
            );

            if (!res.ok) {
                throw new Error('Failed to fetch last added products');
            }

            return await res.json();
        },
        enabled: isVisible && !!contentType, // Only fetch when visible
        staleTime: 1000 * 60 * 5, // 5 minutes
        cacheTime: 1000 * 60 * 10, // 10 minutes
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    // Memoize displayed products
    const displayedProducts = useMemo(() => {
        if (!lastAdded?.results?.length) return [];
        return lastAdded.results.slice(0, isMobile ? 6 : 5);
    }, [lastAdded?.results, isMobile]);

    // Always render wrapper with ref for Intersection Observer
    return (
        <div ref={containerRef}>
            {!isVisible ? (
                // Placeholder to maintain layout while waiting for visibility
                <div style={{ minHeight: '200px' }} />
            ) : lastLoading ? (
                <div className="row g-3 py-3">
                    {Array.from({ length: isMobile ? 6 : 5 }).map((_, index) => (
                        <div
                            key={index}
                            className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4 d-flex justify-content-center">
                            <Skeleton.Input
                                active
                                style={{
                                    width: 250,
                                    height: 300,
                                    borderRadius: 8,
                                }}
                            />
                        </div>
                    ))}
                </div>
            ) : displayedProducts.length > 0 ? (
                <div className="row px-1 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-gap-4">
                    {displayedProducts.map((p, i) => (
                        <div key={p?.id || i} className="col px-3">
                            <ProductCard product={p} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center">
                    <Image
                        src="/static/img/noinfo.svg"
                        alt={t('productDetail.lastAddedProducts.noInfoAlt')}
                        width={200}
                        height={200}
                    />
                    <p
                        style={{
                            fontSize: 18,
                            marginTop: '16px',
                        }}>
                        {t('productDetail.lastAddedProducts.notFound')}
                    </p>
                </div>
            )}
        </div>
    );
}

export default React.memo(LastAddedProducts);
