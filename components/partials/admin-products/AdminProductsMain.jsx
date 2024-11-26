import React, { useEffect } from 'react'
import SidebarLayout from '../SidebarLayout'
import { useDispatch, useSelector } from 'react-redux';
import SellerProductsFilter from './AdminProductsFilter';
import { useFetchAdminProductsQuery } from '~/rtk-store/products/api';
import SellerProductsTable from './AdminProductsTable';
import { Modal, Pagination, Select } from 'antd';
import { setProductData, updatePageParams, updateProductParams } from '~/rtk-store/products/slice';
import SellerProductsList from './AdminProductsList';
import useResponsive from '~/utilities/useResponsive';
import TemplateProductDetail from '~/components/elements/detail/TemplateProductDetail';

export default function AdminProductsMain() {
    const { accountLinks } = useSelector((state) => state.auth);
    const { productParams, pageParams, productData } = useSelector((state) => state.products);
    const dispatch = useDispatch()
    const { isMobile } = useResponsive()

    const { data, isFetching } = useFetchAdminProductsQuery({ ...productParams, ...pageParams }, {
        refetchOnMountOrArgChange: true,
    })

    const handlePagination = (page, page_size) => {
        if (page_size !== Number(pageParams?.page_size)) {
            dispatch(updatePageParams({ page_size, page: 1 }))
        } else dispatch(updatePageParams({ page }))
    }

    const handleClose = () => {
        dispatch(setProductData(null))
    }

    useEffect(() => {
        return () => {
            dispatch(setProductData(null))
            dispatch(updateProductParams({
                search: '',
            }))
            dispatch(updatePageParams({ page: 1 }))
        }
    }, [])

    return (
        <div className='ps-page--account pt-3'>
            <div className="container">
                <div className="row" style={{ alignItems: 'flex-start' }}>
                    <SidebarLayout accountLinks={accountLinks}>
                        <div className="bg-white p-3 mb-3" style={{ borderRadius: '8px' }}>
                            {data?.count ? <p className='fw-medium px-1 text-black'>Mahsulotlar soni: {data?.count} ta</p> : ''}
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

                        {pageParams?.page ? <div className="bg-white py-3 mb-4" style={{ borderRadius: '8px' }}>
                            <div className='d-flex flex-wrap justify-content-center'>
                                <Pagination
                                    total={data?.count}
                                    current={pageParams?.page}
                                    pageSize={pageParams?.page_size}
                                    showSizeChanger={false}
                                    onChange={handlePagination}
                                />
                                <Select
                                    value={pageParams?.page_size}
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

                        <Modal
                            okText="Yopish"
                            cancelText={<a href={productData?.document?.file_url}>
                                Faylni yuklab olish
                            </a>}
                            centered
                            open={!!productData && productData?.document?.content_type === "template"}
                            onOk={handleClose}
                            onCancel={handleClose}
                            width={'1200px'}
                        >
                            <TemplateProductDetail product={{
                                images: productData?.document?.images?.map((el, i) => ({ thumbUrl: el?.image_url, id: i })),
                                title: productData?.title,
                                poster: [{ thumbUrl: productData?.poster_url }],
                                price: productData?.discount_price,
                                category: productData?.category?.name,
                                tags: productData?.active_tag?.map(el => el?.name),
                                technologies: productData?.technologies_data,
                                description: productData?.description,
                                seller: productData?.seller
                            }} views={productData?.view_count} />
                        </Modal>
                    </SidebarLayout>
                </div>
            </div>
        </div>
    )
}
