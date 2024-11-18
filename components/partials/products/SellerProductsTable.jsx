import { Table, Tooltip } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import NextImageCard from '~/components/nextImagecard';
import { addPeriodToThousands } from '../account/ProductsLists';
import CalculateTimeDifference from '../account/DateFormatter';
import SellerProductActions from './SellerProductActions';
import SellerProductView from './SellerProductView';
import ModalDelete from '../account/Modal';
import SellerProductPrice from './SellerProductPrice';
import { useDeleteProductMutation } from '~/rtk-store/products/api';

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
    }
};

export default function SellerProductsTable({ data, loading }) {
    const { user } = useSelector(state => state.auth)
    const { deleteId } = useSelector(state => state.products)
    const [deleteFunction] = useDeleteProductMutation()

    const columns = [
        {
            title: 'Rasm',
            dataIndex: 'image',
            key: 'image',
            render: (image) => (
                <div>
                    {image?.poster_url ? (
                        <NextImageCard
                            url={image?.poster_url}
                            className="rounded-3 mb-2"
                            width="54px"
                            height="54px"
                        />
                    ) : (
                        <i className="fa-solid fa-image fa-2x"></i>
                    )}
                </div>
            ),
        },
        {
            title: 'Nomi',
            dataIndex: 'name',
            key: 'age',
            width: 300,
            render: (name) => (
                <span className="truncate whitespace-nowrap">
                    {' '}
                    {name?.title}
                </span>
            ),
        },
        {
            title: 'Kategoriya',
            dataIndex: 'category',
            key: 'address',
            width: 350,
            render: (category) => (
                <span key={category.id}>
                    {' '}
                    <i className=" text-primary-emphasis fa-solid fa-layer-group"></i>{' '}
                    {category?.name}
                </span>
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
            title: 'Yuklanishlar soni',
            dataIndex: 'uploads_count',
            key: 'uploads_count',
            render: (uploads_count) => (
                <span key={uploads_count}>
                    {' '}
                    <i className="fa-solid fa-download"></i> {uploads_count}
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
            render: (content_type_id, src) => <SellerProductActions src={src} />,
        },
    ];

    return (
        <div>
            <Table
                dataSource={data}
                scroll={{ x: user?.role === 'seller' ? 1700 : 1500 }}
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
