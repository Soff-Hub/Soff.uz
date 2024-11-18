import React, { useEffect } from 'react'
import SidebarLayout from '../SidebarLayout'
import { useDispatch, useSelector } from 'react-redux';
import SellerProductsStock from './SellerProductsStock';
import SellerProductsHeader from './SellerProductsHeader';
import SellerProductsStorage from './SellerProductsStorage';
import SellerProductsFilter from './SellerProductsFilter';
import { useFetchProductsQuery } from '~/rtk-store/products/api';
import SellerProductsTable from './SellerProductsTable';
import { Pagination, Select } from 'antd';
import { updateProductParams } from '~/rtk-store/products/slice';
import SellerProductsList from './SellerProductsList';
import useResponsive from '~/utilities/useResponsive';

export default function SellerProductsMain() {
    const { accountLinks } = useSelector((state) => state.auth);
    const { profile } = useSelector((state) => state.ecomerce);
    const { productParams } = useSelector((state) => state.products);
    const dispatch = useDispatch()
    const { isMobile } = useResponsive()

    const { data, isFetching } = useFetchProductsQuery(productParams, {
        refetchOnMountOrArgChange: true,
    })

    const handlePagination = (page, page_size) => {
        if (page_size !== Number(productParams?.page_size)) {
            dispatch(updateProductParams({ page_size, page: 1 }))
        } else dispatch(updateProductParams({ page }))
    }

    return (
        <div className='ps-page--account pt-3'>
            <div className="container">
                <div className="row" style={{ alignItems: 'flex-start' }}>
                    <SidebarLayout accountLinks={accountLinks}>
                        {new Date().getDate() % 7 === 0 ? <SellerProductsStock /> : ''}

                        <div className="bg-white p-3 mb-3" style={{ borderRadius: '8px' }}>
                            {!profile?.have_sale && data ? <SellerProductsHeader /> : ''}
                            <SellerProductsStorage />
                        </div>

                        <div className="bg-white p-3 mb-3" style={{ borderRadius: '8px' }}>
                            <SellerProductsFilter />
                        </div>
                        {
                            isMobile ? (
                                <div className="py-2 px-1 mb-2" style={{ borderRadius: '8px' }}>
                                    <SellerProductsList data={data?.results || []} loading={isFetching} />
                                </div>
                            ) : <div className="bg-white" style={{ borderRadius: '8px' }}>
                                <SellerProductsTable data={data?.results || []} loading={isFetching} />
                            </div>
                        }

                        {productParams?.page ? <div className="bg-white py-3 mb-4" style={{ borderRadius: '8px' }}>
                            <div className='d-flex'>
                                <Pagination
                                    total={data?.count}
                                    current={productParams?.page}
                                    pageSize={productParams?.page_size}
                                    showSizeChanger={false}
                                    onChange={handlePagination}
                                />
                                <Select
                                    value={productParams?.page_size}
                                    style={{
                                        width: 60,
                                    }}
                                    onChange={(v) => handlePagination(1, v)}
                                    options={[
                                        {
                                            value: 10,
                                            label: '10',
                                        },
                                        {
                                            value: 20,
                                            label: '20',
                                        },
                                        {
                                            value: 50,
                                            label: '50',
                                        },
                                        {
                                            value: 100,
                                            label: '100',
                                        },
                                    ]}
                                />
                            </div>
                        </div> : ''}
                    </SidebarLayout>
                </div>
            </div>
        </div>
    )
}
