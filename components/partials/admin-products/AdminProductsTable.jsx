import { message, Table, Tooltip } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import NextImageCard from '~/components/nextImagecard';
import { addPeriodToThousands } from '../account/ProductsLists';
import CalculateTimeDifference from '../account/DateFormatter';
import SellerProductActions from './AdminProductActions';
import SellerProductView from './AdminProductView';
import ModalDelete from '../account/Modal';
import SellerProductPrice from './SellerProductPrice';
import { useDeleteProductMutation, useLazyFetchAdminProductsQuery, useLazyRegenrateAdminProductQuery } from '~/rtk-store/products/api';

export const statusMap = {
    moderation: {
        iconClass: "text-primary-emphasis fa-solid fa-circle-info",
        text: "Moderatsiya"
    },
    approved: {
        iconClass: "fa-solid text-success fa-circle-check",
        text: "Tasdiqlangan"
    },
    cancelled: {
        iconClass: "fa-solid fa-circle-question text-danger",
        text: "Bekor qilingan",
        tooltip: true
    },
    deleted: {
        iconClass: "fa-solid fa-inbox text-danger",
        text: "Arxivlangan",
        tooltip: false
    }
};

export default function SellerProductsTable({ data, loading }) {
    const { deleteId, productParams, pageParams } = useSelector(state => state.products)
    const [deleteFunction] = useDeleteProductMutation()
    const [generateImg] = useLazyRegenrateAdminProductQuery()
    const [refetchProductList] = useLazyFetchAdminProductsQuery()
    const [MyId, setMyId] = useState(null)

    const handleRegenerate = async (id) => {
        setMyId(id)
        const resp = await generateImg(id)
        setMyId(null)
        if (resp.data && resp.data?.msg?.startsWith('File not found')) {
            message.error("Hozircha bu faylga rasm generatsiya qilishni imkoni yo'q")
        } else {
            message.success("Rasm generatsiya qilindi")
            await refetchProductList({ ...productParams, ...pageParams })
        }
    }

    const columns = [
        {
            title: 'Rasm',
            dataIndex: 'poster_data',
            key: 'image',
            render: (poster_data, src) => (
                <div>
                    {poster_data?.poster_url ? (
                        <NextImageCard
                            url={poster_data?.poster_url}
                            className="rounded-3 mb-2"
                            width="54px"
                            height="54px"
                        />
                    ) : (
                        <span style={{ cursor: "pointer" }}>
                            {
                                MyId === src?.id ?
                                    <i className="fa-solid fa-arrows-rotate fa-spin-pulse fs-1"></i>
                                    :
                                    <i onClick={() => handleRegenerate(src?.id)} className="fa-solid fa-arrows-rotate fs-1"></i>
                            }
                        </span>
                    )}
                </div>
            ),
        },
        {
            title: 'Nomi',
            dataIndex: 'title',
            key: 'age',
            width: 300,
            render: (name) => (
                <span className="truncate whitespace-nowrap">
                    {' '}
                    {name}
                </span>
            ),
        },
        {
            title: 'Kategoriya',
            dataIndex: 'category',
            key: 'address',
            width: 300,
            render: (category) => (
                <span key={category.id}>
                    {' '}
                    <i className=" text-primary-emphasis fa-solid fa-layer-group"></i>{' '}
                    {category?.name}
                </span>
            ),
        },
        {
            title: 'Kategoriya',
            dataIndex: 'seller',
            key: 'address',
            width: 300,
            render: (seller) => (
                <div key={seller.id} className='d-flex flex-column'>
                    <span>
                        {seller?.first_name}{' '}
                        {seller?.last_name}
                    </span>
                    <span>
                        {seller?.phone}
                    </span>
                </div>
            ),
        },
        {
            title: 'Narxi',
            dataIndex: 'discount_price',
            key: 'address',
            render: (price) => (
                <span key={price}>
                    {' '}
                    <i className="fa-solid fa-coins text-warning"></i>{' '}
                    {+price == 0 ? 'Bepul' : addPeriodToThousands(price)}
                </span>
            ),
        },
        {
            title: 'Ko\'rilganlar soni',
            dataIndex: 'view_count',
            key: 'address',

            render: (view_count) => (
                <span key={view_count} className='text-center'>
                    <i className="fa-solid fa-eye"></i>{' '}
                    {view_count} ta
                </span>
            ),
        },
        {
            title: 'Sana',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at) => (
                <span key={created_at}>
                    {' '}
                    <i className="fa-solid fa-clock text-info-emphasis"></i>{' '}
                    <CalculateTimeDifference targetDate={created_at} />
                </span>
            ),
        },
        {
            title: 'Holat',
            dataIndex: 'data_status',
            key: 'address',
            render: (datastatus) => {
                if (!datastatus || !statusMap[datastatus.status]) return null;

                const status = statusMap[datastatus.status];

                return status.tooltip ? (
                    <Tooltip title={datastatus.reason}>
                        <span style={{ cursor: 'pointer' }}>
                            <i className={status.iconClass}></i> {status.text}{' '}
                        </span>
                    </Tooltip>
                ) : (
                    <span>
                        <i className={status.iconClass}></i> {status.text}
                    </span>
                );
            }
        },
        {
            title: 'Harakatlar',
            dataIndex: 'content_type_id',
            key: 'address',
            render: (content, src) => <SellerProductActions content={content} src={src} />,
        },
    ];

    return (
        <div>
            <Table
                dataSource={data}
                scroll={{ x: 1700 }}
                columns={columns}
                pagination={false}
                loading={loading}
            />

            <SellerProductView />

            <ModalDelete onSuccess={() => deleteFunction(deleteId)} />
            <SellerProductPrice />
        </div>
    )
}
