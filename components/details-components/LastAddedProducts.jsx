import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { baseUrl } from '~/repositories/Repository';
import useResponsive from '~/shared/utilities/useResponsive';
import ProductCard from '~/entities/product/product-card';
import { Skeleton } from 'antd';

function LastAddedProducts({ contentType }) {
    const { isMobile } = useResponsive();
    const { data: lastAdded, isLoading: lastLoading } = useQuery({
        queryKey: ['last-products', contentType],
        queryFn: async () => {
            const res = await fetch(
                `${baseUrl}customer/last-added?direction=${contentType}&limit=${
                    contentType == '3d' ? '4' : '6'
                }`
            );
            return await res.json();
        },
    });

    if (lastLoading) {
        return (
            <div className="row g-3 py-3">
                {Array.from({ length: 6 }).map((_, index) => (
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
        );
    } else if (lastAdded?.results?.length) {
        return (
            <div className="row px-1 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-gap-4">
                {lastAdded?.results?.slice(0, isMobile ? 6 : 5)?.map((p, i) => (
                    <div key={p?.id} className="col px-3">
                        <ProductCard product={p} />
                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <div className="text-center">
                <img
                    src="/static/img/noinfo.svg"
                    alt="Batafsil ma'lumot yo'q"
                    width="35%"
                />
                <p
                    style={{
                        fontSize: 18,
                    }}>
                    So'ngi yuklangan mahsulotlar topilmadi.
                </p>
            </div>
        );
    }
}

export default LastAddedProducts;
