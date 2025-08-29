import React, { useEffect, useState } from 'react';
import ServiceIsUnavailable from '../seller-profile/ServiceIsUnavailable';
import ProductCard from '~/components/freeleance/home/ui/ProductCard';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { api } from '~/repositories/api';
import { Pagination } from 'antd';

export default function ModelAndDesign({ pid }) {
    const [page, setPage] = useState(1);
    const { user } = useSelector(state => state.auth);

    // ✅ API dan data olish
    const { data: models, isLoading } = useQuery({
        queryKey: ['keyModelProducts', page],
        queryFn: async ({ queryKey }) => {
            const [_key, currentPage] = queryKey;
            const response = await api.get(
                `customer/seller-documents/${pid}/?page=${currentPage}&type=3d`
            );
            return response.data;
        },
        keepPreviousData: true, // pagination scrollda eski datani saqlaydi
    });

    useEffect(() => {
        console.log('3D models and designs', models);
    }, [models]);

    // 🔹 Pagination handler
    const handlePageChange = page => {
        setPage(page);
    };

    return (
        <div className="sellerpage">
            {models?.results?.length > 0 ? (
                <div>
                    {/* Title */}
                    <div className="sellerpageTitleBox">
                        <p className="sellerpageTitle">
                            3D modellar va interier dizaynlar
                        </p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="8"
                            height="10"
                            viewBox="0 0 8 10"
                            fill="none">
                            <path
                                d="M1.875 1.5L6.12488 4.63195L2 8.5"
                                stroke="#312F30"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>

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
