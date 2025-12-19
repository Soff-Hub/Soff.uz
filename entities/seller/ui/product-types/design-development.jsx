import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { api } from '~/repositories/api';
import ServiceIsUnavailable from '../seller-profile/ServiceIsUnavailable';
import { Pagination } from 'antd';
import ProductCard from '~/entities/product/product-card';

export default function DesignDevelopment({ pid }) {
    const [page, setPage] = useState(1);
    const { user } = useSelector(state => state.auth);

    // 🔹 API dan data olish
    const { data: products, isLoading } = useQuery({
        queryKey: ['keyDesignProducts', page],
        queryFn: async ({ queryKey }) => {
            const [_key, currentPage] = queryKey;
            const response = await api.get(
                `customer/seller-documents/${pid}/?page=${currentPage}&type=design`
            );
            return response.data;
        },
        keepPreviousData: true,
    });

    // 🔹 Pagination handler
    const handlePageChange = page => {
        setPage(page);
    };

    return (
        <div className="sellerpage">
            {products?.results?.length > 0 ? (
                <div> 
                    {/* Cards */}
                    <div className="row">
                        {products?.results.map((item, index) => (
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
                            pageSize={products?.results?.length || 10}
                            total={products?.count || 0}
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
