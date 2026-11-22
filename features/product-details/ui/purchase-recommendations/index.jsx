import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { baseUrl } from '~/repositories/Repository';
import { useRouter } from 'next/router';
import ProductCard from '~/entities/product/product-card';
import { Skeleton } from 'antd';
import useResponsive from '~/shared/utilities/useResponsive';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const NoInfoImage = dynamic(() => Promise.resolve(() => (
    <Image
        src="/static/img/noinfo.svg"
        alt="Batafsil ma'lumot yo'q"
        width={200}
        height={200}
    />
)), { ssr: false });

function PurchaseRecommendations() {
    const router = useRouter();
    const { isMobile } = useResponsive();
    const { query } = router;
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

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
                rootMargin: '200px',
                threshold: 0.1,
            }
        );

        observer.observe(containerRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    const { data: recommendations, isLoading } =
        useQuery({
            queryKey: ['purchase-recommendations', query.pid],
            queryFn: async () => {
                const response = await fetch(
                    `${baseUrl}seller/purchase-recommendations/?slug=${query.pid}`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch purchase recommendations');
                }

                return await response.json();
            },
            enabled: isVisible && !!query.pid,
            staleTime: 1000 * 60 * 5,
            cacheTime: 1000 * 60 * 10,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        });

    const displayedProducts = useMemo(() => {
        if (!recommendations?.results || !Array.isArray(recommendations.results)) {
            if (Array.isArray(recommendations)) {
                return recommendations.slice(0, isMobile ? 12 : 10);
            }
            return [];
        }
        return recommendations.results.slice(0, isMobile ? 12 : 10);
    }, [recommendations, isMobile]);

    const isShowing = !isVisible || isLoading || displayedProducts.length > 0;

    return (
        <div ref={containerRef} className={isShowing ? "my-5" : ""}>
            {isShowing && (
                <>
                    {isVisible && (
                        <h3
                            style={{
                                fontSize: '25px',
                                fontWeight: 400,
                            }}
                            className="py-4 similar_title">
                            Yana nima xarid qilasiz?
                        </h3>
                    )}
                    {!isVisible ? (
                        <div style={{ minHeight: '200px' }} />
                    ) : isLoading ? (
                        <div className="row g-5 py-3 justify-content-center">
                            {Array.from({ length: isMobile ? 6 : 5 }).map((_, index) => (
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
                    ) : (
                        <div className="row px-1 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-gap-4">
                            {displayedProducts.map((item, index) => (
                                <div className="col px-3" key={item?.id || index}>
                                    <ProductCard product={item} />
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default React.memo(PurchaseRecommendations);
