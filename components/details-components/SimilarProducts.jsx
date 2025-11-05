import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { baseUrl } from '~/repositories/Repository';
import { useRouter } from 'next/router';
import ProductCard from '~/entities/product/product-card';
import { Skeleton } from 'antd';
import useResponsive from '~/shared/utilities/useResponsive';

function SimilarProducts() {
    const router = useRouter();
    const { isMobile } = useResponsive();
    const { query } = router;
    const { data: similarProducts, isLoading: similarProductsLoading } =
        useQuery({
            queryKey: ['similar-products', query.pid],
            queryFn: async () => {
                const similarProductsRequest = await fetch(
                    `${baseUrl}customer/similar/${query.pid}/`
                );

                return await similarProductsRequest.json();
            },
        });

    if (similarProductsLoading) {
        return (
            <div className="row g-5 py-3 justify-content-center">
                {Array.from({ length: 12 }).map((_, index) => (
                    <div
                        key={index}
                        className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2  mb-3 d-flex justify-content-center">
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
        );
    } else if (similarProducts?.length) {
        return (
            <div className="row px-1 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-gap-4">
                {similarProducts
                    ?.slice(0, isMobile ? 12 : 10)
                    ?.map((item, index) => (
                        <div className="col px-3" key={item?.id}>
                            <ProductCard product={item} />
                        </div>
                    ))}
            </div>
        );
    } else {
        <div className="text-center">
            <img
                src="/static/img/noinfo.svg  "
                alt="Batafsil ma'lumot yo'q"
                width="35%"
            />
            <p
                style={{
                    fontSize: '18px',
                }}>
                O'xshash mahsulotlar topilmadi
            </p>
        </div>;
    }
}

export default SimilarProducts;
