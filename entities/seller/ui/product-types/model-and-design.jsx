import React, { useState } from 'react';
import ServiceIsUnavailable from '../seller-profile/ServiceIsUnavailable';
import { useQuery } from '@tanstack/react-query';
import { api } from '~/repositories/api';
import { Pagination } from 'antd';
import ProductCard from '~/entities/product/product-card';

export default function ModelAndDesign({ pid }) {
    const [page, setPage] = useState(1);

    const { data: models, isLoading } = useQuery({
        queryKey: ['keyModelProducts', page],
        queryFn: async ({ queryKey }) => {
            const [_key, currentPage] = queryKey;
            const response = await api.get(
                `customer/seller-documents/${pid}/?page=${currentPage}&type=3d`
            );
            return response.data;
        },
        keepPreviousData: true,
    });

    const handlePageChange = (page) => {
        setPage(page);
    };

    return (
        <div className="sellerpage">
            {models?.results?.length > 0 ? (
                <div>
                    {/* Cards */}
                    <div className="row">
                        {models?.results.map((item, index) => (
                            <div
                                key={index}
                                className="p-2 col-12 col-sm-6 col-md-4 col-lg-3">
                                <ProductCard product={item} />
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="d-flex justify-content-center mt-4">
                        <Pagination
                            current={page}
                            pageSize={models?.results?.length || 10}
                            total={models?.count || 0}
                            onChange={handlePageChange}
                            showSizeChanger={false}
                        />
                    </div>
                </div>
            ) : isLoading ? (
                <p>Yuklanmoqda...</p>
            ) : (
                <ServiceIsUnavailable />
            )}
        </div>
    );
}
