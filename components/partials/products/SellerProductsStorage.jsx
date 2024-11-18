import React from 'react'
import { addPeriodToThousands } from '../account/ProductsLists'
import Link from 'next/link'
import { useFetchStorageQuery } from '~/rtk-store/products/api'
import { Skeleton, Tooltip } from 'antd'
import useResponsive from '~/utilities/useResponsive'

export default function SellerProductsStorage() {
    const { data, isLoading } = useFetchStorageQuery()
    const { isMobile } = useResponsive()

    return (
        <div>
            {
                isLoading ? <Skeleton.Input size='small' active className='w-100 mb-2' style={{ borderRadius: '14px', height: '25px' }} /> : (
                    <div className="d-flex gap-1 align-items-center">
                        <Tooltip title="Video yuklash uchun joy haqida ma'lumot" placement='bottomLeft'>
                            <span className='d-flex align-items-center'>
                                <i class="fa-regular fa-circle-question fs-2"></i>
                            </span>
                        </Tooltip>
                        <div className='storage-pr d-flex w-100' style={{ borderRadius: '14px', backgroundColor: '#f1f1f1' }}>
                            {data?.full_storage_size > 0 ? <div className="py-1 storage-fill bg-success d-flex align-items-center justify-content-center text-white" style={{ borderRadius: '14px', minWidth: '80px', width: `${(data?.full_storage_size * 100) / data?.storage_size}%`, overflow: 'hidden' }}>{isMobile ? '' : 'Band'} {addPeriodToThousands(data?.full_storage_size || 0)} mb</div> : ''}
                            <div className="py-1 storage-free d-flex align-items-center justify-content-center" style={{ borderRadius: '14px', width: `${(data?.empty_storage_size * 100) / data?.storage_size}%`, overflow: 'hidden' }}>{isMobile ? '' : "Bo'sh"} {addPeriodToThousands(data?.empty_storage_size || 0)} mb</div>
                        </div>
                        <div
                            style={{
                                cursor: 'pointer',
                                minWidth: '20px',
                            }}
                        >
                            <Link href="/account/buying_traffic">
                                <div className="btn btn-success px-3 py-1 fs-5" style={{ borderRadius: '20px' }} >
                                    <span>
                                        <i className="fa-solid fa-plus"></i>
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
