import React, { useState } from 'react';
import ServiceIsUnavailable from '../seller-profile/ServiceIsUnavailable';
import { useQuery } from '@tanstack/react-query';
import { api } from '~/repositories/api';
import { Pagination } from 'antd'; // 🔹 Antd Pagination import qildik
import ProductCard from '~/entities/product/product-card';

export default function ScientificResources({ data, setCategoryValue, pid }) {
    const [page, setPage] = useState(1);

    const { data: produts, isLoading } = useQuery({
        queryKey: ['keySellerProducts', page],
        queryFn: async ({ queryKey }) => {
            const [_key, currentPage] = queryKey;
            const response = await api.get(
                `customer/seller-documents/${pid}/?page=${currentPage}&type=file`
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
            {produts?.results?.length > 0 ? (
                <div>
                    {/* SellerProductsCardWrapper */}
                    <div className="row">
                        {produts?.results.map((item, index) => (
                            <div
                                key={index}
                                className="p-2 col-12 col-sm-6 col-md-4 col-lg-3">
                                <ProductCard product={item} />
                            </div>
                        ))}
                    </div>

                    {/* 🔹 Pagination qo‘shildi */}
                    <div className="d-flex justify-content-center mt-4">
                        <Pagination
                            current={page}
                            pageSize={produts?.results?.length || 10}
                            total={produts?.count || 0}
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
